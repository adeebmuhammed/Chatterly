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
import { FILE_TYPES } from '../../../constants/constants';
import { NotificationService } from '../../../services/notification/notification.service';
import { GroupService } from '../../../services/group/group.service';
import { CreateGroupComponent } from '../../../components/shared/create-group/create-group.component';
import Swal from 'sweetalert2';

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
  private notificationService = inject(NotificationService);
  private groupService = inject(GroupService);

  ngOnInit() {
    this.authService.userId$.subscribe((userId) => {
      if (userId) {
        this.loggedInUserId = userId;
        this.socketService.registerUser(userId); // important!
        this.loadChats();
      }
    });

    this.socketService.onNewChat((chat: IChat) => {
      this.chats.unshift(chat); // Add new chat live
    });

    this.socketService.onMessage((msg: any) => {
      if (msg.chatId === this.activeChat?._id) {
        this.messages.push(msg);
      }
    });

    this.socketService.onNewMessageNotification((data: any) => {
      // Don't show unread on sender's own device
      if (data.senderId === this.loggedInUserId) return;

      // If message is not for the active chat → mark unread
      if (data.chatId !== this.activeChat?._id) {
        this.markChatAsUnread(data.chatId, data);
      }
    });

    this.notificationService.subscribeToNotifications();
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

    this.chatService.sendMessage(payload).subscribe();
    this.socketService.sendMessage(payload);
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
        if (chat) {
          this.openChat(chat);
        }
      },
      error: (err) => console.error('Join group failed:', err),
    });
  }

  getOtherUserId(chat: IChat) {
    if (!chat || !chat.participants) return;
    return chat.participants.find((p) => p._id !== this.loggedInUserId)?._id;
  }

  markChatAsUnread(chatId: string, data: any) {
    const chat = this.chats.find((c) => c._id === chatId);
    if (!chat) return;

    const uiChat = chat as IChatUI;

    uiChat.hasUnread = true;
    uiChat.lastMessage = data.message;
    uiChat.lastSender = data.senderId; // optional if you want "John: hello"

    chat.updatedAt = new Date();

    // Move chat to top
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
}
