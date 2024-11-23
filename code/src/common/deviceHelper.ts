export const isMobile = (game: Phaser.Game) =>
  game.device.os.android || game.device.os.iPad || game.device.os.iPhone
