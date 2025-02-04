import { vi } from 'vitest'
import { Languages } from '../models/languages'
import * as getLevelInfo from '../models/level'
import { CurrentStatusData } from '../models/saved'
import { getCurrentStatus, setCurrentStatus } from './storage'

describe('storage', () => {
  const currentStatusData: CurrentStatusData = {
    levelData: {
      interaction: 0,
      levelName: 'test',
    },
    language: Languages.EN,
    player: {
      player: {
        name: 'testPlayer',
        position: {
          x: 5,
          y: 5,
        },
      },
      inventory: [],
    },
  }

  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

  afterEach(() => {
    localStorage.clear()
    setItemSpy.mockClear()
  })

  it('can store currentStatus data', async () => {
    const result = await setCurrentStatus(currentStatusData)
    expect(result).toBeTruthy()
  })

  it('can store and retrieve currentStatus data', async () => {
    await setCurrentStatus(currentStatusData)
    const data = await getCurrentStatus()
    expect(data).toEqual(currentStatusData)
  })

  it("returns false when can't store a currentStatus", async () => {
    setItemSpy.mockImplementation(() => {
      throw Error('Not allowed')
    })
    const result = await setCurrentStatus(currentStatusData)
    expect(result).toBeFalsy()
  })

  it("gets undefined when it can't retrieve any data", async () => {
    const getLevelInfoSpy = vi.spyOn(getLevelInfo, 'getLevelInfo')
    getLevelInfoSpy.mockImplementation(() => {
      return undefined
    })
    const data = await getCurrentStatus()
    expect(data).toBeUndefined()
  })
})
