import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'


import { FetchUserCheckInHistoryUseCaseCase } from './fetch-user-check-ins-history'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search gyms Use Case', () => {
  beforeEach(async () => {
     gymsRepository = new InMemoryGymsRepository()
     sut = new SearchGymUseCase(gymsRepository)
  })


  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: "NodeJS Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091
    })

    await gymsRepository.create({
      title: "Java Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091
    })


    const { gyms } = await sut.execute({
      query: 'NodeJS',
      page: 1
    })

    
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({title: "NodeJS Gym",}),
    ])

  })

  it.skip('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i<=22; i++) {
      await gymsRepository.create({
        title: `Java Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091
      })
    }


    const { gyms } = await sut.execute({
      query: 'Java',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({title: "Java Gym 21",}),
      expect.objectContaining({title: "Java Gym 22",})
    ])

  })

})