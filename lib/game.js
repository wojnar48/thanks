import * as Util from './util';
import Tank from './tank';
import TankEnemy from './enemy_tank';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.tank1 = new Tank(10, 380, ctx, -0.7, 100);
    this.tank2 = new TankEnemy(820, 320, ctx, -0.7, 100);
    this.currentMover = this.tank1;
    this.projectileInAir = false;
    this.gameOver = false;
  }

  start () {
    this.tank1.render();
    this.tank2.render();
  }

  handleKeyDown () {
    this.currentMover.turretDown();
  }

  handleKeyUp () {
    this.currentMover.turretUp();
  }

  handlePowerUp () {
    this.currentMover.powerUp();
  }

  handlePowerDown () {
    this.currentMover.powerDown();
  }

  handleSpaceBar () {
    const opponent = this.currentMover === this.tank1 ?
      this.tank2 :
      this.tank1;

    this.projectileInAir = true;
    this.currentMover.fire(this, opponent);
  }

  handleStart () {
    $('.game-container').removeClass('off-screen');
    $('.welcome').addClass('off-screen');
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
    $('#begin').on('click', this.handleStart);
  }
}

export default Game;
