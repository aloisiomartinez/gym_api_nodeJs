import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { prisma } from "@/lib/prisma";

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput)  {
    const gym = await prisma.gym.create({
      data
    })

    return gym;
  }

  findManyNearBy(params: FindManyNearbyParams)  {
    throw new Error("Method not implemented.");
  }

  async searchMany(query: string, page: number)  {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query
        }
      },
  
      take: 20,
      skip: (page -1) * 20
    }
  )
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      }
    })
  }
}