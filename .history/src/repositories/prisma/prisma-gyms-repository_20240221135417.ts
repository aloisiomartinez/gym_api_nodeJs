import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";

export class PrismaGymsRepository implements GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<{ id: string; title: string; description: string | null; phone: string | null; latitude: Decimal; longitude: Decimal; }> {
    throw new Error("Method not implemented.");
  }
  findManyNearBy(params: FindManyNearbyParams): Promise<{ id: string; title: string; description: string | null; phone: string | null; latitude: Decimal; longitude: Decimal; }[]> {
    throw new Error("Method not implemented.");
  }
  searchMany(query: string, page: number): Promise<{ id: string; title: string; description: string | null; phone: string | null; latitude: Decimal; longitude: Decimal; }[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<{ id: string; title: string; description: string | null; phone: string | null; latitude: Decimal; longitude: Decimal; } | null> {
    throw new Error("Method not implemented.");
  }
  
}