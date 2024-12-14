import { vi } from 'vitest'
import { Languages } from '../models/languages'
import * as getLevelInfo from '../models/level'
import { CurrentStatusData } from '../models/saved'
import { getCurrentStatus, saveCurrentStatus } from './storage'

describe('storage', () => {
  const currentStatusData: CurrentStatusData = {
    levelName: 'test',
    levelData: {
      interaction: 0,
    },
    language: Languages.EN,
    player: {
      position: {
        x: 5,
        y: 5,
      },
    },
  }

  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

  afterEach(() => {
    localStorage.clear()
    setItemSpy.mockClear()
  })

  it('can store currentStatus data', async () => {
    const result = await saveCurrentStatus(currentStatusData)
    expect(result).toBeTruthy()
  })

  it('can store and retrieve currentStatus data', async () => {
    await saveCurrentStatus(currentStatusData)
    const data = await getCurrentStatus()
    expect(data).toEqual(currentStatusData)
  })

  it("returns false when can't store a currentStatus", async () => {
    setItemSpy.mockImplementation(() => {
      throw Error('Not allowed')
    })
    const result = await saveCurrentStatus(currentStatusData)
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
