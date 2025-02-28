import { Coordinates } from '../models/coordinates'
import { Languages } from '../models/languages'
import { CurrentStatusData, PlayerInteraction } from '../models/saved'
import { getCurrentStatus, setCurrentStatus } from './storage'

export const defaultStatusData: CurrentStatusData = {
  levelData: {
    interactions: [],
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

export const updatePlayerCurrentInteraction = async (
  interaction: PlayerInteraction,
) => {
  const currentStatus = await getCurrentStatus()
  const interactions = currentStatus?.levelData.interactions ?? []
  if (interactions.find((_) => _.npcName === interaction.npcName))
    interactions.forEach((_) => {
      if (_.npcName === interaction.npcName) _.index = interaction.index
    })
  else {
    interactions.push(interaction)
  }
  if (currentStatus) {
    const newStatus = {
      ...currentStatus,
      levelData: {
        ...currentStatus.levelData,
        interactions: interactions,
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
