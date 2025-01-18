import { Coordinates } from './coordinates'

export interface LevelData {
  interaction: number
  levelName: string
}

export interface CurrentStatusData {
  player: {
    position: Coordinates
    items?: string[]
  }
  language: string
  levelData: LevelData
}
