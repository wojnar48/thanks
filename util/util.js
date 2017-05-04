export const drawTrajectory = (ctx) => {
  ctx.fillStyle = 'rgba(79, 203, 138, 1)';

  let x = 0;
  let yInit = 399;
  const angle = 60 * Math.PI / 180;
  const vel = 100;
  const gravity = 9.8;

  const renderPoint = () => {
    let y = Math.tan(angle) * x - (gravity / (2 * Math.pow(vel, 2) *
      Math.pow(Math.cos(angle), 2)) * Math.pow(x, 2));
    y = Math.floor(y);
    console.log(`x: ${x}, y: ${yInit - y}`);
    ctx.fillRect(x, yInit - y, 1, 1);
    x++;

    // check for target and ground
    checkCollisions(x, yInit - y);
    if (x > 1200) { clearInterval(renderInterval); }
  };

  const checkCollisions  = (x, y) => {
    const pixelData = ctx.getImageData(x, y, 1, 1);
    if (pixelData.data[0] !== 0) {
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 0, 0, 255)';
      ctx.fill();
      clearInterval(renderInterval);
    }
  };

  const renderInterval = setInterval(renderPoint, 10);
}

export const drawLand = (ctx) => {
  const land = new Image();
  land.src = 'land.png';
  land.crossOrigin = "Anonymous";
  land.onload = () => {
    ctx.drawImage(land, 0, 0);
  };
};

export const drawTank = (ctx) => {
  const angle = -0.7;
  const tank = new Image();
  tank.src = 'tank.png';
  tank.crossOrigin = "Anonymous";
  tank.onload = () => {
    ctx.drawImage(tank, 0, 385);
    const turret = new Image();
    turret.src = 'turret.png';
    turret.crossOrigin = "Anonymous";
    turret.onload = () => {
      ctx.save();
      ctx.translate(30, 397);
      findExitPoint(30, 397, angle);
      ctx.rotate(angle);
      ctx.drawImage(turret, 0, 0);
      ctx.restore();
    };
  };
};

export const findExitPoint = (x, y, angle) => {
  const xVal = x + Math.cos(-1 * angle) * 4;
  const yVal = y + Math.sin(-1 * angle) * 4;
  console.log(`x: ${xVal}, y: ${yVal}`);
};
