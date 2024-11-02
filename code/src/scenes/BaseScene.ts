import Phaser from 'phaser';
import { GeneralSettings } from '../models/general';
import general from '../models/general.json';
import levelHelper from '../models/level';

export default class BaseScene extends Phaser.Scene {
  public constructor(level: number) {
    super(levelHelper.getLevelName(level));
  }

  protected goToLevel = (level: number) => {
    this.scene.start(levelHelper.getLevelName(level));
  };

  protected getGeneralConfig = (): GeneralSettings => general;
}
