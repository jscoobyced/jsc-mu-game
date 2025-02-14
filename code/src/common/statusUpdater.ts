import { Coordinates } from '../models/coordinates'
import { Languages } from '../models/languages'
import { CurrentStatusData } from '../models/saved'
import { getCurrentStatus, setCurrentStatus } from './storage'

export const defaultStatusData: CurrentStatusData = {
  levelData: {
    interaction: 0,
    levelName: '',
  },
  language: Languages.EN,
  player: {
    player: {
      name: 'Mumu',
      position: {
        x: 192,
        y: 192,
      },
    },
    inventory: [],
  },
}

export const updatePlayerPosition = async (position: Coordinates) => {
  const currentStatus = await getCurrentStatus()

  if (currentStatus) {
    const newStatus = {
      ...currentStatus,
      player: {
        player: {
          name: currentStatus.player.player.name,
          position,
        },
        inventory: currentStatus.player.inventory,
      },
    }
    await setCurrentStatus(newStatus)
  }
}

export const updatePlayerCurrentInteraction = async (interaction: number) => {
  const currentStatus = await getCurrentStatus()
  if (currentStatus) {
    const newStatus = {
      ...currentStatus,
      levelData: {
        ...currentStatus.levelData,
        interaction: interaction,
      },
    }
    await setCurrentStatus(newStatus)
  }
}

export const addToPlayerInventory = async (object: string) => {
  const currentStatus = await getCurrentStatus()
  if (currentStatus) {
    const newStatus = {
      ...currentStatus,
      player: {
        ...currentStatus.player,
        inventory: [...currentStatus.player.inventory, object],
      },
    }
    await setCurrentStatus(newStatus)
  }
}

export const removeFromPlayerInventory = async (object: string) => {
  const currentStatus = await getCurrentStatus()
  if (currentStatus) {
    const newStatus = {
      ...currentStatus,
      player: {
        ...currentStatus.player,
        inventory: [
          ...currentStatus.player.inventory.filter((item) => item !== object),
        ],
      },
    }
    await setCurrentStatus(newStatus)
  }
}
