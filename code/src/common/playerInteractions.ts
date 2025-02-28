import { Coordinates } from '../models/coordinates'
import { Interaction } from '../models/level'
import { CurrentStatusData, LevelData } from '../models/saved'
import BaseScene from '../scenes/BaseScene'
import NpcPlayer from '../sprites/NpcPlayer'
import Player from '../sprites/Player'
import { isMobile } from './deviceHelper'
import { getI18nDialog } from './i18n'
import { placePlayerNearSprite } from './playerPosition'
import {
  addToPlayerInventory,
  removeFromPlayerInventory,
  updatePlayerCurrentInteraction,
} from './statusUpdater'
import { getCurrentStatus } from './storage'

export const handleInteraction = async (
  player: Player,
  npcPlayer: NpcPlayer,
  baseScene: BaseScene,
) => {
  const currentStatusData = await getCurrentStatus()
  if (!currentStatusData) return false
  const language = currentStatusData.language
  const playerSprite = player.getSprite()
  const npcName = npcPlayer.getName()
  const levelData = currentStatusData.levelData

  const currentInteractionIndex = getNpcInteractionNumber(levelData, npcName)
  if (npcPlayer.getInteractions().length < currentInteractionIndex + 1)
    return false

  const currentInteraction =
    npcPlayer.getInteractions()[currentInteractionIndex]
  const hasRequiredItems = playerHasInteractionRequiredItems(
    currentInteraction,
    currentStatusData,
  )

  if (npcPlayer.getInteractions().length < currentInteractionIndex + 1) {
    const previousInteractionIndex = Math.max(0, currentInteractionIndex - 1)
    const previousInteraction =
      npcPlayer.getInteractions()[previousInteractionIndex]

    npcPlayer.setAnimation(!!previousInteraction.isSleeping)
    const itemsToGive = previousInteraction.items.given
    const requiredItems = previousInteraction.items.required

    displayInteraction(
      playerSprite,
      npcPlayer,
      previousInteraction,
      language,
      baseScene,
      hasRequiredItems,
      requiredItems,
      itemsToGive,
    )

    return true
  }

  const itemsToGive = currentInteraction.items.given
  const requiredItems = currentInteraction.items.required
  displayInteraction(
    playerSprite,
    npcPlayer,
    currentInteraction,
    language,
    baseScene,
    hasRequiredItems,
    requiredItems,
    itemsToGive,
  )
  const interaction = {
    npcName: npcPlayer.getName(),
    index: currentInteractionIndex + (hasRequiredItems ? 1 : 0),
  }
  await updatePlayerCurrentInteraction(interaction)
  return true
}

export const setNpcStatus = async (npcPlayer: NpcPlayer) => {
  const currentStatusData = await getCurrentStatus()
  if (!currentStatusData) return

  const npcName = npcPlayer.getName()
  const levelData = currentStatusData.levelData
  const currentInteractionIndex = getNpcInteractionNumber(levelData, npcName)
  if (npcPlayer.getInteractions().length < currentInteractionIndex + 1) return
  const currentInteraction =
    npcPlayer.getInteractions()[currentInteractionIndex]

  if (currentInteraction.isSleeping) {
    npcPlayer.setAnimation(!!currentInteraction.isSleeping)
  }
}

const getNpcInteractionNumber = (levelData: LevelData, npcName: string) => {
  const interaction = levelData.interactions.find(
    (interaction) => interaction.npcName === npcName,
  )
  if (interaction) return interaction.index
  return 0
}

const displayInteraction = (
  playerSprite: Phaser.Physics.Arcade.Sprite,
  npcPlayer: NpcPlayer,
  interaction: Interaction,
  language: string,
  baseScene: BaseScene,
  hasRequiredItems: boolean,
  requiredItems: string[],
  itemsToGive: string[],
) => {
  const npcPlayerSprite = npcPlayer.getSprite()
  placePlayerNearSprite(playerSprite, npcPlayerSprite, isMobile(baseScene.game))
  const coordinates = {
    x: playerSprite.x,
    y: playerSprite.y,
  }
  displayDialog(
    interaction,
    language,
    coordinates,
    baseScene,
    npcPlayer,
    !!interaction.isSleepAfterInteractions,
    hasRequiredItems,
    requiredItems,
    itemsToGive,
  )
}

const playerHasInteractionRequiredItems = (
  interaction: Interaction,
  currentStatusData: CurrentStatusData,
): boolean => {
  const requiredItems = interaction.items.required
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
  npcPlayer: NpcPlayer,
  isSleepAfterInteractions: boolean,
  hasRequiredItems: boolean,
  requiredItems: string[],
  itemsToGive: string[],
) => {
  const dialogs = hasRequiredItems
    ? interaction.dialogs.haveItems
    : (interaction.dialogs.noItems ?? [])
  npcPlayer.setAnimation(!hasRequiredItems)
  const showText = (counter: number) => {
    if (requiredItems.length > 0) {
      requiredItems.forEach((item) => {
        removeFromPlayerInventory(item).catch(() => {
          void 0
        })
      })
    }
    if (counter < dialogs.length) {
      const text = getI18nDialog(dialogs[counter], language)?.split('\n')
      if (text) baseScene.showText(text, coordinates, showText, counter + 1)
      return true
    } else {
      npcPlayer.setAnimation(!hasRequiredItems || isSleepAfterInteractions)
      if (itemsToGive.length > 0) {
        itemsToGive.forEach((item) => {
          addToPlayerInventory(item).catch(() => {
            void 0
          })
        })
      }
      return false
    }
  }
  showText(0)
}
