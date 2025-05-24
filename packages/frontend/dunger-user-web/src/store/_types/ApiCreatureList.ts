import { ApiPaginatedResult } from './_common/ApiPagination';

export type ApiCreatureList = {
  id: string;
  name: string;
  challenge_rating: string;
  type_name: string | null;
  alignment_name: string | null;
}[];

export type ApiCreatureListResult = {
  creatures: ApiCreatureList;
} & ApiPaginatedResult;
