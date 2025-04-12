export class OpenAIMessage{
    role: string
    content: string
}

export class OpenAIRequest{
    model: string
    input: OpenAIMessage[]
    temperature: number
}