import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { OpenAiMessage, OpenAiRequest } from 'src/types/OpenAiMessage';
import { PromptService } from 'src/prompt/prompt.service';
import { CreateCreatureDto } from './dto/create-creature.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly promptService: PromptService,
    private readonly configService: ConfigService,
  ) {}

  async createCreature(input: CreateCreatureDto) {
    const creaturePrompt = this.promptService.getCreaturePrompt(
      input.name,
      input.challenge_rating,
      input.type_name,
      input.creation_description,
      input.role,
    );

    const modelResponse = await this.makeRequestToModel(
      this.generateOpenAiRequest([this.generateFirstMessage(creaturePrompt)]),
    );

    return modelResponse;
  }

  private generateFirstMessage(content: string): OpenAiMessage {
    return {
      role: 'system',
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
      modelResponse;
      console.log(error);
      console.log(error.response);
      console.log(error.response.data);
    }

    const responseData = modelResponse.data;

    return JSON.parse(
      responseData.output[0].content[0].text
        .replace('```', '')
        .replace('```', '')
        .replace(`json`, ''),
    );
  }
}
