import * as Util from '../util/util.js';
import Tank from './tank.js';

class EnemyTank extends Tank {
  constructor(x, y, ctx, angle, power) {
    super(x, y, ctx, angle, power);
  }

  fire () {
    let exitX, exitY;
    // originally 36, 16
    [exitX, exitY] = Util.findExitPointEnemy(
      this.x + 30,
      this.y + 10,
      this.turretAngle,
      this.power
    );

    Util.drawTrajectory(
      this.ctx,
      exitX,
      exitY,
      this.turretAngle,
      this.power,
      'enemy'
    );
  }

  render () {
    const tank = new Image();
    tank.src = 'tank_enemy.png';
    tank.crossOrigin = "Anonymous";
    tank.onload = () => {
      this.ctx.clearRect(this.x - 20, this.y - 20, 80, 60);
      this.ctx.drawImage(tank, this.x, this.y);

      let exitX, exitY;
      [exitX, exitY] = Util.findExitPointEnemy(
        this.x + 36,
        this.y + 16,
        this.turretAngle
      );

      this.ctx.beginPath();
      console.log(`exitX: ${exitX}, exitY: ${exitY}`);
      this.ctx.moveTo(this.x + 28, this.y + 13);
      this.ctx.lineWidth = 3;
      this.ctx.lineTo(exitX, exitY);
      this.ctx.stroke();
    };
  }
}

export default EnemyTank;
