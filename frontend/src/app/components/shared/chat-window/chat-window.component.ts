import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IMessage } from '../../../interfaces/message.interface';
import { IChat } from '../../../interfaces/chat.interface';

@Component({
  selector: 'app-chat-window',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css',
})
export class ChatWindowComponent {
  @Input() messages: IMessage[] = [];
  @Input() activeChat: IChat | null = null;
  @Output() sendMessageEmitter = new EventEmitter<string>();
  @Output() leaveGroupEmitter = new EventEmitter<string>();

  messageText = '';
  menuOpen = false;

  loggedInUserId: string = localStorage.getItem('userId') || '';

  send() {
    if (!this.messageText.trim()) return;

    this.sendMessageEmitter.emit(this.messageText);
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

  getOtherParticipantName(chat: any): string {
    return (
      chat.participants.find((user: any) => user._id !== this.loggedInUserId)
        ?.name || 'Unknown User'
    );
  }
}
