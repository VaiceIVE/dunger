export const useBeastAction = () => {
  const saveAction = async (formData: FormData) => {
    const id = (formData.get('id') as string).toString();

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log({ id });
        resolve();
      }, 500);
    });
  };

  return {
    saveAction
  };
};
