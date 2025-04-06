import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StartInterview } from './interface/start-interview.interface';
import { SendMessage } from './interface/send-message.interface';
import { OpenAiService } from './Open-AI/OpenAi.service';
import { parseMessage } from './parseMessageFromAi/parse-messge';


@Injectable()
export class ChatGptService {
  constructor(
    private readonly configService: ConfigService,
    private readonly openAiService: OpenAiService,
  ) {}

  async startInterview(data: StartInterview): Promise<void> {
    const interview_id = data.interview_id;
    const modificationPromt = this.openAiService.appendCandidateInfoToPromt(
      data.interview_info,
    );
    const responseAi = await this.openAiService.requestToModel(
      interview_id,
      modificationPromt,
    );
    const message_data = parseMessage(
      responseAi.choices[0].message,
      interview_id,
    );
  }

  async sendMessageAi(
    message_text: string,
    interview_id: number,
  ): Promise<void> {
    const req = { role: 'user', content: message_text };
    const { historyMessages, candidateInfo } = {
      ...(await this.dbService.getMessages(interview_id)),
    };
    const modificationPromt =
      this.openAiService.appendCandidateInfoToPromt(candidateInfo);
    modificationPromt.messages.push(...historyMessages);
    modificationPromt.messages.push(req);
    const responseAi = await this.openAiService.requestToModel(
      interview_id,
      modificationPromt,
    );
    const message_data = parseMessage(
      responseAi.choices[0].message,
      interview_id,
    );

  }

}
