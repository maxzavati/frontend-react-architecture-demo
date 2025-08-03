export type ChatSource = 'general';

export interface ChatInitRequest {
  source: ChatSource;
  markerId?: string;
  healthGoalId?: string;
}

export interface ChatInitResponse {
  sessionTitle: string;
  sessionId: string;
}

export interface ChatSessionMessagesRequest {
  sessionId: string;
  page: number;
  limit: number;
  search?: string;
}

export interface ChatAnswerRequest {
  source: ChatSource;
  question: string;
  sessionId: string;
}

export interface ChatAnswerResponse {
  message: string;
  sessionId: string;
  sessionTitle: string;
}

export interface ChatSessionMessagesResponse {
  list: {
    id: string;
    text: string;
    role: string;
    createdAt: string;
  }[];
  count: number;
  total: number;
}

export type ChatMessage = {
  text: string;
  role: ChatRole;
  createdAt: string;
};

export enum ChatRole {
  system = 'system',
  user = 'user',
  assistant = 'assistant',
  function = 'function',
  tool = 'tool',
}
