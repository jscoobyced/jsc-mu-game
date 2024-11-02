import Player from '../sprites/Player';
import BaseScene from './BaseScene';

export default class IntroScene extends BaseScene {
  protected player: Player = new Player();
  //private isCollided = false;

  constructor() {
    super(1);
  }

  preload() {
    this.doPreload();
    this.player.preload(this);
  }

  create() {
    const position = {
      x: 50,
      y: 50,
    };
    this.player.create(position.x, position.y, this, this.cursor);
    if (this.player) {
      const player = this.player.getPlayer();
      if (player && player.body)
        player.body.world.on('worldbounds', this.playerColliding);
    }
  }

  update = (time: number): void => {
    this.player.update(time);
  };

  private playerColliding = () => {
    //this.isCollided = true;
  };
}
