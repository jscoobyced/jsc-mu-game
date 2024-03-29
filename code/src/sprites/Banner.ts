import Phaser from 'phaser'
import general from '../config/general.json'

export default class Banner {
  private BANNER_PAD = 5
  private TEXT_PAD = 60
  private FONT_SIZE = 64
  private image!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  private text!: Phaser.GameObjects.Text
  private onPointerUp!: () => void

  preload = (scene: Phaser.Scene): void => {
    scene.load.image('banner', `${general.baseUrls.images}/banner.png`)
  }

  create = (scene: Phaser.Scene): void => {
    this.image = scene.physics.add.image(0, 0, 'banner')
    this.image.setX(scene.game.canvas.width - general.controller + this.BANNER_PAD + this.image.displayWidth / 2)
    this.image.setY(this.BANNER_PAD + this.image.displayHeight / 2)
    this.text = scene.add.text(
      scene.game.canvas.width - general.controller + this.image.originX + this.TEXT_PAD,
      general['banner-x'] + this.image.originY + this.TEXT_PAD,
      '',
      { fontFamily: 'MumuFont', fontSize: `${this.FONT_SIZE}px`, color: 'brown' },
    )
  }

  show = (scene: Phaser.Scene) => {
    this.image.setVisible(true)
    this.text.setVisible(true)
    this.image.setInteractive()
    this.image.on('pointerup', () => {
      this.executeCallback()
    })
    scene.input.keyboard.on('keyup-SPACE', () => {
      this.executeCallback()
    })
  }

  hide = (scene: Phaser.Scene) => {
    this.image.setVisible(false)
    this.text.setVisible(false)
    this.image.removeInteractive()
    scene.input.keyboard.off('keyup-SPACE')
  }

  showText = (text: string[], callback?: () => void) => {
    const content = text.map((current, index) => {
      if (index === 0) return '"' + current
      if (index === text.length - 1) return current + '"'
      return current
    })
    this.text.setText(content)
    if (callback) {
      this.onPointerUp = callback
    }
  }

  private executeCallback = () => {
    if (this.onPointerUp) {
      this.onPointerUp()
    }
  }
}
