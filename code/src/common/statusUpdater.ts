import { Coordinates } from '../models/coordinates'
import { getCurrentStatus, setCurrentStatus } from './storage'

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
