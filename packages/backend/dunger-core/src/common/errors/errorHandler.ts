import { HttpStatus, HttpStatusText } from '@dunger/common-enums';

import type { AppError } from './AppError.js';
import { getErrorCommonFields } from './getErrorCommonFields.js';

type NewErrorResponseInput = {
  code?: HttpStatus;
  message?: string;
};

/**
 * Функция для получения универсального Response-объекта отражающего выброшенную ошибку
 */
const getErrorResponse = (input?: NewErrorResponseInput): Response => {
  const errorResponse = new Response(
    JSON.stringify({
      errorMessage: input?.message ?? 'an error occurred',
      statusText: input?.code ? HttpStatusText[input?.code] : 'ERROR',
      status: input?.code ?? HttpStatus.INTERNAL_SERVER_ERROR,
    }),
    {
      statusText: input?.message ?? 'ERROR',
      status: input?.code ?? HttpStatus.INTERNAL_SERVER_ERROR,
    },
  );
  errorResponse.headers.set('Content-Type', 'application/json');
  return errorResponse;
};

/**
 * Универсальный хендлер ошибки для приложения
 * - перехватывает ошибки выброшенные в роутерах/middleware
 * - производит логирование ошибки
 * - приводит любую ошибку к универсальному формату - Response объект с JSON содержимым
 */
export const errorHandler = (
  error: AppError | Error | string | unknown,
): Response | Promise<Response> => {
  const {
    // errorScope,
    errorCode,
    errorMessage,
    // errorStack,
    // additionalInfo,
    // logLevel,
  } = getErrorCommonFields(error);

  // const objectToLog = {
  //   message: errorMessage,
  //   scope: errorScope,
  //   statusCode: errorCode,
  //   stack: errorStack,
  //   additionalInfo,
  // }; <- что-то такое можно выводить в логи в будущем

  return getErrorResponse({
    code: errorCode,
    message: errorMessage,
  });
};
