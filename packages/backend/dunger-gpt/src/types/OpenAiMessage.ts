export class OpenAiMessage {
  role: string;
  content: string;
}

export class OpenAiRequest {
  model: string;
  input: OpenAiMessage[];
  temperature: number;
}
