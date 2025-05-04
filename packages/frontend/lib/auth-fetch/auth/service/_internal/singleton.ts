export function singleton<Args extends unknown[], Result>(func: (...args: Args) => Promise<Result>) {
  const worker: {
    (...args: Args): Promise<Result>;
    promise?: Promise<Result> | undefined;
    pending?: boolean | undefined;
  } = async (...args: Args) => {
    if (worker.promise) {
      return worker.promise;
    }

    const promise = func(...args);

    try {
      worker.pending = true;
      worker.promise = promise;

      await worker.promise;

      worker.promise = undefined;
      worker.pending = undefined;
    } catch (error) {
      worker.promise = undefined;
      worker.pending = undefined;
      throw error;
    }

    return promise;
  };

  return worker;
}
