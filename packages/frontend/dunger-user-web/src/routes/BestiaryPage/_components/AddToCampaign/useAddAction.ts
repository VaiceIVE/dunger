export const useAddAction = () => {
  const addAction = async (formData: FormData) => {
    const campaignIds = (formData.get('campaignIds') as string).toString();

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log({ campaignIds });
        resolve();
      }, 500);
    });
  };

  return {
    addAction
  };
};
