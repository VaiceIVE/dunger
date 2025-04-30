import { HttpStatus, HttpStatusText } from '@dunger/common-enums';

import type { AppError } from './AppError.js';
import { getErrorCommonFields } from './getErrorCommonFields.js';

type NewErrorResponseInput = {
  code?: HttpStatus;
  message?: string;
};

type HandlerResponse = {
  status: HttpStatus;
  body: {
    errorMessage: string;
    statusText: string;
    status: HttpStatus;
  };
};

/**
 * Функция для получения универсального HandlerResponse-объекта отражающего выброшенную ошибку
 */
const getErrorResponse = (input?: NewErrorResponseInput): HandlerResponse => {
  return {
    status: input?.code ?? HttpStatus.INTERNAL_SERVER_ERROR,
    body: {
      errorMessage: input?.message ?? 'an error occurred',
      statusText: input?.code ? HttpStatusText[input?.code] : 'ERROR',
      status: input?.code ?? HttpStatus.INTERNAL_SERVER_ERROR,
    },
  };
};

/**
 * Универсальный хендлер ошибки для приложения
 * - перехватывает ошибки выброшенные в роутерах/middleware
 * - производит логирование ошибки
 * - приводит любую ошибку к универсальному формату - HandlerResponse объект с JSON содержимым
 */
export const errorHandler = (
  error: AppError | Error | string | unknown,
): HandlerResponse => {
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
