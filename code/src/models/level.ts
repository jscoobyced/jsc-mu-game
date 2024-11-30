import { Coordinates } from './coordinates'
import levels from './levels.json'

export interface LevelInfo {
  name: string
  tiles: string
  player: {
    position: Coordinates
  }
}

export const getLevelInfo = (levelName: string): LevelInfo | undefined => {
  return levels.find((level) => level.name === levelName)
}
