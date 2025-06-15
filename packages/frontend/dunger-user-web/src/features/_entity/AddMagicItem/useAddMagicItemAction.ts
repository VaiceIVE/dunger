import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthFetch } from '@dunger/auth-fetch';

interface UseAddAdventureMagicItemActionProps {
  onSuccess?: () => void;
}

export const useAddMagicItemAction = ({ onSuccess }: UseAddAdventureMagicItemActionProps) => {
  const authFetch = useAuthFetch();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { mutateAsync: createMagicItem } = useMutation<{ id: string }, Error, { name: string }>({
    mutationFn: (input) =>
      authFetch('/magic-items', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { 'Content-Type': 'application/json' }
      })
  });

  const action = async (formData: FormData) => {
    const name = (formData.get('name') as string).toString();

    const input = {
      name
    };

    try {
      setLoading(true);
      const response = await createMagicItem(input);

      onSuccess?.();

      void navigate(`/magic-items/${response.id}/edit`);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return { action, loading };
};
