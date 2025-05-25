import { ApiPaginatedResult } from '../_common';

export type ApiAdventureList = {
  id: string;
  name: string;
  genre_name: string;
  keywords: string[];
}[];

export type ApiAdventureListResult = {
  adventures: ApiAdventureList;
  workshopMaterials: {
    creaturesCount: number;
  };
} & ApiPaginatedResult;
