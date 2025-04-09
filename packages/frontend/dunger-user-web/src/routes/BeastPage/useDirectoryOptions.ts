import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useAuthFetch } from '@dunger/auth-fetch';
import { ApiDirectory, ApiPaginatedResult } from 'store/_types/_common';

const useDirectoryQuery = <T>(key: string) => {
  const authFetch = useAuthFetch();
  return useSuspenseQuery<T>({
    queryKey: ['creatures', key],
    queryFn: () => authFetch<T>(`/creatures/${key}`)
  });
};

const useInfiniteDirectoryQuery = <T extends ApiPaginatedResult>(key: string) => {
  const authFetch = useAuthFetch();

  return useInfiniteQuery({
    queryKey: ['creatures', key],
    queryFn: async ({ pageParam = 0 }) => {
      return authFetch<T>(`/creatures/${key}?offset=${pageParam.toString()}`);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { offset, limit, totalCount } = lastPage.pagination;
      const nextOffset = offset + limit;
      return nextOffset < totalCount ? nextOffset : undefined;
    }
  });
};

const mapToOptions = <T extends { id: string | number; name?: string; title?: string }>(data?: T[]) =>
  data?.map(({ id, name, title }) => ({ value: String(id), label: name ?? title ?? String(id) })) ?? [];

export const useDirectoryOptions = () => {
  const { data: alignments } = useDirectoryQuery<ApiDirectory[]>('alignments');
  const { data: types } = useDirectoryQuery<ApiDirectory[]>('types');
  const { data: sizes } = useDirectoryQuery<ApiDirectory[]>('sizes');
  const { data: cr } = useDirectoryQuery<{ id: string }[]>('cr');
  const { data: biomes } = useDirectoryQuery<ApiDirectory[]>('biomes');
  const { data: damageTypes } = useDirectoryQuery<ApiDirectory[]>('damage-types');
  const { data: languages } = useInfiniteDirectoryQuery<{ results: ApiDirectory[] } & ApiPaginatedResult>('languages');

  return {
    alignmentOptions: mapToOptions(alignments),
    typeOptions: mapToOptions(types),
    crOptions: mapToOptions(cr),
    sizeOptions: mapToOptions(sizes),
    biomeOptions: mapToOptions(biomes),
    damageTypeOptions: mapToOptions(damageTypes),
    languageOptions: mapToOptions(languages?.pages.flatMap((p) => p.results))
  };
};
