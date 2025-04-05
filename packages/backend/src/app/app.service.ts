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

  createCreature(){
    this.prisma.creature.create({
      data: {
        immunities: [
          'Acid',
          'Bludgeoning'
        ],
        languages: {
          create: [
            {
              name: "Russkii"
            }
          ]
        },
        resistances: [
          'Acid',
          'Cold'
        ],
        speed: {
          create: {
            walk: 30
          }
        },
        stats: {
          create: {
            wis: 10,
            cha: 10,
            con: 10,
            dex: 10,
            int: 10,
            str: 10
          }
        },
        vunlerabilities: [
          'Radiant',
          'Lightning'
        ],
        actions: {
          create: [
            {
              name: "Action 1",
              text: "creature does an action",
            }
          ]
        },
        traits: {
          create: [
            {
              name: "Action 1",
              text: "creature has trait",
            }
          ]
        },
        skills:{
          create: {
            acrobatics: 12,
            animal_handling: 5
          }
        },
        armor_class: 14,
        challenge_rating: "1",
        description: 'creature',
        hit_points: 10,
        name: "Creat",
        passive_perception: 10,
        alignment_relation: {
          create: {
            name: "Good"
          }
        },
        size_relation: {
          create: {
            id: "L",
            name: "Large"
          }
        },
        type_relation: {
          create: {
            name: "Creature"
          }
        },
        biome_relation: {
          create: {
            title: "Les",
            key: "Forest"
          }
        },
        source_relation: {
          create: {
            key: "ADER",
            title: "Dunger universe"
          }
        },
        race_relation: {
          create: {
            name: "AWW",
            description: "an elf"
          }
        }
      },
      select: {
        id: true
      }
    })
  }
   
}
