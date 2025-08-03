import { create } from 'zustand';
import { ChatMessage } from './api/types';

interface AudioData {
  frequencyData: number[];
  timeDomainData: number[];
  audioSource: 'user' | 'ai';
}

interface ChatState {
  messages: ChatMessage[];
  setMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  audioData: AudioData | null;
  updateAudioData: (newAudioData: AudioData | null) => void;
  isInVoiceMode: boolean;
  setIsInVoiceMode: (value: boolean) => void;
  userPromtText: string;
  setUserPromtText: (value: string) => void;
  isPendingMessage: boolean;
  setIsPendingMessage: (value: boolean) => void;
  sessionTitle: string;
  setSessionTitle: (value: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  setMessage: (newMessage) =>
    set((state) => ({ messages: [...state.messages, newMessage] })),
  clearMessages: () => set(() => ({ messages: [] })),
  audioData: null,
  updateAudioData: (newData) => set({ audioData: newData }),
  isInVoiceMode: false,
  setIsInVoiceMode: (newValue) => set({ isInVoiceMode: newValue }),
  userPromtText: '',
  setUserPromtText: (newValue) => set({ userPromtText: newValue }),
  isPendingMessage: false,
  setIsPendingMessage: (newValue) => set({ isPendingMessage: newValue }),
  sessionTitle: '',
  setSessionTitle: (newValue) => set({ sessionTitle: newValue }),
}));

// --- Actions ---
export const useSetMessage = () => useChatStore((state) => state.setMessage);
export const useUpdateAudioData = () =>
  useChatStore((state) => state.updateAudioData);
export const useClearMessages = () =>
  useChatStore((state) => state.clearMessages);
export const useSetIsInVoiceMode = () =>
  useChatStore((state) => state.setIsInVoiceMode);
export const useSetUserPromtText = () =>
  useChatStore((state) => state.setUserPromtText);
export const useSetIsPendingMessage = () =>
  useChatStore((state) => state.setIsPendingMessage);
export const useSetSessionTitle = () =>
  useChatStore((state) => state.setSessionTitle);

// --- Selectors ---
export const useMessages = () => useChatStore((state) => state.messages);
export const useAudioData = () => useChatStore((state) => state.audioData);
export const useIsInVoiceMode = () =>
  useChatStore((state) => state.isInVoiceMode);
export const useUserPromtText = () =>
  useChatStore((state) => state.userPromtText);
export const useIsPendingMessage = () =>
  useChatStore((state) => state.isPendingMessage);
export const useSessionTitle = () =>
  useChatStore((state) => state.sessionTitle);
