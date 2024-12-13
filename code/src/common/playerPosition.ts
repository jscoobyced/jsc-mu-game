export const placePlayerNearSprite = (
  playerSprite: Phaser.Physics.Arcade.Sprite | undefined,
  sprite: Phaser.Physics.Arcade.Sprite,
) => {
  if (playerSprite) {
    const playerX = sprite.x - sprite.width / 2 - playerSprite.width / 2 - 10
    const playerY = sprite.y
    playerSprite.setPosition(playerX, playerY)
  }
}
