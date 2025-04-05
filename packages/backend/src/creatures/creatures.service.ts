import { Injectable } from '@nestjs/common';
import { CreateCreatureManualDto } from './dto/createCreatureManual.dto';
import { UpdateCreatureDto } from './dto/update-creature.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationQureiedQuery } from 'src/app/dto/queries/paginationQueriedQuery';
import { PaginationQuery } from 'src/app/dto/queries/paginationQuery';

@Injectable()
export class CreaturesService {
  constructor(
    private readonly prisma: PrismaClient
  ){}

  async initCreature(createCreatureDto: CreateCreatureManualDto) {
    if(createCreatureDto.template_id != null && createCreatureDto.template_id != undefined){
      const template = await this.prisma.creature.findUnique({
        where: {id: createCreatureDto.template_id}
      })
      delete template.id
      template.name = createCreatureDto.name
      template.challenge_rating = createCreatureDto.challenge_rating
      return await this.prisma.creature.create({
        data: template,
        select: {
          id: true
        }
      })
    }
    return await this.prisma.creature.create({
      data: {
        name: createCreatureDto.name,
        challenge_rating: createCreatureDto.challenge_rating
      },
      select: {
        id: true
      }
    })
  }

  findAll() {
    return `This action returns all creatures`;
  }

  async findTemplates(query: PaginationQureiedQuery){
    let results = []
    let total = 0
    if(query.query){
      results = await this.prisma.creature.findMany({
        where: {
          name: {
            contains: query.query
          }
        },
        select: {
          name: true,
          id: true
        },
        skip: query.offset,
        take: query.limit
      })
      total = await this.prisma.creature.count({
        where: {
          name: {
            contains: query.query
          }
        }
      })
    }else{
      results = await this.prisma.creature.findMany({
        select: {
          name: true,
          id: true
        },
        skip: query.offset,
        take: query.limit
      })
      total = await this.prisma.creature.count()
    }

    return {
      pagination: {
        limit: query.limit,
        offset: query.offset,
        totalCount: total
      },
      results: results,
    }
    
  }

  async findTypes(){
    return await this.prisma.type.findMany({
      select: {
        id: true,
        name: true
      }
    })
  }

  async findAlignment(){
    return await this.prisma.alignment.findMany()
  }

  async findSizes(){
    return await this.prisma.size.findMany()
  }

  async findBimes(){
    return await this.prisma.biome.findMany({})
  }

  async findDamageType(){
    return await this.prisma.damageType.findMany()
  }

  async findOne(id: string) {
    return await this.prisma.creature.findUnique({
      where: {
        id: id
      }
    })
  }

  async findCR(){
    return await this.prisma.challengeRating.findMany()
  }

  async findSkills(){
    return await this.prisma.skill.findMany()
  }

  async findTraitsGroups(){
    return await this.prisma.trait.findMany({
      distinct: ['name'],
      select: {
        name: true
      }
    })
  }

  async findActionsGroups(){
    return await this.prisma.action.findMany({
      distinct: ['name'],
      select: {
        name: true
      }
    })
  }

  private cleanObj(obj){
    var newobj = {}
    const complexPropnames = ['speed', 'stats', 'skills', 'languages', 'actions', 'traits', 'size_key']
    for (var propname in obj){
      if(!(obj[propname] === null || obj[propname] === undefined || complexPropnames.includes(propname))){
        newobj[propname] = obj[propname]
      }
    }
    return newobj
  }

  async update(id: string, updateCreatureDto: UpdateCreatureDto) {
    const cleanedUpdatedCreatureDto = this.cleanObj(updateCreatureDto)
    await this.prisma.creature.update({
      where: {id: id},
      data: {
        ...cleanedUpdatedCreatureDto,
      }
    });
    if(updateCreatureDto.size_key){
      await this.prisma.creature.update({
        where: {
          id: id
        },
        data: {
          size_relation: {
            connect: {
              id: updateCreatureDto.size_key
            }
          }
        }
      })
    }
    if(updateCreatureDto.speed){
      await this.prisma.creature.update({
        where: {id: id},
        data: {
          speed: {
            upsert: {
              where: {
                id_relation: {
                  id: id
                }
              },
              create: updateCreatureDto.speed,
              update: this.cleanObj(updateCreatureDto.speed)
            },
            
          }
        }
      })
    }
    if(updateCreatureDto.stats){
      await this.prisma.creature.update({
        where: {id: id},
        data: {
          stats: {
            upsert: {
              where: {
                id_relation: {
                  id: id
                }
              },
              create: updateCreatureDto.stats,
              update: this.cleanObj(updateCreatureDto.stats)
            },
            
          }
        }
      })
    }
    if(updateCreatureDto.skills){
      await this.prisma.creature.update({
        where: {id: id},
        data: {
          skills: {
            upsert: {
              where: {
                id_relation: {
                  id: id
                }
              },
              create: updateCreatureDto.skills,
              update: this.cleanObj(updateCreatureDto.skills)
            },
            
          }
        }
      })
    }
    if(updateCreatureDto.languages){
      await this.prisma.creature.update({
        where: {
          id: id
        },
        data: {
          languages: {
            set: []
          }
        }
      })
      for( var languageName of updateCreatureDto.languages){
        await this.prisma.creature.update({
          where: {id: id},
          data: {
            languages: {
              connectOrCreate: {
                where: {
                  name: languageName
                },
                create: {
                  name: languageName
                }
              }
              }
            }
          })
        }
      }
    if(updateCreatureDto.actions){
      await this.prisma.creature.update({
        where: {id: id},
        data: {
          actions: {
            deleteMany: {},
            create: updateCreatureDto.actions
          }
        }
      })
    }
    if(updateCreatureDto.traits){
      await this.prisma.creature.update({
        where: {id: id},
        data: {
          traits: {
            deleteMany: {},
            create: updateCreatureDto.traits
          }
        }
      })
    }
    return await this.prisma.creature.findUnique({
      where: {
        id: id
      },
      include: {
        speed: true,
        skills: true,
        stats: true,
        actions: true,
        traits: true,
        languages: true
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} creature`;
  }
}
