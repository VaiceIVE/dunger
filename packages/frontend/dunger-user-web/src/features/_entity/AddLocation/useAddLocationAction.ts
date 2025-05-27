import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthFetch } from '@dunger/auth-fetch';

interface UseAddAdventureLocationActionProps {
  onSuccess?: () => void;
}

export const useAddLocationAction = ({ onSuccess }: UseAddAdventureLocationActionProps) => {
  const authFetch = useAuthFetch();

  const navigate = useNavigate();

  const { mutateAsync: createLocation } = useMutation<{ id: string }, Error, { name: string }>({
    mutationFn: (input) =>
      authFetch('/locations', {
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
      const response = await createLocation(input);

      onSuccess?.();

      void navigate(`/adventures/${response.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return { action };
};
