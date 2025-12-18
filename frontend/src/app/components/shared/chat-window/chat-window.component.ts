import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMessage } from '../../../interfaces/message.interface';
import { IChat, Participant } from '../../../interfaces/chat.interface';

@Component({
  selector: 'app-chat-window',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css',
})
export class ChatWindowComponent {
  @Input() messages: IMessage[] = [];
  @Input() activeChat: IChat | null = null;
  @Input() typingText = ''; // 👈 NEW

  @Output() sendMessage = new EventEmitter<string>();
  @Output() leaveGroupEmitter = new EventEmitter<string>();
  @Output() typing = new EventEmitter<void>();
  @Output() stopTyping = new EventEmitter<void>();
  @Output() deleteMessage = new EventEmitter<string>();

  messageText = '';
  menuOpen = false;

  protected loggedInUserId = localStorage.getItem('userId');

  send() {
    if (!this.messageText.trim()) return;
    this.sendMessage.emit(this.messageText);
    this.messageText = '';
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  leaveGroup() {
    if (!this.activeChat) return;
    this.leaveGroupEmitter.emit(this.activeChat._id);
    this.menuOpen = false;
  }

  getOtherParticipant(chat: IChat | null): Participant | null {
    if (!chat || chat.isGroup) return null;

    return (
      chat.participants.find((user) => user._id !== this.loggedInUserId) || null
    );
  }

  isOnline(user: Participant | null): boolean {
    return user?.status === 'online';
  }

  getLastSeenText(user: Participant | null): string {
    if (!user?.lastSeen) return '';

    const date = new Date(user.lastSeen);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();

    return isToday
      ? 'Last seen at ' +
          date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : 'Last seen on ' + date.toLocaleDateString();
  }

  onDeleteMessage(messageId: string) {
    this.deleteMessage.emit(messageId);
  }
}
