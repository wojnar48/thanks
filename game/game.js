import * as Util from '../util/util.js';
import Tank from './tank.js';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    // this.tank1 = new Tank(10, 380, ctx, -0.7, 100);
  }

  handleKeyDown () {
    this.tank1.turretDown();
  }

  handleKeyUp () {
    this.tank1.turretUp();
  }

  handleSpaceBar () {
    this.tank1.fire();
  }

  handlePowerUp () {
    this.tank1.powerUp();
  }

  handlePowerDown () {
    this.tank1.powerDown();
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
