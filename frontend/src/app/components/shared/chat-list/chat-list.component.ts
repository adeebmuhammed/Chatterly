import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IChat, IChatUI } from '../../../interfaces/chat.interface';
import { UserChat } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-chat-list',
  imports: [
    CommonModule
  ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent {
  @Input() chats: IChatUI[] = [];
  @Output() selectChatEmitter = new EventEmitter<any>();

  selectChat(chat: any) {
    this.selectChatEmitter.emit(chat);
  }

  protected loggedInUserId: string = localStorage.getItem('userId') || '';

  getOtherParticipantName(chat: any): string {
    return (
      chat.participants.find((user: any) => user._id !== this.loggedInUserId)
        ?.name || 'Unknown User'
    );
  }
}
