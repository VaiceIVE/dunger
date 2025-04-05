import { IsInt, IsOptional } from "class-validator"

export class PaginationQureiedQuery{
    @IsInt()
    @IsOptional()
    limit: number = 20
    @IsInt()
    @IsOptional()
    offset: number = 0

    totalCount: number
    query?: string
}