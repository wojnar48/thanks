import * as Util from '../util/util.js';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
  }

  fire () {
    Util.drawTrajectory(this.ctx);
  }
}

export default Game;
