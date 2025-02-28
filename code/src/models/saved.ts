import { MainPlayer } from './player/player'

export interface PlayerInteraction {
  npcName: string
  index: number
}

export interface LevelData {
  interactions: PlayerInteraction[]
  levelName: string
}

export interface CurrentStatusData {
  player: MainPlayer
  language: string
  levelData: LevelData
}
