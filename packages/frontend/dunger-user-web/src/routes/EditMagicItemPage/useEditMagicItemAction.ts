import { useMutation } from '@tanstack/react-query';
import { useAuthFetch } from '@dunger/auth-fetch';
import { ApiCreature, ApiMagicItemInput } from 'store/_types';

export const useEditMagicItemAction = () => {
  const authFetch = useAuthFetch();

  const { mutateAsync: updateMagicItem } = useMutation<ApiCreature, Error, { id: string } & ApiMagicItemInput>({
    mutationFn: ({ id, ...input }) =>
      authFetch(`/magic-items/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json'
        }
      })
  });

  const saveAction = async (formData: FormData) => {
    const id = (formData.get('id') as string).toString();
    const name = (formData.get('name') as string).toString();
    const description = (formData.get('description') as string).toString();
    const type_id = (formData.get('type_id') as string).toString();
    const rarity_id = (formData.get('rarity_id') as string).toString();
    const requires_attunement = (formData.get('requires_attunement') as string).toString();
    const attunement_ids = formData.get('attunement_ids')
      ? (formData.get('attunement_ids') as string).toString()
      : null;

    const input: { id: string } & ApiMagicItemInput = {
      id,
      name,
      description: description === '' ? null : description,
      type_id: type_id === '' ? null : type_id,
      rarity_id: rarity_id === '' ? null : rarity_id,
      requires_attunement: requires_attunement === 'yes',
      attunement_ids: attunement_ids ? attunement_ids.split(',') : []
    };

    await updateMagicItem(input);
  };

  return {
    saveAction
  };
};
