import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { Gym, User } from "@prisma/client";
import { UsersRepository } from "@/repositories/users-repository";
import { GymsRepository } from "@/repositories/gyms-repository";

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userLatitude,
    userLongitude
  }: FetchNearbyGymsUseCaseRequest) :Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearBy(
      {
        latitude: userLatitude,
        longitude: userLongitude
      }
    )

    return {
      gyms,
    }
}
}
