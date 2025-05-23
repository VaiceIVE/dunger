import { ApiPaginatedResult } from 'store/_types/_common';

export type ApiMagicItemList = {
  id: string;
  name: string;
  cost: string;
  type_name: string;
}[];

export type ApiMagicItemListResult = {
  magicItems: ApiMagicItemList;
  workshopMaterials: {
    creaturesCount: number;
  };
} & ApiPaginatedResult;
