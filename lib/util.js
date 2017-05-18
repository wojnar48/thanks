export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;

export const drawTrajectory = (
  ctx,
  exitX,
  exitY,
  turretAngle,
  power,
  type,
  opponent,
  game) => {
  ctx.fillStyle = 'rgba(255, 0, 0, 255)';

  let x = 0;
  let xInit = exitX;
  let yInit = exitY;
  let points = [];

  const angle = turretAngle * -1;
  const vel = power;
  const gravity = 9.8;

  const renderPoint = () => {
    let y = Math.tan(angle) * x - (gravity / (2 * Math.pow(vel, 2) *
      Math.pow(Math.cos(angle), 2)) * Math.pow(x, 2));
    y = Math.floor(y);

    // if (points.length > 10) {
    //   let point = points.shift();
    //   ctx.clearRect(point[0] - 1, point[1] - 1, 3, 3);
    // }
    ctx.fillRect(xInit, yInit - y, 1, 1);
    points.push([xInit, yInit - y]);

    x++;
    type === 'Ally' ? xInit++ : xInit--;

    checkCollisions(xInit, yInit - y - 1 , game);
    if (x > 1200) { clearInterval(renderInterval); }
  };

  const checkCollisions  = (x, y, game) => {
    x = Math.floor(x);
    y = Math.floor(y);

    if (checkHit(x, y, opponent)) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(255, 0, 0, 255)';
      ctx.beginPath();
      ctx.arc(x, y, 80, 0, Math.PI * 2);
      ctx.fill();
      gameOver(ctx);
      clearInterval(renderInterval);
      return;
    }

    const pixelData = ctx.getImageData(x, y, 1, 1);
    if (pixelData.data[0] !== 0) {
      points.forEach(point => {
        ctx.clearRect(point[0] - 1, point[1] - 1, 3, 3);
      });
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 0, 0, 255)';
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
      clearInterval(renderInterval);
      game.projectileInAir = false;
      game.currentMover = opponent;
      game.currentMover.updatePower();
      game.currentMover.updateAngle();
      game.currentMover.displayName();
    }
  };

  const renderInterval = setInterval(renderPoint, 2);
};

export const drawLand = (ctx) => {
  const land = new Image();
  land.src = 'assets/images/land.png';
  land.crossOrigin = "Anonymous";
  land.onload = () => {
    ctx.drawImage(land, 0, 0);
  };
};

export const findExitPoint = (x, y, angle) => {
  const xVal = x + Math.cos(-1 * angle) * 32;
  const yVal = y - Math.sin(-1 * angle) * 32;
  return [xVal, yVal];
};

export const findExitPointEnemy = (x, y, angle) => {
  const xVal = x - Math.cos(-1 * angle) * 32;
  const yVal = y - Math.sin(-1 * angle) * 32;
  return [xVal, yVal];
};

export const checkHit = (x, y, opponent) => {
  if ((opponent.x - 20 <= x) && (x <= opponent.x + 20) &&
    (opponent.y - 20 <= y) && (y <= opponent.y + 20)) {
    return true;
  } else {
    return false;
  }
};

export const gameOver = (ctx) => {
  $('.game-container').addClass('off-screen');
  $('#game-over').removeClass('off-screen');
};
