import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileRequest {
 userId: string
}


interface GetUserPRofileUseCaseResponse {
  user: User
}


export class GetUserProfileUseCase {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute ({
    userId
  }: GetUserProfileRequest): Promise<GetUserPRofileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user
    }
  }
}