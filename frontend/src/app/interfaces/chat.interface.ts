import { UserStatus } from "./common-interface";

export interface IChat {
  _id: string;
  participants: Participant[];
  isGroup: boolean;
  groupName?: string;
  createdBy?: Creator;
   lastMessage?: string | null;
  lastMessageSender?: string | null;
  lastMessageAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Participant {
  _id: string;
  name: string;
  email: string;
  status: UserStatus;
  lastSeen: Date | null;
}

export interface IChatUI extends IChat {
  hasUnread?: boolean;
}

interface Creator{
  _id: string;
  name: string;
  email: string;
}