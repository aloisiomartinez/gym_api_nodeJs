import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymUseCase } from "../search-gyms";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

export function makeFetchNearbyGymsUseCase() {
  const gymsRepositories = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(gymsRepositories)

  return useCase
}