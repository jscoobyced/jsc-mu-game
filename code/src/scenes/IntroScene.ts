import { getApplicationData } from '../common/applicationData'
import { getCurrentStatus } from '../common/storage'
import { GeneralSettings } from '../models/general'
import { IApplicationData } from '../models/IApplicationData'
import BaseScene from './BaseScene'

export default class IntroScene extends BaseScene {
  private general!: GeneralSettings
  private applicationData: IApplicationData = getApplicationData()
  constructor() {
    super('intro')
    this.general = this.getGeneralConfig()
  }

  preload() {
    this.load.image(
      'title-image',
      `${this.general.baseUrls.images}/mumu-adventures.png`,
    )
  }

  create() {
    const middleX = this.game.canvas.width / 2
    const middleY = this.general.height / 2
    const logo = this.add.image(middleX, middleY, 'title-image')
    this.tweens.add({
      targets: logo,
      y: this.game.canvas.height / 3,
      duration: 1000,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    })
    this.add.text(
      this.game.canvas.width - 100,
      this.general.height - 40,
      this.applicationData.appVersion,
      {
        fontFamily: this.general.font,
        fontSize: `24px`,
        color: 'brown',
      },
    )

    this.input.on('pointerup', () => {
      this.scale.startFullscreen()
      let levelName = 'level-one'
      void (async () => {
        const currentStatus = await getCurrentStatus()
        if (currentStatus) {
          levelName = currentStatus.levelName
        }
      })()
      this.goToLevel(levelName)
    })
  }
}
