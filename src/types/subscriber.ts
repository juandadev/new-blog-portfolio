import { PaginatedResponse } from './pagination';

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

export type GetSubscribersResponse = PaginatedResponse<Subscriber> & {
  totalSubscribers: number;
  totalActive: number;
  totalUnsubscribed: number;
};
