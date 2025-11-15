// src/services/chatService.ts
// Service for chat bot session and messaging

export interface ChatSession {
  id: string;
  appName: string;
  userId: string;
}

export async function createChatSession(appName: string, userId: string, payload: Record<string, any>): Promise<ChatSession> {
  const response = await fetch(`http://localhost:8000/apps/${appName}/users/${userId}/sessions/s_123`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Failed to create chat session');
  const data = await response.json();
  return {
    id: data.id,
    appName: data.appName,
    userId: data.userId,
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  parts: { text: string }[];
}

export async function sendChatMessage(appName: string, userId: string, sessionId: string, text: string): Promise<string> {
  const response = await fetch('http://localhost:8000/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      appName,
      userId,
      sessionId,
      newMessage: {
        role: 'user',
        parts: [{ text }],
      },
    }),
  });
  if (!response.ok) throw new Error('Failed to send chat message');
  const data = await response.json();
  // Assume response contains assistant reply in data.reply or similar
  return data.reply || JSON.stringify(data);
}
