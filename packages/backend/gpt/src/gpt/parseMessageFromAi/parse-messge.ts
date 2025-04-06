import { HttpException } from '@nestjs/common';

export function parseMessage(
  payload: any,
  interview_id: number,
) : {text: string; message_is_final?: boolean}
 {
  try {
    const regex = /\{is\s+final:\s+true\}/;
    const final = regex.test(payload.content);
    payload.content = payload.content
      .replace(/(\n)+/g, '')
      .replace(/\{is final:.*?\}/g, '')
      .trim();

    if (final) {
      payload = {
        ...payload,
        message_is_final: true,
      };
    }
    console.log(payload)
    return {
        text: payload.content,
        message_is_final: payload.message_is_final
      }
  } catch (error) {
    console.error(error);
    throw new HttpException(
      {
        status: 500,
        message: { error: 'parse error', interview_id: interview_id },
      },
      500,
    );
  }
}
