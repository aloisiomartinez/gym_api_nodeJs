import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymUseCase } from "../search-gyms";
import { CreateGymUseCase } from "../create-gym";

export function makeCreateGymUseCase() {
  const gymsRepositories = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepositories)

  return useCase
}