import Phaser from 'phaser'

import getGeneralSettings from '../models/general'

const generalSettings = getGeneralSettings()

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: generalSettings.backgroundColor,
  scale: {
    width: generalSettings.width,
    height: generalSettings.height,
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {
        x: 0,
        y: 0,
      },
    },
  },
}

export default config
