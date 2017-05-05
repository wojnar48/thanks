
export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;

export const drawTrajectory = (ctx, exitX, exitY, turretAngle) => {
  ctx.fillStyle = 'rgba(79, 203, 138, 1)';

  let x = exitX;
  let yInit = exitY;
  const angle = turretAngle * -1;
  const vel = 100;
  const gravity = 9.8;

  const renderPoint = () => {
    let y = Math.tan(angle) * x - (gravity / (2 * Math.pow(vel, 2) *
      Math.pow(Math.cos(angle), 2)) * Math.pow(x, 2));
    y = Math.floor(y);

    console.log(`x: ${x}, y: ${yInit - y}`);
    ctx.fillRect(x, yInit - y, 1, 1);
    x++;

    checkCollisions(x, yInit - y - 1);
    if (x > 1200) { clearInterval(renderInterval); }
  };

  const checkCollisions  = (x, y) => {
    x = Math.floor(x);
    y = Math.floor(y);

    const pixelData = ctx.getImageData(x, y, 1, 1);
    if (pixelData.data[0] !== 0) {
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 0, 0, 255)';
      ctx.fill();
      clearInterval(renderInterval);
    }
  };

  const renderInterval = setInterval(renderPoint, 5);
};

export const drawLand = (ctx) => {
  const land = new Image();
  land.src = 'land.png';
  land.crossOrigin = "Anonymous";
  land.onload = () => {
    ctx.drawImage(land, 0, 0);
  };
};

export const findExitPoint = (x, y, angle) => {
  const xVal = x + Math.cos(-1 * angle) * 32;
  const yVal = y + Math.sin(-1 * angle) * 32;
  console.log(`x: ${xVal}, y: ${yVal}`);
  return [xVal, yVal];
};
