import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { ApiCreatureAiInput } from 'src/dto/ApiCreatureAiInput';
import { GenerationResultWithHistory } from 'src/dto/generationResultWithHistory';
import { OpenAIMessage, OpenAIRequest } from 'src/dto/OpanAiMessage';
import { PromptService } from 'src/prompt/prompt.service';

@Injectable()
export class GptService {

    constructor(
        private readonly promptService: PromptService,
        private readonly configService: ConfigService
    ){}

    async createCreature(input: ApiCreatureAiInput): Promise<GenerationResultWithHistory>{
        const creaturePrompt = this.promptService.getCreaturePrompt(input.name, input.challenge_rating, input.type, input.creation_description, input.role)
        
        const messages = [this.generateFirstMessage(creaturePrompt)]

        const request = this.generateOpenAIRequest(messages)

        const modelResponse = await this.makeRequestToModel(request)

        messages.push(this.generateModelMessage(JSON.stringify(modelResponse)))

        return {messages, result: modelResponse}
    }

    async regenerateCreature(message_history: OpenAIMessage[], validator_feedback: string): Promise<GenerationResultWithHistory>{

        message_history.push(this.generateClientMessage(validator_feedback))

        const request = this.generateOpenAIRequest(message_history)

        const modelResponse = await this.makeRequestToModel(request)

        message_history.push(this.generateModelMessage(JSON.stringify(modelResponse)))

        return {messages: message_history, result: modelResponse}

    }

    private generateFirstMessage(content: string): OpenAIMessage{
        return {
                role: 'developer',
                content: content,
            }
    }

    private generateClientMessage(content: string): OpenAIMessage{
        return {
            role: 'user',
            content: content
        }
    }

    private generateModelMessage(content: string): OpenAIMessage{
        return {
            role: 'assistant',
            content: content
        }
    }

    private generateOpenAIRequest(messages: OpenAIMessage[]): OpenAIRequest{
        return {
            model: 'gpt-4o',
            input: messages,
            temperature: 1
          };
    }

    private async makeRequestToModel(request: OpenAIRequest){
        const proxyString = `http://${this.configService.get<string>('PROXY_USERNAME') + ':' + this.configService.get<string>('PROXY_PASSWORD') + '@' + this.configService.get<string>('PROXY_URL') + ':' + this.configService.get<number>('PROXY_PORT').toString()}`
        const proxyAgent = new HttpsProxyAgent(proxyString)
        console.log(request)
        console.log(proxyString)
        let modelResponse
        try {
            modelResponse = (await axios.post(
                this.configService.get<string>('OPENAI_CHAT_API_URL'),
                JSON.stringify(request),
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.configService.get<string>('OPENAI_OAUTH')}`
                  },
                  httpsAgent: proxyAgent,
                  proxy: false
                },
              ))
        } catch (error) {
            modelResponse
            console.log(error)
            console.log(error.response)
            console.log(error.response.data)

        }
      
        const responseData = modelResponse.data
        
        return JSON.parse(responseData.output[0].content[0].text.replace('```', '').replace('```', '').replace(`json`, ''))
    }
}
