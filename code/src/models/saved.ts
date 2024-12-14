import { Coordinates } from './coordinates'

export interface LevelData {
  interaction: number
}

export interface CurrentStatusData {
  player: {
    position: Coordinates
  }
  language: string
  levelName: string
  levelData: LevelData
}
