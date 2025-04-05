import { IsInt } from "class-validator"

export class PaginationQuery{

    @IsInt()
    limit: number = 20

    @IsInt()
    offset: number

    @IsInt()
    totalCount: number
}