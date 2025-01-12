import { handleDialog } from '../../../common/playerInteractions'
import { getLevelInfo } from '../../../models/level'
import NpcPlayer from '../../../sprites/NpcPlayer'
import BaseSceneWithPlayer from '../../BaseSceneWithPlayer'

export default class LevelOne extends BaseSceneWithPlayer {
  private npcPlayers: NpcPlayer[] = []

  constructor() {
    super('level-one')
  }

  preload(): void {
    const levelInfo = getLevelInfo(this.levelName)
    if (levelInfo?.npcs) {
      levelInfo.npcs.forEach((npc) => {
        const npcPlayer = new NpcPlayer(npc.player.name, npc.player.position)
        npcPlayer.preload(this)
        this.npcPlayers.push(npcPlayer)
      })
    }
    this.basePreload()
  }

  async create() {
    await this.baseCreate()
    this.npcPlayers.forEach((npcPlayer) => {
      npcPlayer.create(this)
      const playerSprite = this.getPlayer()?.getSprite()
      if (playerSprite) {
        const npcPlayerSprite = npcPlayer.getSprite()
        this.physics.add.collider(
          playerSprite,
          npcPlayerSprite,
          this.collideWithNpc,
        )
      }
    })
  }

  update(time: number): void {
    this.baseUpdate(time)
    this.npcPlayers.forEach((npcPlayer) => {
      npcPlayer.update(time)
    })
  }

  private collideWithNpc = (
    collidedObject1:
      | Phaser.Types.Physics.Arcade.GameObjectWithBody
      | Phaser.Physics.Arcade.Body
      | Phaser.Tilemaps.Tile
      | Phaser.Physics.Arcade.Sprite,
    collidedObject2:
      | Phaser.Types.Physics.Arcade.GameObjectWithBody
      | Phaser.Physics.Arcade.Body
      | Phaser.Tilemaps.Tile
      | Phaser.Physics.Arcade.Sprite,
  ) => {
    if (this.isCollided) return
    this.isCollided = true
    void collidedObject1
    // @ts-expect-error - Force checking the type
    if (collidedObject2.type === 'Sprite') {
      const object2 = collidedObject2 as Phaser.Physics.Arcade.Sprite
      const npcPlayer = this.npcPlayers.find(
        (npcPlayer) => npcPlayer.getName() === object2.name,
      )
      const player = this.getPlayer()
      if (!npcPlayer || !player) {
        this.isCollided = false
        return
      }
      void (async () => {
        await handleDialog(player, npcPlayer, this)
      })()
    }
  }
}
