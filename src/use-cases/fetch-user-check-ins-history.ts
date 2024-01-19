import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInHistoryUseCaseCaseRequest {
  userId: string
  page: number
}


interface FetchUserCheckInHistoryUseCaseCaseResponse {
  checkIns: CheckIn[]
}


export class FetchUserCheckInHistoryUseCaseCase {
  constructor (
    private checkInsRepository: CheckInsRepository
  ) {}

  async execute ({
    userId,
    page
  }: FetchUserCheckInHistoryUseCaseCaseRequest): Promise<FetchUserCheckInHistoryUseCaseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)


    return {
      checkIns
    }
  }
}