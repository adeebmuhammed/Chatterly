import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  private currentRoom: string | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io(`${environment.baseUrl}`, {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
    }
  }

  joinRoom(chatId: string) {
    if (this.currentRoom) {
      this.socket.emit('leaveRoom', this.currentRoom);
    }

    this.socket.emit('joinRoom', chatId);
    this.currentRoom = chatId;
  }

  sendMessage(data: any) {
    this.socket.emit('sendMessage', data);
  }

  onMessage(callback: any) {
    this.socket.on('receiveMessage', callback);
  }

  registerUser(userId: string) {
    if (!this.socket || !this.socket.connected) {
      this.socket.on('connect', () => {
        this.socket.emit('registerUser', userId);
      });
    } else {
      this.socket.emit('registerUser', userId);
    }
  }

  onNewChat(callback: any) {
    this.socket.on('newChat', callback);
  }

  onNewMessageNotification(callback: any) {
    this.socket.on('newMessageNotification', callback);
  }

  onGroupJoined(callback: any) {
    this.socket.on('groupJoined', callback);
  }

  onGroupLeft(callback: any) {
    this.socket.on('groupLeft', callback);
  }

  emitJoinGroup(chatId: string, user: any) {
    this.socket.emit('joinGroupEvent', { chatId, user });
  }

  emitLeaveGroup(chatId: string, userId: string) {
    this.socket.emit('leaveGroupEvent', { chatId, userId });
  }

  onUserStatusChanged(callback: any) {
    this.socket.on('userStatusChanged', callback);
  }

  startTyping(chatId: string, userId: string) {
    this.socket.emit('typing:start', { chatId, userId });
  }

  stopTyping(chatId: string, userId: string) {
    this.socket.emit('typing:stop', { chatId, userId });
  }

  onUserTyping(callback: (data: any) => void) {
    this.socket.on('userTyping', callback);
  }

  emitDeleteMessage(chatId: string, messageId: string) {
    this.socket.emit('deleteMessage', { chatId, messageId });
  }

  onMessageDeleted(callback: (data: any) => void) {
    this.socket.on('messageDeleted', callback);
  }

  disconnect() {
    if (this.socket && this.socket.connected) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null as any;
    }
  }
}
