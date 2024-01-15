import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import exp from 'constants'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckinUseCase } from './checkin'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let usersRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckinUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
     usersRepository = new InMemoryCheckInsRepository()
     gymsRepository = new InMemoryGymsRepository()
     sut = new CheckinUseCase(usersRepository, gymsRepository)
    
     gymsRepository.items.push({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: 'Gym',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0)
    })

     vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })


  it('should be able to check in', async () => {
    

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })

    
    expect(checkIn.id).toEqual(expect.any(String))
  })


  it('should not be able to check in twice a day', async () => {
    vi.setSystemTime(new Date(2022,0,20,8,0,0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })
    
    await expect(() => {
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should  be able to check in different days', async () => {
    vi.setSystemTime(new Date(2022,0,20,8,0,0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091
    })

    vi.setSystemTime(new Date(2022,0,21,8,0,0))
    
    const { checkIn } = await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091
      })
  

    expect(checkIn.id).toEqual(expect.any(String))
  })
})