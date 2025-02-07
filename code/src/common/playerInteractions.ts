import { Coordinates } from '../models/coordinates'
import { Interaction } from '../models/level'
import { CurrentStatusData } from '../models/saved'
import BaseScene from '../scenes/BaseScene'
import NpcPlayer from '../sprites/NpcPlayer'
import Player from '../sprites/Player'
import { isMobile } from './deviceHelper'
import { getI18nDialog } from './i18n'
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
  const currentInteractionIndex = currentStatusData.levelData.interaction | 0
  if (npcPlayer.getInteractions().length < currentInteractionIndex + 1)
    return false

  const currentInteraction =
    npcPlayer.getInteractions()[currentInteractionIndex]
  const hasRequiredItems = playerHasInteractionRequiredItems(
    currentInteraction,
    currentStatusData,
  )
  const coordinates = {
    x: npcPlayerSprite.x + 240,
    y: npcPlayerSprite.y - 150,
  }

  if (
    !hasRequiredItems ||
    npcPlayer.getInteractions().length < currentInteractionIndex + 1
  ) {
    const previousInteractionIndex = Math.max(0, currentInteractionIndex - 1)

    displayDialog(
      npcPlayer.getInteractions()[previousInteractionIndex],
      language,
      coordinates,
      baseScene,
    )

    return true
  }
  placePlayerNearSprite(playerSprite, npcPlayerSprite, isMobile(baseScene.game))

  displayDialog(
    npcPlayer.getInteractions()[currentInteractionIndex],
    language,
    coordinates,
    baseScene,
  )
  await updatePlayerCurrentInteraction(currentInteractionIndex + 1)
  return true
}

const playerHasInteractionRequiredItems = (
  interaction: Interaction,
  currentStatusData: CurrentStatusData,
): boolean => {
  const requiredItems = interaction.requiredItems
  const playerItems = currentStatusData.player.inventory
  return (
    requiredItems.some((itemId) => playerItems.includes(itemId)) ||
    requiredItems.length === 0
  )
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
      const text = getI18nDialog(dialogs[counter], language)?.split('\n')
      if (text) baseScene.showText(text, coordinates, showText, counter + 1)
      return true
    } else {
      return false
    }
  }
  showText(0)
}
