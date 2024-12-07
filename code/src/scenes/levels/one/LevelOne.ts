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
        const npcPlayer = new NpcPlayer(npc.name, npc.position)
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
        if (npcPlayerSprite)
          this.physics.add.collider(
            npcPlayerSprite,
            playerSprite,
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
    collisionData:
      | Phaser.Types.Physics.Arcade.GameObjectWithBody
      | Phaser.Physics.Arcade.Body
      | Phaser.Tilemaps.Tile
      | Phaser.Physics.Arcade.Sprite,
  ) => {
    if (this.isCollided) return
    this.isCollided = true
    // @ts-expect-error - Force checking the type
    if (collisionData['type'] === 'Sprite') {
      const data = collisionData as Phaser.Physics.Arcade.Sprite
      void data
    }
  }
}
