import { Coordinates } from '../models/coordinates'
import { getCurrentStatus, saveCurrentStatus } from './storage'

export const updatePlayerPosition = (position: Coordinates) => {
  void (async () => {
    const currentStatus = await getCurrentStatus()
    if (currentStatus) {
      const newStatus = {
        ...currentStatus,
        player: { position },
      }
      await saveCurrentStatus(newStatus)
    }
  })()
}

export const updatePlayerCurrentInteraction = (interaction: number) => {
  void (async () => {
    const currentStatus = await getCurrentStatus()
    if (currentStatus) {
      const newStatus = {
        ...currentStatus,
        levelData: {
          interaction: interaction,
        },
      }
      await saveCurrentStatus(newStatus)
    }
  })()
}
