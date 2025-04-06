export interface OpenAiRequest {
    model: string;
    messages: Message[];
  }
  
  interface Message {
    role: string;
    content: string;
  }
  