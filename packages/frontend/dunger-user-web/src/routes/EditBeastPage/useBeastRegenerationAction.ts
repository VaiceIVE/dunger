import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuthFetch } from '@dunger/auth-fetch';
import { ApiCreatureAiInput, ApiCreatureRole } from 'store/_types';

interface UseBeastRegenerationActionProps {
  onSuccess: () => void;
}

export const useBeastRegenerationAction = ({ onSuccess }: UseBeastRegenerationActionProps) => {
  const authFetch = useAuthFetch();

  const [loading, setLoading] = useState(false);

  const { mutateAsync: createAiCreature } = useMutation<{ id: string }, Error, ApiCreatureAiInput & { id: string }>({
    mutationFn: ({ id, ...input }) =>
      authFetch(`/creatures/generate/${id}`, {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { 'Content-Type': 'application/json' }
      })
  });

  const action = async (formData: FormData) => {
    const id = (formData.get('id') as string).toString();
    const name = (formData.get('name') as string).toString();
    const challenge_rating = (formData.get('challenge_rating') as string).toString();
    const role = formData.get('role') as ApiCreatureRole | 'BALANCE';
    const creation_description = (formData.get('creation_description') as string).toString();
    const type_name = (formData.get('type_name') as string).toString();

    const input: ApiCreatureAiInput = {
      name,
      challenge_rating,
      type_name,
      role: role === 'BALANCE' ? null : role,
      creation_description: creation_description == '' ? null : creation_description
    };

    try {
      setLoading(true);

      await createAiCreature({ ...input, id });

      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { action, loading };
};
