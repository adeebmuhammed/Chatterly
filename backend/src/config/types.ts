const TYPES = {
  IUserController: Symbol.for("IUserController"),
  IUserService: Symbol.for("IUserService"),
  IUserRepository: Symbol.for("IUserRepository"),

  IOtpRepository: Symbol.for("IOtpRepository"),

  IChatController: Symbol.for("IChatController"),
  IChatService: Symbol.for("IChatService"),
  IChatRepository: Symbol.for("IChatRepository"),

  IMessageRepository: Symbol.for("IMessageRepository"),
  IMessageService: Symbol.for("IMessageService"),
  IMessageController: Symbol.for("IMessageController"),

  IGroupController: Symbol.for("IGroupController"),
  IGroupService: Symbol.for("IGroupService"),

  INotificationRepository: Symbol.for("INotificationRepository"),

  ISubscriptionRepository: Symbol.for("ISubscriptionRepository")
};

export { TYPES };
