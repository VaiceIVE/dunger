export interface ApiFile {
  id: string;
  parentId: string;
  objectKey: string;
  originalFileName: string;
  mimeType: string | null;
  size: number | null;
  createdAt: string; // ISO TZ
}
