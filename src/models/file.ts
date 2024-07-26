export type FileType =
  | 'PROFILE_IMAGE'
  | 'CHAT_ATTACHMENT'
  | 'EVENT_FILE'
  | 'POST'
  | 'EVENT_CATEGORY_FILE'
  | 'AD_FILE'
  | 'POST_IMAGE';

export interface FileObj {
  compressFileId: string;
  createdAt: string;
  customName?: string;
  description?: string;
  id: string;
  isCompress: boolean;
  modifiedAt: string;
  order: number;
  originalname: string;
  type: FileType;
  visibleToAll?: boolean;
  url?: string;
}

export type File = {
  id: string;
  compressedFileId?: string | null;
  type?: string | null;
  originalname?: string;
  uri?: string;
  name?: string;
};
