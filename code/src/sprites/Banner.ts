import Phaser from 'phaser'
import { Coordinates } from '../models/coordinates'
import getGeneralSettings, { GeneralSettings } from '../models/general'

export default class Banner {
  private general: GeneralSettings = getGeneralSettings()
  private TEXT_PAD = 36
  private FONT_SIZE = 32
  private image!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  private text!: Phaser.GameObjects.Text
  private onPointerUp!: () => void

  preload = (scene: Phaser.Scene): void => {
    scene.load.image('banner', `${this.general.baseUrls.images}/banner.png`)
  }

  create = (scene: Phaser.Scene): void => {
    this.image = scene.physics.add.image(0, 0, 'banner')
    this.image.setScale(0.75)
    this.text = scene.add.text(
      this.image.x + this.TEXT_PAD,
      this.image.y + this.TEXT_PAD,
      '',
      {
        fontFamily: this.general.font,
        fontSize: `${this.FONT_SIZE.toString()}px`,
        color: 'brown',
      },
    )
    this.image.setVisible(false)
    this.text.setVisible(false)
  }

  show = (scene: Phaser.Scene, coordinates: Coordinates) => {
    this.image.setX(coordinates.x)
    this.image.setY(coordinates.y)
    this.text.setX(coordinates.x - 250 + this.TEXT_PAD)
    this.text.setY(coordinates.y - 176)

    this.image.setVisible(true)
    this.text.setVisible(true)
    this.image.setInteractive()
    this.image.on('pointerup', () => {
      this.executeCallback()
    })
    if (scene.input.keyboard)
      scene.input.keyboard.on('keyup-SPACE', () => {
        this.executeCallback()
      })
  }

  hide = (scene: Phaser.Scene) => {
    this.image.setVisible(false)
    this.text.setVisible(false)
    this.image.removeInteractive()
    if (scene.input.keyboard) scene.input.keyboard.off('keyup-SPACE')
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
    this.onPointerUp()
  }
}
