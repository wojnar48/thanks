### Background

# [thanks live][live]

Thanks is a game inspired by Amiga's 1991 hall of famer - Tanx. Like the original, it is a 2-player game and the goal is to destroy your opponent before you are destroyed. Players take turns firing projectiles
at each other by specifying the angle and power setting.

![thanks image][thanks_view]

### Technologies
- `HTML5 Canvas` for tank, projectile and land rendering.
- `JavaScript` for game logic.
- `jQuery` for event triggering and DOM manipulation.
- `webpack` to bundle js files.
- `HTML5 & CSS3` for game skeleton and styling

## Features and Challenges

### Turret Movement & Projectile Start-points

One of the first challenges of achieving accurate trajectory path rendering was figuring out the x, y entry point of a projectile given
a turret angle. jQuery event listeners are used to update and re-render the turret arm in real time while the below formula uses trigonometry, the provided angle, and the turret length to accurately
calculate the entry point of the projectile.

```js
export const findExitPoint = (x, y, angle) => {
  const xVal = x + Math.cos(-1 * angle) * 32;
  const yVal = y - Math.sin(-1 * angle) * 32;
  return [xVal, yVal];
};
```

### Projectile Motion

Once launched, the snippet below (taken from the drawTrajectory method)
provides the core logic for 2D projectile motion from which the x, y
coordinates are obtained given gravity, turret angle and power setting (velocity).

![thanks trajectory][thanks_trajectory]

```js
const renderPoint = () => {
  let y = Math.tan(angle) * x - (gravity / (2 * Math.pow(vel, 2) *
    Math.pow(Math.cos(angle), 2)) * Math.pow(x, 2));
  y = Math.floor(y);
}
```

### Collision Detection

In order to accurately pinpoint projectile land collisions, the bounded
box approach employed by libraries like Easeljs is not used. Instead, as the projectile is tracing it's flight arc, thanks uses the Canvas API
to query pixel data directly at a given position - as seen in the snippet below. This, gives very precise, pixel-accurate collisions.

```js
const pixelData = ctx.getImageData(x, y, 1, 1);
if (pixelData.data[0] !== 0) {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(x, y, 25, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 0, 0, 255)';
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
  clearInterval(renderInterval);
}
```

On impact, the 'destination-out' composite effect gives the effect of
taking out a chunk of land by tracing a circle and effectively erasing
pixel data that is enveloped by the radius.

## Future Direction

- Develop a more accurate opponent collision method
- Implement Canvas animations
- Get players placed in random positions on randomly generated land
- Include wind resistance in the calculation of flight trajectory

[live]: http://wojnar48.github.io/thanks
[thanks_view]: docs/images/thanks_view.png
[thanks_trajectory]: docs/images/thanks_trajectory.png
