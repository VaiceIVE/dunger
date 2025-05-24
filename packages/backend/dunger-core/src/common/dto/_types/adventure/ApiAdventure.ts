import { ApiKeyword } from './ApiKeyword';

export interface ApiAdventure {
  id: string;
  name: string;
  genre: {
    id: string;
    name: string;
  };
  keywords: ApiKeyword[];
  created_at: Date;
  updated_at: Date;
}
