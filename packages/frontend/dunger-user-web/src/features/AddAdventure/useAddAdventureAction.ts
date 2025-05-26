import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthFetch } from '@dunger/auth-fetch';
import { ApiAdventureInput } from 'store/_types';

interface UseAddAdventureActionProps {
  onSuccess?: () => void;
}

export const useAddAdventureAction = ({ onSuccess }: UseAddAdventureActionProps) => {
  const authFetch = useAuthFetch();

  const navigate = useNavigate();

  const { mutateAsync: createManualCreature } = useMutation<{ id: string }, Error, ApiAdventureInput>({
    mutationFn: (input) =>
      authFetch('/adventures', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { 'Content-Type': 'application/json' }
      })
  });

  const action = async (formData: FormData) => {
    const name = (formData.get('name') as string).toString();
    const genre_id = (formData.get('genre_id') as string).toString();
    const keyword_ids = formData.get('keyword_ids') as string | null;

    const input: ApiAdventureInput = {
      name,
      genre_id,
      keyword_ids: keyword_ids && keyword_ids !== '' ? keyword_ids.split(',') : []
    };

    try {
      const response = await createManualCreature(input);

      onSuccess?.();

      void navigate(`/adventures/${response.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return { action };
};
