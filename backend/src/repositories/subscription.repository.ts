import { injectable } from "inversify";
import Subscription, { ISubscription } from "../models/subscription.model";
import { BaseRepository } from "./base.repository";
import { ISubscriptionRepository } from "./interfaces/ISubscriptionRepository";
import { PushSubscription } from "web-push";

@injectable()
export class SubscriptionRepository
  extends BaseRepository<ISubscription>
  implements ISubscriptionRepository
{
  constructor() {
    super(Subscription);
  }

  async save(userId: string, subscription: PushSubscription): Promise<void> {
    await Subscription.updateOne(
      { user: userId },
      { subscription },
      { upsert: true }
    );
  }

  async getByUser(userId: string): Promise<ISubscription | null> {
    return Subscription.findOne({ user: userId });
  }
}
