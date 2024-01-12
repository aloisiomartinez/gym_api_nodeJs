import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface CheckinUseCaseRequest {
 userId: string
 gymId: string
}


interface CheckinUseCaseResponse {
  checkIn: CheckIn
}


export class CheckinUseCase {
  constructor (
    private checkInsRepository: CheckInsRepository
  ) {}

  async execute ({
    userId,
    gymId
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
     gym_id: gymId,
     user_id: userId
    })

 
    return {
      checkIn
    }
  }
}