import { Coordinates } from '../models/coordinates'
import BaseScene from '../scenes/BaseScene'
import NpcPlayer from '../sprites/NpcPlayer'
import Player from '../sprites/Player'
import { isMobile } from './deviceHelper'
import { getI18nContent } from './i18n'
import { placePlayerNearSprite } from './playerPosition'
import { updateLevelInteraction } from './statusUpdater'
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
  const interactionNumber = currentStatusData.levelData.interaction
  const interactions = npcPlayer.getInteractions()
  if (interactionNumber >= interactions.length) return false
  placePlayerNearSprite(playerSprite, npcPlayerSprite, isMobile(baseScene.game))
  const coordinates = {
    x: npcPlayerSprite.x + 240,
    y: npcPlayerSprite.y - 150,
  }
  displayDialog(
    interactions[interactionNumber].dialog,
    language,
    coordinates,
    baseScene,
  )
  updateLevelInteraction(interactionNumber + 1)
  return true
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
