import { ISubscription } from "../models/subscription.model";
import { BaseRepository } from "./base.repository";
import { ISubscriptionRepository } from "./interfaces/ISubscriptionRepository";
import { PushSubscription } from "web-push";
export declare class SubscriptionRepository extends BaseRepository<ISubscription> implements ISubscriptionRepository {
    constructor();
    save(userId: string, subscription: PushSubscription): Promise<void>;
    getByUser(userId: string): Promise<ISubscription | null>;
}
//# sourceMappingURL=subscription.repository.d.ts.map