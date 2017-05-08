import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const game = new Game(ctx);
  game.drawLand();
  game.tank1.render();
  game.tank2.render();
});
