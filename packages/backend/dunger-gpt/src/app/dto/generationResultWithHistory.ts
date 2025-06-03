import { OpenAIMessage } from "./OpanAiMessage";

export class GenerationResultWithHistory{
    messages: OpenAIMessage[]
    result: string
}