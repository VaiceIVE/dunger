export class EstimationDTO{

    constructor(
    private readonly interview_id: number,
    private readonly interview_estimation: string,
    private readonly interview_feedback: string,
    private readonly questions_estimations: QeustionEstimationDTO[]
    ){}
}

export class QeustionEstimationDTO{
    constructor(
        private readonly question_number: number,
        private readonly question_text: string,
        private readonly question_answer: string,
        private readonly question_estimation: number,
        private readonly question_feedback: string
    ){}
}
