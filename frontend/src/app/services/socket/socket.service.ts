import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket = io(`${environment.baseUrl}`);

  joinRoom(chatId: string) {
    this.socket.emit('joinRoom', chatId);
  }

  sendMessage(data: any) {
    this.socket.emit('sendMessage', data);
  }

  onMessage(callback: any) {
    this.socket.on('receiveMessage', callback);
  }

  registerUser(userId: string) {
    this.socket.emit('registerUser', userId);
  }

  onNewChat(callback: any) {
    this.socket.on('newChat', callback);
  }

  onNewMessageNotification(callback: any) {
    this.socket.on('newMessageNotification', callback);
  }
}
