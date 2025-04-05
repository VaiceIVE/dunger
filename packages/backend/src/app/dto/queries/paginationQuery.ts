import { IsInt } from "class-validator"

export class PaginationQuery{

    @IsInt()
    limit: number

    @IsInt()
    offset: number

    @IsInt()
    totalCount: number
}