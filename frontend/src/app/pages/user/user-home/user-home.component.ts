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
import { IChat, IChatUI } from '../../../interfaces/chat.interface';
import { IMessage } from '../../../interfaces/message.interface';
import { NotificationService } from '../../../services/notification/notification.service';
import { GroupService } from '../../../services/group/group.service';
import { CreateGroupComponent } from '../../../components/shared/create-group/create-group.component';
import Swal from 'sweetalert2';
import { take } from 'rxjs';
import { S3OperationsService } from '../../../services/s3-operations/s3-operations.service';
import { FILE_TYPES } from '../../../constants/constants';

@Component({
  selector: 'app-user-home',
  imports: [
    UserHeaderComponent,
    ChatListComponent,
    ChatWindowComponent,
    SearchComponent,
    CommonModule,
    CreateGroupComponent,
  ],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css',
})
export class UserHomeComponent implements OnInit {
  chats: IChatUI[] = [];
  messages: IMessage[] = [];
  activeChat: IChatUI | null = null;
  showGroupModal = false;
  allUsersList: UserSearchResultResponse[] = [];

  loggedInUserId = localStorage.getItem('userId') || '';
  loggedInUserName = localStorage.getItem('userName') || '';

  private chatService = inject(ChatService);
  private socketService = inject(SocketService);
  private authService = inject(AuthService);
  private s3Service = inject(S3OperationsService);
  private groupService = inject(GroupService);

  ngOnInit() {
    this.authService.userId$.subscribe((userId) => {
      if (userId) {
        this.loggedInUserId = userId;
        this.socketService.connect();
        this.socketService.registerUser(userId); // important!
        this.loadChats();
      }
    });

    this.socketService.onUserStatusChanged((data: any) => {
      const { userId, status, lastSeen } = data;

      this.chats.forEach((chat) => {
        chat.participants.forEach((user) => {
          if (user._id === userId) {
            user.status = status;
            user.lastSeen = lastSeen ?? null;
          }
        });
      });
    });

    this.socketService.onUserTyping((data: any) => {
      const { userId, isTyping, chatId } = data;

      if (chatId !== this.activeChat?._id) return;

      if (isTyping) {
        this.typingUsers.add(userId);
      } else {
        this.typingUsers.delete(userId);
      }
    });

    this.socketService.onMessageDeleted((data: any) => {
      if (data.chatId !== this.activeChat?._id) return;

      this.messages = this.messages.filter((msg) => msg._id !== data.messageId);
    });

    this.socketService.onNewChat((chat: IChat) => {
      this.chats.unshift(chat); // Add new chat live
    });

    this.socketService.onMessage((msg: any) => {
      if (msg.chatId === this.activeChat?._id) {
        this.messages.push(msg);
      }

      this.updateChatPreview(msg.chatId, msg);
    });

    this.socketService.onNewMessageNotification((data: any) => {
      // Don't show unread on sender's own device
      if (data.senderId === this.loggedInUserId) return;

      // If message is not for the active chat → mark unread
      if (data.chatId !== this.activeChat?._id) {
        this.markChatAsUnread(data.chatId, data);
      }
    });
  }

  openCreateGroupModal() {
    this.showGroupModal = true;

    // fetch the list of all users (except self)
    this.chatService.searchUsers('').subscribe((res) => {
      this.allUsersList =
        res.data?.filter((u) => u.id !== this.loggedInUserId) || [];
    });
  }

  closeGroupModal() {
    this.showGroupModal = false;
  }

  onCreateGroup(data: { groupName: string; users: string[] }) {
    this.groupService
      .createGroup(this.loggedInUserId, data.groupName, data.users)
      .subscribe({
        next: (res: ApiResponse<IChat>) => {
          Swal.fire(
            'Success',
            res.message || 'Group Chat Created Successfully',
            'success'
          );
          if (res.data) {
            this.chats.unshift(res.data);
            this.onChatSelected(res.data);
          }
        },
        error: (err) => {
          Swal.fire(
            'Error',
            err.message || 'Group Chat Creation Failed',
            'error'
          );
          console.error(err);
        },
      });

    this.showGroupModal = false;
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
      receiverId: this.getOtherUserId(this.activeChat), // Write helper method below
      message: text,
    };

    this.chatService.sendMessage(payload).subscribe({
      next: ( )=> {
        this.socketService.sendMessage(payload);
      }
    });

    this.updateChatPreview(payload.chatId, payload);
  }

  results: UserSearchResultResponse[] | IChat[] = [];
  searchType: 'user' | 'group' = 'user';

  onSearch({ query, type }: { query: string; type: 'user' | 'group' }) {
    if (type === 'user') {
      this.chatService
        .searchUsers(query)
        .subscribe((res: ApiResponse<UserSearchResultResponse[]>) => {
          this.results = res.data ?? [];
        });
    } else {
      this.chatService.searchGroupChats(query).subscribe({
        next: (res: ApiResponse<IChat[]>) => {
          this.results = res.data ?? [];
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  private getLastMessagePreview(msg: any): string {
    switch (msg.messageType) {
      case FILE_TYPES.IMAGE:
        return '📷 Photo';
      case FILE_TYPES.FILE:
        return '📎 File';
      default:
        return msg.message || 'Message';
    }
  }

  onResultSelected(item: any) {
    if (item.type === 'user') {
      this.handleUserSelection(item);
    } else if (item.type === 'group') {
      this.handleGroupSelection(item);
    }
  }

  handleUserSelection(user: any) {
    const payload = {
      userId: this.loggedInUserId,
      otherUserId: user.id,
    };

    this.chatService.findOrCreateChat(payload).subscribe({
      next: (res: ApiResponse<IChat>) => {
        const chat = res.data;
        if (!chat) return;

        const existingChat = this.chats.find((c) => c._id === chat._id);
        if (!existingChat) this.chats.unshift(chat);

        this.openChat(chat);
      },
      error: (err) => console.error('Error finding or creating chat:', err),
    });
  }

  handleGroupSelection(group: any) {
    const isMember = group.participants?.includes(this.loggedInUserId);

    if (isMember) {
      // Already in group → open directly
      this.openChat(group);
      return;
    }
  }

  openChat(chat: IChat) {
    this.activeChat = chat;

    // Clear unread
    (chat as IChatUI).hasUnread = false;

    this.socketService.joinRoom(chat._id);

    this.chatService
      .getMessages(chat._id)
      .subscribe((res: ApiResponse<IMessage[]>) => {
        this.messages = res.data || [];
      });
  }

  onJoinGroup(group: IChat) {
    this.groupService.joinGroup(this.loggedInUserId, group._id).subscribe({
      next: (res: ApiResponse<IChat>) => {
        const chat = res.data;
        if (!chat) return;

        // ✅ ADD TO CHAT LIST IF NOT EXISTS
        const exists = this.chats.some((c) => c._id === chat._id);
        if (!exists) {
          this.chats.unshift(chat);
        }

        // ✅ OPEN CHAT
        this.openChat(chat);
      },
      error: (err) => console.error('Join group failed:', err),
    });
  }

  private updateChatPreview(chatId: string, msg: any) {
    const chat = this.chats.find((c) => c._id === chatId);
    if (!chat) return;

    chat.lastMessage = this.getLastMessagePreview(msg);
    chat.lastMessageSender = msg.senderId;
    chat.updatedAt = new Date();

    // Move chat to top (WhatsApp behavior)
    this.chats = [chat, ...this.chats.filter((c) => c._id !== chatId)];
  }

  getOtherUserId(chat: IChat) {
    if (!chat || !chat.participants) return;
    return chat.participants.find((p) => p._id !== this.loggedInUserId)?._id;
  }

  markChatAsUnread(chatId: string, data: any) {
    const chat = this.chats.find((c) => c._id === chatId);
    if (!chat) return;

    chat.hasUnread = true;
    chat.lastMessage = this.getLastMessagePreview(data);
    chat.lastMessageSender = data.senderId;
    chat.updatedAt = new Date();

    this.chats = [chat, ...this.chats.filter((c) => c._id !== chatId)];
  }

  onLeaveGroup(chatId: string) {
    this.groupService.leaveGroup(this.loggedInUserId, chatId).subscribe({
      next: (res: ApiResponse<IChat>) => {
        Swal.fire(
          'Left Group',
          res.message || 'You left the group successfully',
          'success'
        );

        // remove chat from list
        this.chats = this.chats.filter((c) => c._id !== chatId);

        // close chat window
        this.activeChat = null;
        this.messages = [];
      },
      error: (err) => {
        Swal.fire('Error', err.message || 'Failed to leave group', 'error');
      },
    });
  }

  typingUsers = new Set<string>();
  typingTimeout: any;

  onTyping() {
    if (!this.activeChat) return;

    this.socketService.startTyping(this.activeChat._id, this.loggedInUserId);

    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => this.stopTyping(), 1000);
  }

  stopTyping() {
    if (!this.activeChat) return;

    this.socketService.stopTyping(this.activeChat._id, this.loggedInUserId);
  }

  get typingText(): string {
    if (!this.activeChat) return '';

    const names = this.activeChat.participants
      .filter((p) => this.typingUsers.has(p._id))
      .map((p) => p.name);

    if (names.length === 0) return '';
    if (names.length === 1) return `${names[0]} is typing...`;
    return `Multiple people are typing...`;
  }

  onDeleteMessage(messageId: string) {
    if (!this.activeChat) {
      return;
    }
    this.socketService.emitDeleteMessage(this.activeChat!._id, messageId)
  }

  onSendFile(file: File) {
    if (!this.activeChat) return;

    this.s3Service.fetchSignedUrl(file).subscribe({
      next: ({ uploadUrl, fileUrl }) => {
        this.s3Service.uploadFile(uploadUrl, file).subscribe({
          next: () => {
            const payload = {
              chatId: this.activeChat!._id,
              senderId: this.loggedInUserId,
              receiverId: this.getOtherUserId(this.activeChat!),
              messageType: file.type.startsWith('image') ? 'image' : 'video',
              mediaUrl: fileUrl,
            };

            // Save to DB
            this.chatService.sendMessage(payload).subscribe();

            // Realtime
            this.socketService.sendMessage(payload);

            this.updateChatPreview(payload.chatId, payload);
          },
          error: (err) => console.error('Upload failed', err),
        });
      },
      error: (err) => console.error('Signed URL failed', err),
    });
  }
}
