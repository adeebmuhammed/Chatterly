import { Component, inject, OnInit } from '@angular/core';
import { UserHeaderComponent } from '../../../components/user/user-header/user-header.component';
import { ChatListComponent } from '../../../components/shared/chat-list/chat-list.component';
import { ChatWindowComponent } from '../../../components/shared/chat-window/chat-window.component';
import { ChatService } from '../../../services/chat/chat.service';
import { SocketService } from '../../../services/socket/socket.service';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../../components/shared/search/search.component';
import { UserSearchResultResponse } from '../../../interfaces/user.interface';
import { ApiResponse } from '../../../interfaces/common-interface';
import { IChat } from '../../../interfaces/chat.interface';
import { IMessage } from '../../../interfaces/message.interface';
import { FILE_TYPES } from '../../../constants/constants';

@Component({
  selector: 'app-user-home',
  imports: [
    UserHeaderComponent,
    ChatListComponent,
    ChatWindowComponent,
    SearchComponent,
    CommonModule,
  ],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css',
})
export class UserHomeComponent implements OnInit {
  chats: IChat[] = [];
  messages: IMessage[] = [];
  activeChat: any = null;

  loggedInUserId = '';
  loggedInUserName = localStorage.getItem('userName') || '';

  private chatService = inject(ChatService);
  private socketService = inject(SocketService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loadChats();

    this.socketService.onMessage((msg: any) => {
      if (msg.chatId === this.activeChat?._id) {
        this.messages.push(msg);
      }
    });
  }

  loadChats() {
    this.authService.userId$.subscribe((id) => {
      if (!id) {
        return;
      }
      this.loggedInUserId = id;
      this.chatService
        .getChats(this.loggedInUserId)
        .subscribe((res: ApiResponse<IChat[]>) => {
          this.chats = res.data || [];
          console.log(this.chats);
        });
    });
  }

  onChatSelected(chat: IChat) {
    this.openChat(chat);
  }

  onSendMessage(text: string) {
    if (!this.activeChat) return;

    const payload = {
      chatId: this.activeChat._id,
      senderId: this.loggedInUserId,
      message: text,
    };

    // Save to DB
    this.chatService.sendMessage(payload).subscribe();

    this.socketService.sendMessage(payload);
  }

  results: UserSearchResultResponse[] = [];

  onSearch(query: string) {
    this.chatService
      .searchUsers(query)
      .subscribe((res: ApiResponse<UserSearchResultResponse[]>) => {
        this.results = res.data ? res.data : [];
      });
  }

  onUserSelected(user: UserSearchResultResponse) {
    const payload = {
      userId: this.loggedInUserId,
      otherUserId: user.id,
    };

    this.chatService.findOrCreateChat(payload).subscribe({
      next: (res: ApiResponse<IChat>) => {
        const chat = res.data;
        if (!chat) return;
        const existingChat = this.chats.find((c) => c._id === chat._id);
        if (!existingChat) {
          this.chats.unshift(chat);
        }
        this.openChat(chat);
      },
      error: (err) => {
        console.error('Error finding or creating chat:', err);
      },
    });
  }

  openChat(chat: IChat) {
    this.activeChat = chat;

    this.socketService.joinRoom(chat._id);

    this.chatService
      .getMessages(chat._id)
      .subscribe((res: ApiResponse<IMessage[]>) => {
        this.messages = res.data || [];
      });
  }
}
