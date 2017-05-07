import * as Util from '../util/util.js';
import Tank from './tank.js';

class EnemyTank extends Tank {
  constructor(x, y, ctx, angle, power) {
    super(x, y, ctx, angle, power);
  }

  render () {
    const tank = new Image();
    tank.src = 'tank_enemy.png';
    tank.crossOrigin = "Anonymous";
    tank.onload = () => {
      this.ctx.clearRect(this.x, this.y - 20, 70, 60);
      this.ctx.drawImage(tank, this.x, this.y);

      let exitX, exitY;
      [exitX, exitY] = Util.findExitPoint(
        this.x - 36,
        this.y + 16,
        this.turretAngle
      );
      debugger
      this.ctx.beginPath();
      this.ctx.moveTo(this.x + 30, this.y + 15);
      this.ctx.lineWidth = 3;
      this.ctx.lineTo(exitX, exitY);
      this.ctx.stroke();
    };
  }
}

export default EnemyTank;
