import levels from './levels.json'
import { NpcInfo, PlayerInfo } from './player/player'

export interface Interaction {
  name: string
  requiredItems: string[]
  dialog: string[]
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
