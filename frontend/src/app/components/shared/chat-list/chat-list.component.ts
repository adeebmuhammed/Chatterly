import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-list',
  imports: [
    CommonModule
  ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent {
  @Input() chats: any[] = [];
  @Output() selectChatEmitter = new EventEmitter<any>();

  selectChat(chat: any) {
    this.selectChatEmitter.emit(chat);
  }
}
