import * as Util from './util';

class Tank {
  constructor(x, y, ctx, angle, power) {
    this.tankName = 'Player';
    this.ctx = ctx;
    this.turretAngle = angle;
    this.power = power;
    this.x = x;
    this.y = y;
  }

  fire (game, opponent) {
    let exitX, exitY;
    [exitX, exitY] = Util.findExitPoint(
      this.x + 40,
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
      'ally',
      opponent,
      game
    );
  }

  displayName () {
    $('#player').text(this.tankName);
  }

  updateAngle () {
    const degrees = Number(this.turretAngle * Util.RAD_TO_DEG).toFixed(2);
    $('#angle').text(degrees * -1);
  }

  updatePower () {
    $('#power').text(this.power);
  }

  turretDown () {
    this.turretAngle += Util.DEG_TO_RAD;
    this.render();
    this.updateAngle(this.turretAngle * Util.RAD_TO_DEG);
  }

  turretUp () {
    this.turretAngle -= Util.DEG_TO_RAD;
    this.render();
    this.updateAngle(this.turretAngle * Util.RAD_TO_DEG);
  }

  powerUp () {
    this.power++;
    this.updatePower(this.power);
  }

  powerDown () {
    this.power--;
    this.updatePower(this.power);
  }

  render () {
    const tank = new Image();
    tank.src = 'assets/images/tank.png';
    tank.crossOrigin = "Anonymous";
    tank.onload = () => {
      this.ctx.clearRect(this.x, this.y - 20, 70, 60);
      this.ctx.drawImage(tank, this.x, this.y);

      let exitX, exitY;
      [exitX, exitY] = Util.findExitPoint(
        this.x + 36,
        this.y + 16,
        this.turretAngle
      );

      this.ctx.beginPath();
      this.ctx.moveTo(42, 394);
      this.ctx.lineWidth = 3;
      this.ctx.lineTo(exitX, exitY);
      this.ctx.stroke();
    };

    this.updatePower();
    this.updateAngle();
    this.displayName();
  }
}

export default Tank;
