import { IsInt, IsOptional } from "class-validator"

export class PaginationQuery{
    @IsInt()
    @IsOptional()
    limit: number = 20

    @IsInt()
    @IsOptional()
    offset: number = 0

    @IsInt()
    totalCount: number
}