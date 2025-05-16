import { ApiKeyword } from './ApiKeyword';

export type ApiAdventure = {
  id: string;
  name: string;
  genre: {
    id: string;
    name: string;
  };
  keywords: ApiKeyword[];
  created_at: Date;
  updated_at: Date;
};
