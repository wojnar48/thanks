import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const game = new Game(ctx);
  game.drawLand();
  game.tank1.render();
  // game.tank1.fire();
});
