import * as Util from '../util/util.js';
import Tank from './tank.js';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    // this.tank1 = tank1;
    // this.tank2 = tank2;
  }

  drawTank () {
    Util.drawTank(this.ctx);
  }

  drawLand () {
    Util.drawLand(this.ctx);
  }

  fire () {
    Util.drawTrajectory(this.ctx);
  }

  rotateTurret (angle) {
    const DEG_TO_RAD = Math.PI / 180;
    const turretSprite = new Image();
    turretSprite.src = 'turret.png';
    turretSprite.crossOrigin = "Anonymous";

    Util.rotateAndRenderImage(
      this.ctx, turretSprite, angle * DEG_TO_RAD, 32, 395, 32, 395
    );
  }
}

export default Game;
