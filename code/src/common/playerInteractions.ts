import { Coordinates } from '../models/coordinates'
import { Interaction } from '../models/level'
import BaseScene from '../scenes/BaseScene'
import NpcPlayer from '../sprites/NpcPlayer'
import Player from '../sprites/Player'
import { isMobile } from './deviceHelper'
import { getI18nContent } from './i18n'
import { placePlayerNearSprite } from './playerPosition'
import { updatePlayerCurrentInteraction } from './statusUpdater'
import { getCurrentStatus } from './storage'

export const handleInteraction = async (
  player: Player,
  npcPlayer: NpcPlayer,
  baseScene: BaseScene,
) => {
  const npcPlayerSprite = npcPlayer.getSprite()
  const currentStatusData = await getCurrentStatus()
  if (!currentStatusData) return false
  const playerSprite = player.getSprite()
  const language = currentStatusData.language
  const currentInteraction = currentStatusData.levelData.interaction | 0
  const coordinates = {
    x: npcPlayerSprite.x + 240,
    y: npcPlayerSprite.y - 150,
  }
  if (!npcPlayer.getInteractions()[currentInteraction]) return false
  placePlayerNearSprite(playerSprite, npcPlayerSprite, isMobile(baseScene.game))
  displayDialog(
    npcPlayer.getInteractions()[currentInteraction],
    language,
    coordinates,
    baseScene,
  )
  updatePlayerCurrentInteraction(currentInteraction + 1)
  return true
}

const displayDialog = (
  interaction: Interaction,
  language: string,
  coordinates: Coordinates,
  baseScene: BaseScene,
) => {
  const dialogs = interaction.dialogs
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
