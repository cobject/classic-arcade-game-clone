const MAX_ROW = 6;
const MAX_COL = 5;
const WIDTH = 101;
const HEIGHT = 83;
const ENEMY_WIDTH = 101;
const ENEMY_HEIGHT = 171;

// Enemies our player must avoid
var Enemy = function(player) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.reset();
  this.player = player;
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x >= 505) {
    this.reset();
  } else {
    this.x = this.x >= 505 ? 0 : this.x + this.speed * dt;
  }
  if (this.handleCollision()) {
    player.reset();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.handleCollision = function() {
  const playerX = player.x;
  const playerY = player.y + 80;
  const paddingX = WIDTH / 2;
  const paddingY = HEIGHT / 2;

  if (this.x < playerX + WIDTH - paddingX && this.x + ENEMY_WIDTH > playerX + paddingX &&
    this.y < playerY + HEIGHT - 100 && this.y + ENEMY_HEIGHT > playerY + paddingY) {
    return true;
  }
  return false;
};

Enemy.prototype.reset = function() {
  this.x = 0;
  this.y = (parseInt((Math.random() * 100) % 3) + 1) * HEIGHT - 20;
  this.speed = (Math.random() + 1) * 200;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.reset();
    this.sprite = 'images/char-boy.png';
  }

  update(dt) {
    if (this.x <= 0) {
      this.x = 0;
    } else if (this.x >= 505 - WIDTH) {
      this.x = 505 - WIDTH;
    }

    if (this.y <= 0) {
      this.y = 0;
    } else if (this.y >= 5 * HEIGHT) {
      this.y = 5 * HEIGHT;
    }
    if (this.finish()) {
      this.reset();
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key) {
    switch (key) {
      case 'left':
        this.x -= WIDTH;
        break;
      case 'right':
        this.x += WIDTH;
        break;
      case 'up':
        this.y -= HEIGHT;
        break;
      case 'down':
        this.y += HEIGHT;
        break;
    }
  }

  finish() {
    return this.y <= 0 ? true : false;
  }

  reset() {
    this.x = 2 * WIDTH;
    this.y = 5 * HEIGHT;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(player),
    new Enemy(player),
    new Enemy(player)
];

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});