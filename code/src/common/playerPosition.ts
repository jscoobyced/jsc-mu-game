export const placePlayerNearSprite = (
  playerSprite: Phaser.Physics.Arcade.Sprite,
  sprite: Phaser.Physics.Arcade.Sprite,
  isMobile: boolean,
) => {
  const playerX =
    sprite.x - sprite.width / 2 - playerSprite.width / 2 - (isMobile ? 20 : 10)
  const playerY = sprite.y
  playerSprite.setPosition(playerX, playerY)
  playerSprite.setVelocity(0)
}
