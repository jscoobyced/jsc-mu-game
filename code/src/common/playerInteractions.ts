import { Coordinates } from '../models/coordinates'
import { CurrentStatusData } from '../models/saved'
import BaseScene from '../scenes/BaseScene'
import NpcPlayer from '../sprites/NpcPlayer'
import Player from '../sprites/Player'
import { isMobile } from './deviceHelper'
import { getI18nContent } from './i18n'
import { placePlayerNearSprite } from './playerPosition'

export const handleDialog = (
  player: Player,
  npcPlayer: NpcPlayer,
  currentStatusData: CurrentStatusData,
  baseScene: BaseScene,
) => {
  const npcPlayerSprite = npcPlayer.getSprite()
  const playerSprite = player.getSprite()
  placePlayerNearSprite(playerSprite, npcPlayerSprite, isMobile(baseScene.game))
  const coordinates = {
    x: npcPlayerSprite.x + 240,
    y: npcPlayerSprite.y - 150,
  }
  const language = currentStatusData.language
  const interactions = npcPlayer.getInteractions()
  displayDialog(interactions[0].dialog, language, coordinates, baseScene)
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
    }
  }
  showText(0)
}
