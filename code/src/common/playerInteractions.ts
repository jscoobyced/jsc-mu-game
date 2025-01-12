import { Coordinates } from '../models/coordinates'
import BaseScene from '../scenes/BaseScene'
import NpcPlayer from '../sprites/NpcPlayer'
import Player from '../sprites/Player'
import { isMobile } from './deviceHelper'
import { getI18nContent } from './i18n'
import { placePlayerNearSprite } from './playerPosition'
import { getCurrentStatus } from './storage'

export const handleDialog = async (
  player: Player,
  npcPlayer: NpcPlayer,
  baseScene: BaseScene,
) => {
  const npcPlayerSprite = npcPlayer.getSprite()
  const currentStatusData = await getCurrentStatus()
  if (!currentStatusData) return false
  const playerSprite = player.getSprite()
  const language = currentStatusData.language
  // if (!false) return
  placePlayerNearSprite(playerSprite, npcPlayerSprite, isMobile(baseScene.game))
  const coordinates = {
    x: npcPlayerSprite.x + 240,
    y: npcPlayerSprite.y - 150,
  }
  displayDialog(
    [
      'FOREST_GUY_INTRO_1',
      'FOREST_GUY_INTRO_2',
      'FOREST_GUY_INTRO_3',
      'FOREST_GUY_INTRO_4',
    ],
    language,
    coordinates,
    baseScene,
  )
}

const displayDialog = (
  dialogs: string[],
  language: string,
  coordinates: Coordinates,
  baseScene: BaseScene,
) => {
  const showText = (counter: number) => {
    if (counter < dialogs.length) {
      const text = getI18nContent(dialogs[counter], language)?.split('\n')
      if (text) baseScene.showText(text, coordinates, showText, counter + 1)
      return true
    } else {
      return false
    }
  }
  showText(0)
}
