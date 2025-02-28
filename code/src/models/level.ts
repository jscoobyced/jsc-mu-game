import levels from './levels.json'
import { NpcInfo, PlayerInfo } from './player/player'

export interface Interaction {
  name: string
  items: {
    required: string[]
    given: string[]
  }
  dialogs: {
    haveItems: string[]
    noItems?: string[]
  }
  isSleeping?: boolean
  isSleepAfterInteractions?: boolean
}

export interface LevelInfo {
  name: string
  tiles: string
  player: PlayerInfo
  npcs: NpcInfo[]
}

export const getLevelInfo = (levelName: string): LevelInfo | undefined => {
  return levels.find((level) => level.name === levelName)
}
