import { getLevelInfo } from '../models/level'
import { CurrentStatusData } from '../models/saved'

const CURRENT_STATUS = 'CURRENT_STATUS'

export const saveCurrentStatus = (data: CurrentStatusData): boolean => {
  try {
    localStorage.setItem(CURRENT_STATUS, JSON.stringify(data))
    return true
  } catch (error) {
    void error
    return false
  }
}

export const getCurrentStatus = () => {
  const stringData = localStorage.getItem(CURRENT_STATUS)
  if (stringData) return JSON.parse(stringData) as CurrentStatusData
  const levelInfo = getLevelInfo('level-one')
  if (levelInfo)
    return {
      levelName: levelInfo.name,
      player: {
        position: levelInfo.player.position,
      },
    }
  return undefined
}
