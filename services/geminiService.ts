import { GoogleGenAI, Modality } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { ChatMode } from "../types";

const getClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// --- Text Generation ---

export const generateResponse = async (
  prompt: string,
  mode: ChatMode,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  const ai = getClient();
  let modelName = 'gemini-3-flash-preview'; // Default fallback
  let config: any = {
    systemInstruction: SYSTEM_INSTRUCTION,
  };

  if (mode === ChatMode.FAST) {
    // Guidelines: gemini lite or flash lite: 'gemini-flash-lite-latest'
    modelName = 'gemini-flash-lite-latest';
  } else if (mode === ChatMode.THINKING) {
    // Guidelines: gemini-3-pro-preview for thinking
    modelName = 'gemini-3-pro-preview';
    config = {
      ...config,
      thinkingConfig: { thinkingBudget: 32768 }, // Max for Pro
    };
  } else {
    // Standard - High quality text
    modelName = 'gemini-3-pro-preview';
  }

  // Construct contents from history + current prompt
  const contents = [
    ...history.map(h => ({ role: h.role, parts: h.parts })),
    { role: 'user', parts: [{ text: prompt }] }
  ];

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents,
      config: config
    });
    
    return response.text || "Извините, я не смог сгенерировать ответ.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Произошла ошибка при обращении к ИИ. Пожалуйста, попробуйте позже.";
  }
};

// --- Audio (TTS) Logic ---

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const speakText = async (text: string): Promise<void> => {
  const ai = getClient();
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }, // Professional, somewhat deep voice often good for consulting
            },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!base64Audio) {
      console.warn("No audio data received");
      return;
    }

    const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
    const outputNode = outputAudioContext.createGain();
    outputNode.connect(outputAudioContext.destination);

    const audioBuffer = await decodeAudioData(
      decode(base64Audio),
      outputAudioContext,
      24000,
      1,
    );
    
    const source = outputAudioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(outputNode);
    source.start();

  } catch (error) {
    console.error("TTS Error:", error);
  }
};
