import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

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
      checkInId: createdCheckIn.id
    })

    
    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))

  })

  it('should not be able to validate an inexistent check-in', async () => {

    expect(() => 
    sut.execute({
      checkInId: 'inexistent-check-in-d'
    }),

    ).rejects.toBeInstanceOf(ResourceNotFoundError)

    
    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))

  })

})