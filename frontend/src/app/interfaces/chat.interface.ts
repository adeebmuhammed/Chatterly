export interface IChat {
  _id: string;
  participants: string[];
  isGroup: boolean;
  groupName?: string;
  createdAt: Date;
  updatedAt: Date;
}
