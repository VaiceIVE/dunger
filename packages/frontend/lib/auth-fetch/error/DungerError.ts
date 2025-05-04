import { HttpStatus } from '@dunger/common-enums';

export interface DungerErrorBody {
  code: string;
  errorText: string;
  errorScope: string;
  statusCode: HttpStatus;
}

export class DungerError extends Error {
  body: DungerErrorBody;

  constructor(body: DungerErrorBody) {
    super(body.errorText);
    this.name = 'DungerError';
    this.body = body;
  }
}

export function isDungerErrorBody(body: DungerErrorBody | null | undefined): body is DungerErrorBody {
  return !!(body as DungerErrorBody | null)?.errorScope && !!(body as DungerErrorBody | null)?.statusCode;
}
