import BaseScene from './BaseScene';

export default class IntroScene extends BaseScene {
  private general!: any;
  constructor() {
    super(0);
    this.general = this.getGeneralConfig();
  }

  preload() {
    this.load.image(
      'title-image',
      `${this.general.baseUrls.images}/mumu-adventures.png`,
    );
  }

  create() {
    const middleX = this.general.width / 2;
    const middleY = this.general.height / 2;
    const logo = this.add.image(middleX, middleY, 'title-image');
    this.tweens.add({
      targets: logo,
      y: this.game.canvas.height / 3,
      duration: 1000,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    this.input.on('pointerdown', () => {
      this.goToLevel(1);
    });
  }
}
