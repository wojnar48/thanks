import * as Util from '../util/util.js';
import Tank from './tank.js';
import TankEnemy from './enemy_tank.js';

class Game {
  constructor(ctx) {
    this.gameOver = false;
    this.ctx = ctx;
    this.tank1 = new Tank(10, 380, ctx, -0.7, 100);
    this.tank2 = new TankEnemy(820, 320, ctx, -0.7, 100);
    this.currentMover = this.tank1;
  }

  handleKeyDown () {
    this.currentMover.turretDown();
  }

  handleKeyUp () {
    this.currentMover.turretUp();
  }

  handleSpaceBar () {
    this.currentMover.fire();
    if (this.currentMover === this.tank1) {
      this.currentMover = this.tank2;
    } else {
      this.currentMover = this.tank1;
    }
  }

  handlePowerUp () {
    this.currentMover.powerUp();
  }

  handlePowerDown () {
    this.currentMover.powerDown();
  }

  drawLand () {
    Util.drawLand(this.ctx);
    window.addEventListener('keydown', (e) => {
      switch(e.keyCode) {
        case 40:
          this.handleKeyDown();
          break;
        case 38:
          this.handleKeyUp();
          break;
        case 32:
          this.handleSpaceBar();
          break;
        case 39:
          this.handlePowerUp();
          break;
        case 37:
          this.handlePowerDown();
          break;
      }
    });
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      console.log(e.clientX - rect.left, e.clientY - rect.top);
    });
  }
}

export default Game;
