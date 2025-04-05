import { IsInt } from "class-validator"

export class PaginationQureiedQuery{
    @IsInt()
    limit: number = 20
    @IsInt()
    offset: number

    totalCount: number
    query?: string
}