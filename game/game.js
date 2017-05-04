import * as Util from '../util/util.js';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
  }

  drawTank () {

  }

  fire () {
    Util.drawTrajectory(this.ctx);
  }
}

export default Game;
