import {
  ChatAnswerRequest,
  ChatAnswerResponse,
  ChatInitRequest,
  ChatInitResponse,
  ChatSessionMessagesResponse,
} from '@/types/chat';
import api from '@/instances/api';

export async function initChatSession(
  payload: ChatInitRequest
): Promise<ChatInitResponse> {
  const res = await api.post(`/chat/initialize`, payload);
  return res.data;
}

export async function sendChatMessage(
  payload: ChatAnswerRequest
): Promise<ChatAnswerResponse> {
  const res = await api.post(`/chat/answer`, payload);
  return res.data;
}

export async function getChatSessionMessages(
  sessionId: string
): Promise<ChatSessionMessagesResponse> {
  const res = await api.get(
    `/chat/sessions/${sessionId}/messages?page=1&limit=50`
  );
  return res.data;
}
