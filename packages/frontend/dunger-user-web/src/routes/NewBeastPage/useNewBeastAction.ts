import { useNavigate } from 'react-router-dom';

export const useNewBeastAction = () => {
  const navigate = useNavigate();

  const createAction = async (formData: FormData) => {
    const name = (formData.get('name') as string).toString();

    console.log({ name });
    void navigate('/beast/1');
  };

  const generateAction = async (formData: FormData) => {
    const name = (formData.get('name') as string).toString();
    const beastTypeId = (formData.get('beastTypeId') as string | undefined)?.toString();
    const type = (formData.get('type') as string).toString();

    console.log({ name, beastTypeId, type });
    void navigate('/beast/1');
  };

  return { createAction, generateAction };
};
