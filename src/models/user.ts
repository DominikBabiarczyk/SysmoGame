import { File } from "./file";

export type UserRole = "USER" | "INFLUENCER" | "ADMIN";
export type AppStatus =
  | "VERIFY"
  | "CONFIGURE"
  | "APP"
  | "WAIT_FOR_ADMIN_APPROVAL";
export type RegisterType = "PHONE" | "EMAIL";

export interface CurrentUser {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  street: string | null;
  city: string | null;
  role: UserRole;
  registerType: RegisterType;
  appStatus: AppStatus;
  isMessagingEnabled: boolean;
  avatarFile: File | null;
  galleryFiles?: File[];
  followerCount: number;
  productCount: 0;
  socialMedia: {
    id: string;
    name: string;
    followerCount: number;
  } | null;
}

export interface Author {
  id: string;
  firstName: string;
  city: string;
  avatarFile?: File;
  lastName: string;
  login: string;
}

export interface UserDetails {
  id: string;
  name: string;
  firstName: string;
  city: string;
  avatarFile?: File;
  isFollowed: boolean;
  followerCount: 0;
  productCount: 0;
  isMessagingEnabled: boolean;
  socialMedia: {
    id: string;
    name: string;
    followerCount: number;
  } | null;
}
