import { InventoryItem } from '../common'
import { Coordinates } from '../coordinates'
import { Interaction } from '../level'

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
  interactions: Interaction[]
}
