import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymUseCase } from "../search-gyms";

export function makeSearchGymsUseCase() {
  const gymsRepositories = new PrismaGymsRepository()
  const useCase = new SearchGymUseCase(gymsRepositories)

  return useCase
}