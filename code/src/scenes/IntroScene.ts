import { getApplicationData } from '../common/applicationData'
import { defaultStatusData } from '../common/statusUpdater'
import { getCurrentStatus, setCurrentStatus } from '../common/storage'
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
      'title-text',
      `${this.general.baseUrls.images}/mumu-adventures-title-text.png`,
    )
    this.load.image(
      'title-background',
      `${this.general.baseUrls.images}/mumu-adventures-title-background.png`,
    )
  }

  create() {
    const middleX = this.general.width / 2
    const middleY = this.general.height / 2
    const logoY = this.game.canvas.height / 3
    this.add.image(middleX, middleY, 'title-background')
    const logo = this.add.image(middleX, logoY, 'title-text')
    this.tweens.add({
      targets: logo,
      y: logoY - 50,
      duration: 600,
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
      if (document.location.hostname !== 'localhost')
        this.scale.startFullscreen()
      let levelName = 'level-one'
      void (async () => {
        const currentStatus = await getCurrentStatus()
        if (currentStatus) {
          levelName = currentStatus.levelData.levelName
        }
      })()
      this.goToLevel(levelName)
    })

    void (async () => {
      const currentStatusData = await getCurrentStatus()
      if (
        !currentStatusData?.player.player.position.x
      )
        await setCurrentStatus(defaultStatusData)
    })()
  }
}
