import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { prisma } from "@/lib/prisma";

export class PrismaGymsRepository implements GymsRepository {
  create(data: Prisma.GymCreateInput)  {
    
  }
  findManyNearBy(params: FindManyNearbyParams)  {
    throw new Error("Method not implemented.");
  }
  searchMany(query: string, page: number)  {
    throw new Error("Method not implemented.");
  }
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      }
    })
  }
}