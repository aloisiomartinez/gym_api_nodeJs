import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'
import { ValidateCheckInUseCase } from './validate-check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
     checkInsRepository = new InMemoryCheckInsRepository()
     sut = new ValidateCheckInUseCase(checkInsRepository)
    
  
     //vi.useFakeTimers()
  })

  afterEach(() => {
    //vi.useRealTimers()
  })


  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

     const {checkIn} = await sut.execute({
      checkInId: checkIn.id
    
    })

    
    expect(checkIn.id).toEqual(expect.any(String))
  })

})