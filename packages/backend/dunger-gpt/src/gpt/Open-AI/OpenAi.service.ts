import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InterviewInfo } from '../../gpt/interface/start-interview.interface';
import axios from 'axios';
import {HttpsProxyAgent} from 'https-proxy-agent'
import fetch from 'node-fetch';
import { IGptService } from '../interface/gpt-service.interface';
import { OpenAiRequest } from '../interface/open-ai-request';
import { ChatGptAiMessage } from '../interface/chatgpt-ai-message';

@Injectable()
export class OpenAiService implements IGptService {
  constructor(private readonly configService: ConfigService) {}

  private getPromt(
    interview_position_level: string,
    interview_main_dev_lang: string,
    interview_position: string
  ) {
    return {
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `Ты выступаешь в роли генератора сущностей для настольной ролевой игры подземелья и драконы.`,
        },
      ],
      temperature: 1
    };
  }

  async requestToModel(
    interview_id: number,
    data: OpenAiRequest,
  ): Promise<ChatGptAiMessage> {
    console.log(JSON.stringify(data));
    const proxyString = `http://${this.configService.get<string>('PROXY_USERNAME') + ':' + this.configService.get<string>('PROXY_PASSWORD') + '@' + this.configService.get<string>('PROXY_URL') + ':' + this.configService.get<number>('PROXY_PORT').toString()}`
    const proxyAgent = new HttpsProxyAgent(proxyString)
    const response = (await axios.post(
      this.configService.get<string>('OPENAI_CHAT_API_URL'),
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.configService.get<string>('OPENAI_OAUTH')}`
        },
        httpsAgent: proxyAgent,
        proxy: false
      },
    ))
    const responseData = response.data

    // if (!responseData.ok) {
    //   throw new HttpException(
    //     {
    //       status: responseData.status,
    //       message: { error: await responseData.json(), interview_id: interview_id },
    //     },
    //     responseData.status,
    //   );
    // }
    console.log(responseData.choices[0])
    return await responseData;
  }

  //при текущем промте метод лишний. пока оставил так как пром может поменяться
  appendCandidateInfoToPromt(candidateIndo: InterviewInfo) {
    const promt = this.getPromt(
      candidateIndo.interview_position_level,
      candidateIndo.interview_main_dev_lang,
      candidateIndo.interview_position
    );
    // promt.messages[0].text =
    //   promt.messages[0].text + `${JSON.stringify(candidateIndo)}`;
    return promt;
  }

  async getEstimation(interview_id: number, data: OpenAiRequest) {
    const estimationPromt = {
      role: 'user',
      content: "Теперь дай итоговую оценку собеседумего в формате JSON объекта ```json{interview_estimation : <0..10> - целое число, среднее арифметическое question_estimation для всех вопросов, interview_feedback: \"\", questions_estimations: [{question_number: <1..5>, question_text: \"\", question_answer: ответ пользователя на вопрос, question_estimation: <0..10> - Оценка решения задачи если тип вопроса PRACTICE, если тип вопроса THEORY - среднее арифметическое из answer_fulfilment, answer_accuracy, answer_understanding, answer_specificity, question_feedback: \"\", question_type: <PRACTICE, THEORY> - в зависимости от того, является ли вопрос практической задачей или теоретическим вопросом, answer_fulfilment - Поле есть только у вопросов с типом THEORY, отражает полноту ответа на вопрос, answer_accuracy - Поле есть только у вопросов с типом THEORY, отражает точность ответа на вопрос, answer_understanding  - Поле есть только у вопросов с типом THEORY, отражает полноту понимания темы вопроса, answer_specificity - Поле есть только у вопросов с типом THEORY, отражает конкретность ответа на вопрос, отсутствие излишних упрощений}]}``` полученный json должен без ошибок обрабатываться функцией JSON.parse() в языке JavaScript, оцени его знания по шкале от 0 до 10, и дай финальный комментарий. Оценка и комментарий должны быть даны как по интервью в целом, так и по каждому из вопросов. Когда даешь комментарий, обращайся напрямую к пользователю на ты. В любом комментарии ты обязан сказать пользователю, в каких областях связанных с ответом он может стать лучше. Значением поля interview_estimation должна быть оценка от 0 до 10, а interview_feedback - итоговый комментарий. В итоговом комментарии отметь сильные и слабые стороны собеседуемого, обоснуй свою оценку, что собеседуемому необходимо лучше усвоить, чтобы получить 10. В случае несоблюдения формата ответа ты получишь штраф в 100$",
    };
    data.messages.push(estimationPromt);
    return await this.requestToModel(interview_id, data);
  }

}
