import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthFetch } from '@dunger/auth-fetch';
import { ApiCreatureAiInput, ApiCreatureRole, ApiCreatureManualInput } from 'store/_types';

export const useNewBeastAction = () => {
  const authFetch = useAuthFetch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { mutateAsync: createManualCreature } = useMutation<{ id: string }, Error, ApiCreatureManualInput>({
    mutationFn: (input) =>
      authFetch('/creatures/init', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { 'Content-Type': 'application/json' }
      })
  });

  const { mutateAsync: createAiCreature } = useMutation<{ id: string }, Error, ApiCreatureAiInput>({
    mutationFn: (input) =>
      authFetch('/creatures/generate', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { 'Content-Type': 'application/json' }
      })
  });

  const createAction = async (formData: FormData) => {
    const name = (formData.get('name') as string).toString();
    const challenge_rating = (formData.get('challenge_rating') as string).toString();
    const template_id = formData.get('template_id') as string | null;

    const input: ApiCreatureManualInput = {
      name,
      challenge_rating,
      template_id: template_id == '' ? null : template_id
    };

    try {
      setLoading(true);

      const response = await createManualCreature(input);

      void navigate(`/beast/${response.id}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const generateAction = async (formData: FormData) => {
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

      const response = await createAiCreature(input);

      void navigate(`/beast/${response.id}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return { createAction, generateAction, loading };
};
