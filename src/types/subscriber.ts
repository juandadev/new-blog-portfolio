export interface CreateSubscriberResponse {
  subscriber: Subscriber;
}

export interface Subscriber {
  id: number;
  email: string;
  status: SubscriberStatus;
  createdAt: Date;
  unsubscribedAt: Date | null;
  verified: boolean;
  token: string | null;
  tokenExpiresAt: Date | null;
}

export type SubscriberStatus = 'SUBSCRIBED' | 'UNSUBSCRIBED';
