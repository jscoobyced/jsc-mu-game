import { Coordinates } from './coordinates'

export interface LevelOneData {
  interractions: number[]
}

export interface CurrentStatusData {
  player: {
    position: Coordinates
  }
  language: string
  levelName: string
  levelData: LevelOneData | string
}
