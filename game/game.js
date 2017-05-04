import * as Util from '../util/util.js';
import Tank from './tank.js';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.tank1 = new Tank(0, 0, ctx);
  }

  drawLand () {
    Util.drawLand(this.ctx);
  }
}

export default Game;
