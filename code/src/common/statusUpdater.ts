import { Coordinates } from '../models/coordinates'
import { getCurrentStatus, saveCurrentStatus } from './storage'

export const updatePlayerPoistion = (position: Coordinates) => {
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

export const updateLevelInteraction = (interaction: number) => {
  void (async () => {
    const currentStatus = await getCurrentStatus()
    if (currentStatus) {
      const newStatus = {
        ...currentStatus,
        levelData: { interaction },
      }
      await saveCurrentStatus(newStatus)
    }
  })()
}
