export const useNewBeastAction = () => {
  const createAction = async (formData: FormData) => {
    const name = (formData.get('name') as string).toString();

    console.log({ name });
  };

  const generateAction = async (formData: FormData) => {
    const name = (formData.get('name') as string).toString();
    const beastTypeId = (formData.get('beastTypeId') as string | undefined)?.toString();
    const type = (formData.get('type') as string).toString();

    console.log({ name, beastTypeId, type });
  };

  return { createAction, generateAction };
};
