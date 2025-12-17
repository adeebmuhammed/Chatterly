import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { IChat } from '../../interfaces/chat.interface';
import { ApiResponse } from '../../interfaces/common-interface';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private http = inject(HttpClient);

  createGroup(
    creatorId: string,
    groupName: string,
    userIds: string[]
  ): Observable<ApiResponse<IChat>> {
    return this.http.post<ApiResponse<IChat>>(
      `${environment.apiBaseUrl}/group/create`,
      { creatorId, groupName, userIds }
    );
  }

  joinGroup(userId: string, chatId: string): Observable<ApiResponse<IChat>> {
    return this.http.patch<ApiResponse<IChat>>(
      `${environment.apiBaseUrl}/group/join`,
      { userId, chatId }
    );
  }

  leaveGroup(userId: string, chatId: string): Observable<ApiResponse<IChat>> {
    return this.http.patch<ApiResponse<IChat>>(
      `${environment.apiBaseUrl}/group/leave`,
      { userId, chatId }
    );
  }
}
