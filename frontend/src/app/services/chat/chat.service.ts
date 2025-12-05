import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/common-interface';
import { UserSearchResultResponse } from '../../interfaces/user.interface';
import { IChat } from '../../interfaces/chat.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}`;

  searchUsers(
    query: string
  ): Observable<ApiResponse<UserSearchResultResponse[]>> {
    return this.http.get<ApiResponse<UserSearchResultResponse[]>>(
      `${this.baseUrl}/search-users`,
      { params: { q: query } }
    );
  }

  // Get all chats for logged-in user
  getChats(userId: string): Observable<ApiResponse<IChat[]>> {
    return this.http.get<ApiResponse<IChat[]>>(
      `${this.baseUrl}/chat/${userId}`
    );
  }

  // Create or get chat
  findOrCreateChat(data: {
    userId: string;
    otherUserId: string;
  }): Observable<ApiResponse<IChat>> {
    return this.http.post<ApiResponse<IChat>>(
      `${this.baseUrl}/chat/find-or-create`,
      data
    );
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
