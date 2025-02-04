import { MainPlayer } from './player/player'

export interface LevelData {
  interaction: number
  levelName: string
}

export interface CurrentStatusData {
  player: MainPlayer
  language: string
  levelData: LevelData
}
