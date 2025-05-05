export interface User {
  id: number;
  name: string;
  email: string;
  githubId?: string | null;
  profilePicture?: string | null;
  status: UserStatus;
  role: UserRole;
}

export interface Invitation {
  id: number;
  email: string;
  token: string;
  expiredAt: Date;
  userId: number;
}

export type UserRole = 'ADMIN' | 'USER';

export type UserStatus = 'INVITED' | 'ACTIVE' | 'INACTIVE';
