import { ApiPaginatedResult } from '../_common';

export type ApiMagicItemList = {
  id: string;
  name: string;
  cost: string;
  type_name: string;
}[];

export type ApiMagicItemListResult = {
  magicItems: ApiMagicItemList;
} & ApiPaginatedResult;
