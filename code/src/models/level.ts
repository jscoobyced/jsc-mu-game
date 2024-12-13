import { Coordinates } from './coordinates'
import levels from './levels.json'

export interface PlayerInfo {
  name: string
  position: Coordinates
}

export interface Interaction {
  name: string
  dialog: string
}

export interface NpcInfo {
  player: PlayerInfo
  interactions: Interaction[]
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
