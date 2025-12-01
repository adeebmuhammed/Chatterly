import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}`;

  // Get all chats for logged-in user
  getChats(userId: string) {
    return this.http.get(`${this.baseUrl}/chat/${userId}`);
  }

  // Create or get chat
  findOrCreateChat(data: any) {
    return this.http.post(`${this.baseUrl}/chat/find-or-create`, data);
  }

  // Load messages for a chat
  getMessages(chatId: string) {
    return this.http.get(`${this.baseUrl}/message/${chatId}`);
  }

  // Send a message
  sendMessage(payload: any) {
    return this.http.post(`${this.baseUrl}/message/send`, payload);
  }
}
