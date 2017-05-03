### Background

Thanks is a game inspired by Amiga's 1991 classic Tanx. Like the original, it is a 2-player game and the goal is to destroy your opponent
before you, yourself are destroyed.

### Functionality

Each user is assigned a tank and take turns at firing projectiles at each other. Upon firing, each player chooses a power setting and an
angle at which to fire - this determines the trajectory of the projectile.  

### MVPs

- [ ] On start, users choose names and are taken to the field of battle
- [ ] User can choose power setting and angle of fire using arrow keys
- [ ] On spacebar press, projectile is fired and traces a flight curve based on power and angle
- [ ] On hit game ends and winner is declared

### Technologies
- nativeDOM methods for DOM manipulation and event triggering
- `JavaScript` for game logic
- `Easeljs` to assist in rendering elements
- `webpack` to bundle js files.

### Implementation Timeline

**Day 1** Setup file structure and battlefield. At the end of the day all of the visual assets should be present on the battlefield

**Day 2** Implement projectile trajectory physics using projectile motion laws. By the end of the day projectiles should have x,y coordinates across time.

**Day 3** Using x,y values from Day 2, implement the rendering of the flight trajectory
