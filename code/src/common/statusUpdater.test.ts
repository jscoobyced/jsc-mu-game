import { vi } from 'vitest'
import { Coordinates } from '../models/coordinates'
import { CurrentStatusData } from '../models/saved'
import {
  addToPlayerInventory,
  removeFromPlayerInventory,
  updatePlayerCurrentInteraction,
  updatePlayerPosition,
} from './statusUpdater'
import { getCurrentStatus, setCurrentStatus } from './storage'

vi.mock('./storage')

describe('statusUpdater', () => {
  const statusData: CurrentStatusData = {
    language: 'en',
    levelData: {
      levelName: 'test',
      interactions: [
        {
          npcName: 'test',
          index: 0,
        },
      ],
    },
    player: {
      player: {
        name: 'testPlayer',
        position: { x: 0, y: 0 },
      },
      inventory: ['testObject'],
    },
  }

  let getCurrentStatusMock = vi.fn()

  let setCurrentStatusMock = vi.fn()

  beforeEach(() => {
    vi.resetAllMocks()
    getCurrentStatusMock = vi
      .mocked(getCurrentStatus)
      .mockImplementation(() => {
        return Promise.resolve(statusData)
      })

    setCurrentStatusMock = vi
      .mocked(setCurrentStatus)
      .mockImplementation((data: CurrentStatusData) => {
        void data
        return Promise.resolve(true)
      })
  })

  it('does not update player position when no data to get', async () => {
    const position: Coordinates = {
      x: 10,
      y: 10,
    }
    getCurrentStatusMock = vi
      .mocked(getCurrentStatus)
      .mockImplementation(() => {
        return Promise.resolve(undefined)
      })
    await updatePlayerPosition(position)
    expect(getCurrentStatusMock).toHaveBeenCalledTimes(1)
    expect(setCurrentStatusMock).toHaveBeenCalledTimes(0)
  })

  it('update player position', async () => {
    const position: Coordinates = {
      x: 10,
      y: 10,
    }
    const expected: CurrentStatusData = {
      language: 'en',
      levelData: {
        levelName: 'test',
        interactions: [
          {
            npcName: 'test',
            index: 0,
          },
        ],
      },
      player: {
        player: {
          name: 'testPlayer',
          position,
        },
        inventory: ['testObject'],
      },
    }

    await updatePlayerPosition(position)
    expect(getCurrentStatusMock).toHaveBeenCalledTimes(1)
    expect(setCurrentStatusMock).toHaveBeenCalledTimes(1)
    expect(setCurrentStatusMock).toHaveBeenCalledWith(expected)
  })

  it('does not update player interaction when no data to get', async () => {
    getCurrentStatusMock = vi
      .mocked(getCurrentStatus)
      .mockImplementation(() => {
        return Promise.resolve(undefined)
      })
    await updatePlayerCurrentInteraction({
      npcName: 'test',
      index: 0,
    })
    expect(getCurrentStatusMock).toHaveBeenCalledTimes(1)
    expect(setCurrentStatusMock).toHaveBeenCalledTimes(0)
  })

  it('update player interaction', async () => {
    const position: Coordinates = {
      x: 0,
      y: 0,
    }
    const expected: CurrentStatusData = {
      language: 'en',
      levelData: {
        levelName: 'test',
        interactions: [
          {
            npcName: 'test',
            index: 0,
          },
        ],
      },
      player: {
        player: {
          name: 'testPlayer',
          position,
        },
        inventory: ['testObject'],
      },
    }

    await updatePlayerCurrentInteraction({
      npcName: 'test',
      index: 0,
    })
    expect(getCurrentStatusMock).toHaveBeenCalledTimes(1)
    expect(setCurrentStatusMock).toHaveBeenCalledTimes(1)
    expect(setCurrentStatusMock).toHaveBeenCalledWith(expected)
  })

  it('add to player inventory', async () => {
    const coffee = 'coffee'
    const expected: CurrentStatusData = {
      language: 'en',
      levelData: {
        levelName: 'test',
        interactions: [
          {
            npcName: 'test',
            index: 0,
          },
        ],
      },
      player: {
        player: {
          name: 'testPlayer',
          position: {
            x: 0,
            y: 0,
          },
        },
        inventory: ['testObject', coffee],
      },
    }

    await addToPlayerInventory(coffee)
    expect(getCurrentStatusMock).toHaveBeenCalledTimes(1)
    expect(setCurrentStatusMock).toHaveBeenCalledTimes(1)
    expect(setCurrentStatusMock).toHaveBeenCalledWith(expected)
  })

  it('remove from player inventory', async () => {
    const testObject = 'testObject'
    const expected: CurrentStatusData = {
      language: 'en',
      levelData: {
        levelName: 'test',
        interactions: [
          {
            npcName: 'test',
            index: 0,
          },
        ],
      },
      player: {
        player: {
          name: 'testPlayer',
          position: {
            x: 0,
            y: 0,
          },
        },
        inventory: [],
      },
    }

    await removeFromPlayerInventory(testObject)
    expect(getCurrentStatusMock).toHaveBeenCalledTimes(1)
    expect(setCurrentStatusMock).toHaveBeenCalledTimes(1)
    expect(setCurrentStatusMock).toHaveBeenCalledWith(expected)
  })
})
