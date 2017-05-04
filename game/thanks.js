import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const game = new Game(ctx);
  game.drawLand();
  game.drawTank();
  // game.fire();
});
