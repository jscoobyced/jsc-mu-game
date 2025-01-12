import { getApplicationData } from '../common/applicationData'
import { getCurrentStatus, saveCurrentStatus } from '../common/storage'
import { GeneralSettings } from '../models/general'
import { IApplicationData } from '../models/IApplicationData'
import { Languages } from '../models/languages'
import { CurrentStatusData } from '../models/saved'
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
      'title-text',
      `${this.general.baseUrls.images}/mumu-adventures-title-text.png`,
    )
    this.load.image(
      'title-background',
      `${this.general.baseUrls.images}/mumu-adventures-title-background.png`,
    )
  }

  create() {
    const middleX = this.game.canvas.width / 2
    const middleY = this.general.height / 2
    this.add.image(middleX, middleY, 'title-background')
    const logo = this.add.image(middleX, middleY, 'title-text')
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
      // this.scale.startFullscreen()
      let levelName = 'level-one'
      void (async () => {
        const currentStatus = await getCurrentStatus()
        if (currentStatus) {
          levelName = currentStatus.levelName
        }
      })()
      this.goToLevel(levelName)
    })

    const currentStatus: CurrentStatusData = {
      levelName: this.levelName,
      levelData: {
        interaction: 0,
      },
      language: Languages.EN,
      player: {
        position: {
          x: -1,
          y: -1,
        },
      },
    }
    void (async () => {
      const currentStatusData = await getCurrentStatus()
      if (!currentStatusData) await saveCurrentStatus(currentStatus)
    })()
  }
}
