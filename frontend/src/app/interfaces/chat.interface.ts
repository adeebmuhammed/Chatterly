export interface IChat {
  id: string;
  participants: string[];
  isGroup: boolean;
  groupName?: string;
  createdAt: Date;
  updatedAt: Date;
}
