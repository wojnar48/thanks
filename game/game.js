import * as Util from '../util/util.js';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
  }

  drawLand () {
    Util.drawLand(this.ctx);
  }

  fire () {
    Util.drawTrajectory(this.ctx);
  }
}

export default Game;
