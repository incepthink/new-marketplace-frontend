import { StaticImageData } from 'next/image';

export enum Role_type {
  SUPER_ADMIN = 'SUPER_ADMIN',
  USER = 'USER',
}

export interface IUser {
  id: string;
  username?: string | null;
  profile_image?: string;
  description?: string | null;
  email?: string | null;
  wallet_address?: string | null;
  name?: string | null;
  phone?: string | null;
  role: Role_type;
}
