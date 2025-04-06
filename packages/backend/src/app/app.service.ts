import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SubtypeDTO } from 'src/app/dto/subtype.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaClient
  ){}
  getHello(): string {
    return 'Hello World!';
  }
   
}
