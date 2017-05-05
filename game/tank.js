import * as Util from '../util/util.js';

class Tank {
  constructor(x, y, ctx, angle) {
    this.ctx = ctx;
    this.turretAngle = angle;
    this.x = x;
    this.y = y;
  }

  fire () {
    let exitX, exitY;
    [exitX, exitY] = Util.findExitPoint(this.x + 36, this.y + 16, this.turretAngle);
    Util.drawTrajectory(this.ctx, exitX, exitY, this.turretAngle);
  }

  turretDown () {
    this.turretAngle += Util.DEG_TO_RAD;
    this.render();
  }

  turretUp () {
    this.turretAngle -= Util.DEG_TO_RAD;
    this.render();
  }

  render () {
    // this.ctx.save();
    const tank = new Image();
    tank.src = 'tank.png';
    tank.crossOrigin = "Anonymous";
    tank.onload = () => {
      //0, this.y - 20, 70, 60
      this.ctx.clearRect(this.x, this.y - 20, 70, 60);
      this.ctx.drawImage(tank, this.x, this.y);

      let exitX, exitY;
      [exitX, exitY] = Util.findExitPoint(this.x + 36, this.y + 16, this.turretAngle);
      console.log(exitX, exitY);
      this.ctx.beginPath();
      this.ctx.moveTo(32, 392);
      this.ctx.lineTo(exitX, exitY);
      this.ctx.stroke();

      // const turret = new Image();
      // turret.src = 'turret.png';
      // turret.crossOrigin = "Anonymous";
      // turret.onload = () => {
      //   // this.ctx.save();
      //   this.ctx.translate(36, 396);
      //   // Util.findExitPoint(30, 397, this.turretAngle);
      //   this.ctx.rotate(this.turretAngle);
      //   this.ctx.drawImage(turret, 0, 0);
      //   this.ctx.restore();
      // };
    };
  }
}

export default Tank;
