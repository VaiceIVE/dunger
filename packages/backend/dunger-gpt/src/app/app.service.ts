import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { OpenAiMessage, OpenAiRequest } from 'src/types/OpenAiMessage';
import { PromptService } from 'src/prompt/prompt.service';
import { CreateCreatureDto } from './dto/create-creature.dto';
import { GenerationResultWithHistory } from 'src/types/generationResultWithHistory';

@Injectable()
export class AppService {
  constructor(
    private readonly promptService: PromptService,
    private readonly configService: ConfigService,
  ) {}

  async createCreature(
    input: CreateCreatureDto,
  ): Promise<GenerationResultWithHistory> {
    const creaturePrompt = this.promptService.getCreaturePrompt(
      input.name,
      input.challenge_rating,
      input.type_name,
      input.creation_description,
      input.role,
    );

    const messages = [this.generateFirstMessage(creaturePrompt)];

    const request = this.generateOpenAiRequest(messages);

    const modelResponse = await this.makeRequestToModel(request);

    messages.push(this.generateModelMessage(JSON.stringify(modelResponse)));

    return { messages, result: modelResponse };
  }

  async regenerateCreature(
    message_history: OpenAiMessage[],
    validator_feedback: string,
  ): Promise<GenerationResultWithHistory> {
    message_history.push(this.generateClientMessage(validator_feedback));

    const request = this.generateOpenAiRequest(message_history);

    const modelResponse = await this.makeRequestToModel(request);

    message_history.push(
      this.generateModelMessage(JSON.stringify(modelResponse)),
    );

    return { messages: message_history, result: modelResponse };
  }

  private generateFirstMessage(content: string): OpenAiMessage {
    return {
      role: 'developer',
      content: content,
    };
  }

  private generateClientMessage(content: string): OpenAiMessage {
    return {
      role: 'user',
      content: content,
    };
  }

  private generateModelMessage(content: string): OpenAiMessage {
    return {
      role: 'assistant',
      content: content,
    };
  }

  private generateOpenAiRequest(messages: OpenAiMessage[]): OpenAiRequest {
    return {
      model: 'gpt-4o',
      input: messages,
      temperature: 1,
    };
  }

  private async makeRequestToModel(request: OpenAiRequest) {
    const proxyString = `http://${this.configService.get<string>('PROXY_USERNAME') + ':' + this.configService.get<string>('PROXY_PASSWORD') + '@' + this.configService.get<string>('PROXY_URL') + ':' + this.configService.get<number>('PROXY_PORT').toString()}`;
    const proxyAgent = new HttpsProxyAgent(proxyString);
    console.log(request);
    console.log(proxyString);
    let modelResponse;
    try {
      modelResponse = await axios.post(
        this.configService.get<string>('OPENAI_CHAT_API_URL'),
        JSON.stringify(request),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.configService.get<string>('OPENAI_OAUTH')}`,
          },
          httpsAgent: proxyAgent,
          proxy: false,
        },
      );
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response.data);
    }

    const rawText = modelResponse.data.output[0].content[0].text;

    // Удаляем markdown-обёртки и обрезаем всё до первой {
    const cleaned = rawText
      .replace(/```json|```/g, '') // убирает ```` ```json`` и ```` ````
      .trim();

    const jsonText = cleaned.slice(cleaned.indexOf('{'));

    return JSON.parse(jsonText);
  }
}
