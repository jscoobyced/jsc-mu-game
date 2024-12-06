import { Coordinates } from './coordinates'

export interface CurrentStatusData {
  player: {
    position: Coordinates
  }
  levelName: string
}
