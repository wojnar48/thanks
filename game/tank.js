import * as Util from '../util/util.js';

class Tank {
  constructor(x, y, ctx) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
  }

  fire () {
    Util.drawTrajectory(this.ctx);
  }

  render () {
    const angle = -0.7;
    const tank = new Image();
    tank.src = 'tank.png';
    tank.crossOrigin = "Anonymous";
    tank.onload = () => {
      this.ctx.drawImage(tank, 0, 385);
      const turret = new Image();
      turret.src = 'turret.png';
      turret.crossOrigin = "Anonymous";
      turret.onload = () => {
        this.ctx.save();
        this.ctx.translate(30, 397);
        Util.findExitPoint(30, 397, angle);
        this.ctx.rotate(angle);
        this.ctx.drawImage(turret, 0, 0);
        this.ctx.restore();
      };
    };
  }
}

export default Tank;
