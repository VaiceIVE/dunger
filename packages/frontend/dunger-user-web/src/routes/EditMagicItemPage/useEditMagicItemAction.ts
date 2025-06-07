import { useMutation } from '@tanstack/react-query';
import { useAuthFetch } from '@dunger/auth-fetch';
import { ApiCreature } from 'store/_types';

export const useEditMagicItemAction = () => {
  const authFetch = useAuthFetch();

  const { mutateAsync: updateCreature } = useMutation<ApiCreature, Error, { id: string }>({
    mutationFn: (input) =>
      authFetch(`/creatures/${input.id}`, {
        method: 'PATCH',
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json'
        }
      })
  });

  const saveAction = async (formData: FormData) => {
    const id = (formData.get('id') as string).toString();

    await updateCreature({ id });
  };

  return {
    saveAction
  };
};
