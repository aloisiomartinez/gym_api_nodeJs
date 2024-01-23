import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { Gym, User } from "@prisma/client";
import { UsersRepository } from "@/repositories/users-repository";
import { GymsRepository } from "@/repositories/gyms-repository";

interface SearchGymUseCaseRequest {
  query: string
  page: number
}

interface SearchGymUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    query,
    page
  }: SearchGymUseCaseRequest) :Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(
      query,
      page
    )

    return {
      gyms,
    }
}
}
