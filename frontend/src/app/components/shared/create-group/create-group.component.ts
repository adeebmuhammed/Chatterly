import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserSearchResultResponse } from '../../../interfaces/user.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-group',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent {
  @Input() visible = false;
  @Input() allUsers: UserSearchResultResponse[] = [];

  @Output() closeModal = new EventEmitter<void>();
  @Output() createGroup = new EventEmitter<{ groupName: string; users: string[] }>();

  groupName = '';
  selectedUsers: string[] = [];

  toggleUser(userId: string) {
    if (this.selectedUsers.includes(userId)) {
      this.selectedUsers = this.selectedUsers.filter((id) => id !== userId);
    } else {
      this.selectedUsers.push(userId);
    }
  }

  onCreate() {
    if (!this.groupName || this.selectedUsers.length < 2) return;
    this.createGroup.emit({ groupName: this.groupName, users: this.selectedUsers });
  }
}
