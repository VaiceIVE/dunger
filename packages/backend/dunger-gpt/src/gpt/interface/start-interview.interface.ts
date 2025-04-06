export interface StartInterview {
  user_id: string;
  model: string;
  interview_id: number;
  interview_info: InterviewInfo;
}

export interface InterviewInfo {
  interview_position_level: PositionLevel;
  interview_main_dev_lang: string;
  interview_position: string;
  interview_cv: string;
}

enum PositionLevel {
  JUNIOR = 'JUNIOR',
  MIDDLE = 'MIDDLE',
  LEAD = 'LEAD',
  SENIOR = 'SENIOR',
}
