import { useMutation } from '@tanstack/react-query';
import { useAuthFetch } from '@dunger/auth-fetch';
import { ApiCreature, ApiCreatureInput } from 'store/_types';

export const useEditMagicItemAction = () => {
  const authFetch = useAuthFetch();

  const { mutateAsync: updateCreature } = useMutation<ApiCreature, Error, ApiCreatureInput>({
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
    await updateCreature();
  };

  return {
    saveAction
  };
};
