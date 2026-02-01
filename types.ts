export enum ChatMode {
  FAST = 'FAST', // gemini-2.5-flash-lite
  STANDARD = 'STANDARD', // gemini-3-pro-preview
  THINKING = 'THINKING' // gemini-3-pro-preview with thinking budget
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  mode: ChatMode;
  error?: string;
}
