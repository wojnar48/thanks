export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;

export const drawTrajectory = (ctx, exitX, exitY, turretAngle) => {
  ctx.fillStyle = 'rgba(255, 0, 0, 255)';

  let x = 0;
  let xInit = exitX;
  let yInit = exitY;
  let points = [];

  const angle = turretAngle * -1;
  const vel = 100;
  const gravity = 9.8;

  const renderPoint = () => {
    let y = Math.tan(angle) * x - (gravity / (2 * Math.pow(vel, 2) *
      Math.pow(Math.cos(angle), 2)) * Math.pow(x, 2));
    y = Math.floor(y);

    if (points.length > 10) {
      let point = points.shift();
      ctx.clearRect(point[0] - 1, point[1] - 1, 3, 3);
    }
    ctx.fillRect(xInit, yInit - y, 1, 1);
    points.push([xInit, yInit - y]);


    x++;
    xInit++;

    checkCollisions(xInit, yInit - y - 1);
    if (x > 1200) { clearInterval(renderInterval); }
  };

  const checkCollisions  = (x, y) => {
    x = Math.floor(x);
    y = Math.floor(y);

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
  const yVal = y - Math.sin(-1 * angle) * 32;
  return [xVal, yVal];
};
