import { PushSubscription } from "web-push";
import { ISubscription } from "../../models/subscription.model";
import { IBaseRepository } from "./IBaseRepository";

export interface ISubscriptionRepository
  extends IBaseRepository<ISubscription> {
  save(userId: string, subscription: PushSubscription): Promise<void>;
  getByUser(userId: string): Promise<ISubscription | null>;
}
