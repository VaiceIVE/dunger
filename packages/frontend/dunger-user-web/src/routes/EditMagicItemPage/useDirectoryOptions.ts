import { useSuspenseQuery } from '@tanstack/react-query';
import { useAuthFetch } from '@dunger/auth-fetch';
import { ApiDirectory, ApiGender } from 'store/_types';

const useDirectoryQuery = <T>(key: string) => {
  const authFetch = useAuthFetch();
  return useSuspenseQuery<T>({
    queryKey: ['directories', key],
    queryFn: () => authFetch<T>(`/directories/${key}`)
  });
};

const mapToOptions = <T extends { id: string | number; name?: string; title?: string }>(data?: T[]) =>
  data?.map(({ id, name, title }) => ({ value: String(id), label: name ?? title ?? String(id) })) ?? [];

export const useDirectoryOptions = () => {
  const { data: attunementConditions } = useDirectoryQuery<ApiDirectory[]>('attunement-conditions');
  const { data: magicItemTypes } =
    useDirectoryQuery<{ id: string; name: string; gender: ApiGender }[]>('magic-item-types');
  const { data: magicItemRarities } = useDirectoryQuery<
    {
      id: string;
      name: string;
      cost: string;
      name_he: string;
      name_she: string;
      name_it: string;
    }[]
  >('magic-item-rarities');

  return {
    attunementConditionOptions: mapToOptions(attunementConditions),
    magicItemTypeOptions: mapToOptions(magicItemTypes),
    magicItemTypes,
    magicItemRarityOptions: mapToOptions(magicItemRarities),
    magicItemRarities
  };
};
