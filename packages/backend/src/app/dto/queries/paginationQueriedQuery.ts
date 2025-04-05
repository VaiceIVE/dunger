import { IsInt } from "class-validator"

export class PaginationQureiedQuery{
    @IsInt()
    limit: number
    @IsInt()
    offset: number

    totalCount: number
    query?: string
}