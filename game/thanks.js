import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const game = new Game(ctx);
  game.drawLand();
  // game.tank1.render();
});
