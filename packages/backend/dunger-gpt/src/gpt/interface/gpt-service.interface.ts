
import { InterviewInfo } from '../../gpt/interface/start-interview.interface';

export interface IGptService{

  requestToModel(
    interview_id: number,
    data: any,
  )
  //при текущем промте метод лишний. пока оставил так как пром может поменяться
  appendCandidateInfoToPromt(candidateIndo: InterviewInfo)

  getEstimation(interview_id: number, data: any)
}
