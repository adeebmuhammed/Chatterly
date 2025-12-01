import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-window',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css',
})
export class ChatWindowComponent {
  @Input() messages: any[] = [];
  @Input() activeChat: any;
  @Output() sendMessageEmitter = new EventEmitter<string>();

  messageText = '';

  send() {
    if (!this.messageText.trim()) return;

    this.sendMessageEmitter.emit(this.messageText);
    this.messageText = '';
  }
}
