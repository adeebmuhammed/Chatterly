import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { IMessage } from '../../../interfaces/message.interface';
import { IChat, Participant } from '../../../interfaces/chat.interface';

@Component({
  selector: 'app-chat-window',
  imports: [FormsModule, CommonModule, PickerModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css',
})
export class ChatWindowComponent implements AfterViewChecked,OnChanges {
  @Input() messages: IMessage[] = [];
  @Input() activeChat: IChat | null = null;
  @Input() typingText = ''; // 👈 NEW

  @Output() sendMessage = new EventEmitter<string>();
  @Output() leaveGroupEmitter = new EventEmitter<string>();
  @Output() typing = new EventEmitter<void>();
  @Output() stopTyping = new EventEmitter<void>();
  @Output() deleteMessage = new EventEmitter<string>();
  @Output() sendFile = new EventEmitter<File>();

  @ViewChild('messageArea') private messageArea!: ElementRef;

  messageText = '';
  menuOpen = false;
  private shouldScroll = true;

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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    // Optional: file size check (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size should be less than 10MB');
      return;
    }

    this.sendFile.emit(file);

    // reset input so same file can be selected again
    input.value = '';
  }

  openImage(url?: string) {
    if (!url) return;
    window.open(url, '_blank');
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
    }
  }

  ngOnChanges() {
    this.shouldScroll = true;
    setTimeout(() => this.scrollToBottom(), 0);
  }

  private scrollToBottom() {
    try {
      const el = this.messageArea.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch {}
  }

  onScroll() {
    const el = this.messageArea.nativeElement;

    const atBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 50;

    this.shouldScroll = atBottom;
  }

  showEmojiPicker = false;

toggleEmojiPicker() {
  this.showEmojiPicker = !this.showEmojiPicker;
}

addEmoji(event: any) {
  this.messageText += event.emoji.native;
}

}
