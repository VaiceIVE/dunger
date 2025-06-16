import { OpenAiMessage } from './OpenAiMessage';

export class GenerationResultWithHistory {
  messages: OpenAiMessage[];
  result: string;
}
