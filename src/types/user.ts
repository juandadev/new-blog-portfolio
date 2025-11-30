import { PaginatedResponse } from '@/types/pagination';

export interface User {
  id: number;
  name: string | null;
  email: string;
  githubId: string | null;
  profilePicture: string | null;
  status: UserStatus;
  role: UserRole;
}

export interface Invitation {
  id: number;
  email: string;
  token: string;
  expiresAt: Date;
  userId: number | null;
}

export type UserRole = 'ADMIN' | 'USER';

export type UserStatus = 'INVITED' | 'ACTIVE' | 'INACTIVE';

export type GetInvitationsResponse = PaginatedResponse<Invitation>;
