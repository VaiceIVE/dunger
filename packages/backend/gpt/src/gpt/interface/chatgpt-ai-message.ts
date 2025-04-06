export interface ChatGptAiMessage {
    choices: Choice[]
    model: string
    
  }
export class Choice{
    index: number
    message: {
        role: string,
        content: string,
        refusal: boolean
    }
}