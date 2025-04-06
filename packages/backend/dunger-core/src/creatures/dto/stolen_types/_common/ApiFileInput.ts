/**
 * Универсальный инпут для добавления файла к заявке
 */
export interface ApiFileInput {
  objectKey: string;
  originalFileName: string;
  mimeType?: string | null;
  size?: number | null;
}
