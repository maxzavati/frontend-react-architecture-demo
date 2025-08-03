import {
  ChatAnswerRequest,
  ChatAnswerResponse,
  ChatInitRequest,
  ChatInitResponse,
  ChatSessionMessagesRequest,
  ChatSessionMessagesResponse,
} from './types';
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
  payload: ChatSessionMessagesRequest
): Promise<ChatSessionMessagesResponse> {
  const res = await api.get(
    `/chat/sessions/${payload.sessionId}/messages?page=${payload.page}&limit=${payload.limit}`
  );
  return res.data;
}

export async function chatAnswer(
  payload: ChatAnswerRequest
): Promise<ChatAnswerResponse> {
  const res = await api.post(`/chat/answer`, payload);
  return res.data;
}
