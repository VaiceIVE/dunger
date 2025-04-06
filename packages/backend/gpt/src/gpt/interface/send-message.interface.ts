export interface SendMessage {
  message_data: MessageData;
}

interface MessageData {
  interview_id: number;
  message_text: string;
}
