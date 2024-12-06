import { vi } from 'vitest'
import * as getLevelInfo from '../models/level'
import { CurrentStatusData } from '../models/saved'
import { getCurrentStatus, saveCurrentStatus } from './storage'

describe('storage', () => {
  const currentStatusData: CurrentStatusData = {
    levelName: 'test',
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

  it('can store currentStatus data', () => {
    const result = saveCurrentStatus(currentStatusData)
    expect(result).toBeTruthy()
  })

  it('can store and retrieve currentStatus data', () => {
    saveCurrentStatus(currentStatusData)
    const data = getCurrentStatus()
    expect(data).toEqual(currentStatusData)
  })

  it("returns false when can't store a currentStatus", () => {
    setItemSpy.mockImplementation(() => {
      throw Error('Not allowed')
    })
    const result = saveCurrentStatus(currentStatusData)
    expect(result).toBeFalsy()
  })

  it('retrieves currentStatus defaults data when there is nothing stored', () => {
    const defaultCurrentStatus: CurrentStatusData = {
      levelName: 'level-one',
      player: {
        position: {
          x: 96,
          y: 192,
        },
      },
    }
    const data = getCurrentStatus()
    expect(data).toEqual(defaultCurrentStatus)
  })

  it("gets undefined when it can't retrieve any data", () => {
    const getLevelInfoSpy = vi.spyOn(getLevelInfo, 'getLevelInfo')
    getLevelInfoSpy.mockImplementation(() => {
      return undefined
    })
    const data = getCurrentStatus()
    expect(data).toBeUndefined()
  })
})
