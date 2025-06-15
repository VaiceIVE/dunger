import { useState, useCallback, DragEvent, ChangeEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuthFetch } from '@dunger/auth-fetch';

interface PresignedUrlResponse {
  generatedObjectKey: string;
  presignedUrl: string;
}

export interface UseTokenUploadArgs {
  setObjectKey: (objectKey: string | null) => void;
  initialUrl?: string | null;
  validTypes: string[];
  maxSize: number;
}

export const useTokenUpload = ({ initialUrl, validTypes, maxSize, setObjectKey }: UseTokenUploadArgs) => {
  const authFetch = useAuthFetch();
  const { mutateAsync: getFilePresignedUrl } = useMutation<PresignedUrlResponse, Error, string>({
    mutationFn: (fileName: string) =>
      authFetch('/s3/presignedUrl', {
        method: 'PUT',
        body: JSON.stringify({ fileName }),
        headers: { 'Content-Type': 'application/json' }
      })
  });

  const [preview, setPreview] = useState(initialUrl ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = useCallback(
    (file: File): boolean => {
      if (!validTypes.includes(file.type)) {
        setError('Недопустимый тип файла');
        return false;
      }

      if (file.size > maxSize) {
        setError('Размер файла превышает максимальный');
        return false;
      }

      return true;
    },
    [validTypes, maxSize]
  );

  const uploadToken = useCallback(
    async (file: File) => {
      try {
        if (!isValid(file)) return;
        setLoading(true);
        setError(null);
        const reader = new FileReader();

        reader.onloadend = () => {
          const result = reader.result;
          if (typeof result === 'string') {
            setPreview(result);
          } else {
            const uploadTokenError = new Error('Не удалось загрузить файл', { cause: result });
            console.error(uploadTokenError);
            setError(uploadTokenError.message);
          }
        };

        reader.readAsDataURL(file);

        const data = await getFilePresignedUrl(file.name);
        const objectKey = data.generatedObjectKey;
        const url = data.presignedUrl;

        if (!url || !objectKey) throw new Error('Не удалось получить URL для загрузки файла');

        const response = await fetch(url, {
          method: 'PUT',
          body: file,
          headers: { 'x-amz-meta-source': 'dunger-admin' }
        });

        if (response.ok) setObjectKey(objectKey);
      } catch (err: unknown) {
        const uploadTokenError = new Error('Не удалось загрузить файл', { cause: err });
        console.error(uploadTokenError);
        setError(uploadTokenError.message);
      } finally {
        setLoading(false);
      }
    },
    [getFilePresignedUrl, isValid, setObjectKey]
  );

  const handleDrag = (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDrop = useCallback(
    (event: DragEvent) => {
      handleDrag(event);
      const file = event.dataTransfer.files[0];
      void uploadToken(file);
    },
    [uploadToken]
  );

  const handleTokenChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) void uploadToken(file);
    },
    [uploadToken]
  );

  const removeToken = useCallback(() => {
    setPreview(null);
    setLoading(false);
    setError(null);
    setObjectKey(null);
  }, [setObjectKey]);

  return {
    preview,
    loading,
    error,
    handleDrop,
    handleDrag,
    handleTokenChange,
    removeToken,
    setError
  };
};
