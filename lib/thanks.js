import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const game = new Game(ctx);
  game.drawLand();
  game.start();
});

// move player update logic to game
// see if draw trajectory method can be refactored
// probably makes sense to move trajectory method into tank class
