import { useSuspenseQuery } from '@tanstack/react-query';
import { useAuthFetch } from '@dunger/auth-fetch';
import { ApiDirectory } from 'store/_types/_common';

const useDirectoryQuery = <T>(key: string) => {
  const authFetch = useAuthFetch();
  return useSuspenseQuery<T>({ queryKey: ['directories', key], queryFn: () => authFetch<T>(`/directories/${key}`) });
};

const mapToOptions = <T extends { id: string | number; name?: string; title?: string }>(data?: T[]) =>
  data?.map(({ id, name, title }) => ({ value: String(id), label: name ?? title ?? id.toString() })) ?? [];

export const useDirectoryOptions = () => {
  const { data: types } = useDirectoryQuery<ApiDirectory[]>('types');
  const { data: cr } = useDirectoryQuery<{ id: string }[]>('cr');

  return { typeOptions: mapToOptions(types), crOptions: mapToOptions(cr) };
};
