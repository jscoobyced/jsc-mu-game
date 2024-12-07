import { Coordinates } from './coordinates'
import levels from './levels.json'

export interface PlayerInfo {
  name: string
  position: Coordinates
}

export interface LevelInfo {
  name: string
  tiles: string
  player: PlayerInfo
  npcs?: PlayerInfo[]
}

export const getLevelInfo = (levelName: string): LevelInfo | undefined => {
  return levels.find((level) => level.name === levelName)
}
