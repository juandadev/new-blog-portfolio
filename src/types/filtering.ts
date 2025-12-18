export interface BaseFilterParams {
  [key: string]: string | undefined;
}

export interface SubscriberFilterParams extends BaseFilterParams {
  search?: string;
  status?: 'SUBSCRIBED' | 'UNSUBSCRIBED' | 'all';
  verified?: 'verified' | 'unverified' | 'all';
}

export type FilterConfig<T extends BaseFilterParams> = {
  [K in keyof T]?: {
    type: 'string' | 'enum' | 'boolean' | 'date';
    enumValues?: readonly string[];
    defaultValue?: T[K];
  };
};
