import { InventoryItem } from '../common'
import { Coordinates } from '../coordinates'

export interface PlayerInfo {
  name: string
  position: Coordinates
}

export interface MainPlayer {
  player: PlayerInfo
  inventory: InventoryItem[]
}

export interface NpcInfo {
  player: PlayerInfo
}
