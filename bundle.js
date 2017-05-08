/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var DEG_TO_RAD = exports.DEG_TO_RAD = Math.PI / 180;
var RAD_TO_DEG = exports.RAD_TO_DEG = 180 / Math.PI;

var drawTrajectory = exports.drawTrajectory = function drawTrajectory(ctx, exitX, exitY, turretAngle, power, type, opponent, game) {
  ctx.fillStyle = 'rgba(255, 0, 0, 255)';

  var x = 0;
  var xInit = exitX;
  var yInit = exitY;
  var points = [];

  var angle = turretAngle * -1;
  var vel = power;
  var gravity = 9.8;

  var renderPoint = function renderPoint() {
    var y = Math.tan(angle) * x - gravity / (2 * Math.pow(vel, 2) * Math.pow(Math.cos(angle), 2)) * Math.pow(x, 2);
    y = Math.floor(y);

    if (points.length > 10) {
      var point = points.shift();
      ctx.clearRect(point[0] - 1, point[1] - 1, 3, 3);
    }
    ctx.fillRect(xInit, yInit - y, 1, 1);
    points.push([xInit, yInit - y]);

    x++;
    type === 'Player' ? xInit++ : xInit--;

    checkCollisions(xInit, yInit - y - 1, game);
    if (x > 1200) {
      clearInterval(renderInterval);
    }
  };

  var checkCollisions = function checkCollisions(x, y, game) {
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

    var pixelData = ctx.getImageData(x, y, 1, 1);
    if (pixelData.data[0] !== 0) {
      points.forEach(function (point) {
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

  var renderInterval = setInterval(renderPoint, 2);
};

var drawLand = exports.drawLand = function drawLand(ctx) {
  var land = new Image();
  land.src = 'assets/images/land.png';
  land.crossOrigin = "Anonymous";
  land.onload = function () {
    ctx.drawImage(land, 0, 0);
  };
};

var findExitPoint = exports.findExitPoint = function findExitPoint(x, y, angle) {
  var xVal = x + Math.cos(-1 * angle) * 32;
  var yVal = y - Math.sin(-1 * angle) * 32;
  return [xVal, yVal];
};

var findExitPointEnemy = exports.findExitPointEnemy = function findExitPointEnemy(x, y, angle) {
  var xVal = x - Math.cos(-1 * angle) * 32;
  var yVal = y - Math.sin(-1 * angle) * 32;
  return [xVal, yVal];
};

var checkHit = exports.checkHit = function checkHit(x, y, opponent) {
  if (opponent.x - 20 <= x && x <= opponent.x + 20 && opponent.y - 20 <= y && y <= opponent.y + 20) {
    return true;
  } else {
    return false;
  }
};

var gameOver = exports.gameOver = function gameOver(ctx) {
  $('.game-container').addClass('off-screen');
  $('#game-over').removeClass('off-screen');
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var Util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tank = function () {
  function Tank(x, y, ctx, angle, power) {
    _classCallCheck(this, Tank);

    this.tankName = 'Player';
    this.ctx = ctx;
    this.turretAngle = angle;
    this.power = power;
    this.x = x;
    this.y = y;
  }

  _createClass(Tank, [{
    key: 'fire',
    value: function fire(game, opponent) {
      var exitX = void 0,
          exitY = void 0;

      var _Util$findExitPoint = Util.findExitPoint(this.x + 40, this.y + 10, this.turretAngle, this.power);

      var _Util$findExitPoint2 = _slicedToArray(_Util$findExitPoint, 2);

      exitX = _Util$findExitPoint2[0];
      exitY = _Util$findExitPoint2[1];


      Util.drawTrajectory(this.ctx, exitX, exitY, this.turretAngle, this.power, this.tankName, opponent, game);
    }
  }, {
    key: 'displayName',
    value: function displayName() {
      $('#player').text(this.tankName);
    }
  }, {
    key: 'updateAngle',
    value: function updateAngle() {
      var degrees = Number(this.turretAngle * Util.RAD_TO_DEG).toFixed(2);
      $('#angle').text(degrees * -1);
    }
  }, {
    key: 'updatePower',
    value: function updatePower() {
      $('#power').text(this.power);
    }
  }, {
    key: 'turretDown',
    value: function turretDown() {
      this.turretAngle += Util.DEG_TO_RAD;
      this.render();
      this.updateAngle(this.turretAngle * Util.RAD_TO_DEG);
    }
  }, {
    key: 'turretUp',
    value: function turretUp() {
      this.turretAngle -= Util.DEG_TO_RAD;
      this.render();
      this.updateAngle(this.turretAngle * Util.RAD_TO_DEG);
    }
  }, {
    key: 'powerUp',
    value: function powerUp() {
      this.power++;
      this.updatePower(this.power);
    }
  }, {
    key: 'powerDown',
    value: function powerDown() {
      this.power--;
      this.updatePower(this.power);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var tank = new Image();
      tank.src = 'assets/images/tank.png';
      tank.crossOrigin = "Anonymous";
      tank.onload = function () {
        _this.ctx.clearRect(_this.x, _this.y - 20, 70, 60);
        _this.ctx.drawImage(tank, _this.x, _this.y);

        var exitX = void 0,
            exitY = void 0;

        var _Util$findExitPoint3 = Util.findExitPoint(_this.x + 36, _this.y + 16, _this.turretAngle);

        var _Util$findExitPoint4 = _slicedToArray(_Util$findExitPoint3, 2);

        exitX = _Util$findExitPoint4[0];
        exitY = _Util$findExitPoint4[1];


        _this.ctx.beginPath();
        _this.ctx.moveTo(42, 394);
        _this.ctx.lineWidth = 3;
        _this.ctx.lineTo(exitX, exitY);
        _this.ctx.stroke();
      };

      this.updatePower();
      this.updateAngle();
      this.displayName();
    }
  }]);

  return Tank;
}();

exports.default = Tank;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var Util = _interopRequireWildcard(_util);

var _tank = __webpack_require__(1);

var _tank2 = _interopRequireDefault(_tank);

var _enemy_tank = __webpack_require__(3);

var _enemy_tank2 = _interopRequireDefault(_enemy_tank);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(ctx) {
    _classCallCheck(this, Game);

    this.ctx = ctx;
    this.tank1 = new _tank2.default(10, 380, ctx, -0.7, 100);
    this.tank2 = new _enemy_tank2.default(820, 320, ctx, -0.7, 100);
    this.currentMover = this.tank1;
    this.projectileInAir = false;
    this.gameOver = false;
  }

  _createClass(Game, [{
    key: 'start',
    value: function start() {
      this.tank1.render();
      this.tank2.render();
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown() {
      this.currentMover.turretDown();
    }
  }, {
    key: 'handleKeyUp',
    value: function handleKeyUp() {
      this.currentMover.turretUp();
    }
  }, {
    key: 'handlePowerUp',
    value: function handlePowerUp() {
      this.currentMover.powerUp();
    }
  }, {
    key: 'handlePowerDown',
    value: function handlePowerDown() {
      this.currentMover.powerDown();
    }
  }, {
    key: 'handleSpaceBar',
    value: function handleSpaceBar() {
      var opponent = this.currentMover === this.tank1 ? this.tank2 : this.tank1;

      this.projectileInAir = true;
      this.currentMover.fire(this, opponent);
    }
  }, {
    key: 'handleStart',
    value: function handleStart() {
      $('.game-container').removeClass('off-screen');
      $('.welcome').addClass('off-screen');
    }
  }, {
    key: 'drawLand',
    value: function drawLand() {
      var _this = this;

      Util.drawLand(this.ctx);
      window.addEventListener('keydown', function (e) {
        switch (e.keyCode) {
          case 40:
            _this.handleKeyDown();
            break;
          case 38:
            _this.handleKeyUp();
            break;
          case 32:
            _this.handleSpaceBar();
            break;
          case 39:
            _this.handlePowerUp();
            break;
          case 37:
            _this.handlePowerDown();
            break;
        }
      });
      $('#begin').on('click', this.handleStart);
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var Util = _interopRequireWildcard(_util);

var _tank = __webpack_require__(1);

var _tank2 = _interopRequireDefault(_tank);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EnemyTank = function (_Tank) {
  _inherits(EnemyTank, _Tank);

  function EnemyTank(x, y, ctx, angle, power) {
    _classCallCheck(this, EnemyTank);

    var _this = _possibleConstructorReturn(this, (EnemyTank.__proto__ || Object.getPrototypeOf(EnemyTank)).call(this, x, y, ctx, angle, power));

    _this.tankName = 'CPU';
    return _this;
  }

  _createClass(EnemyTank, [{
    key: 'fire',
    value: function fire(game, opponent) {
      var exitX = void 0,
          exitY = void 0;

      var _Util$findExitPointEn = Util.findExitPointEnemy(this.x + 30, this.y + 10, this.turretAngle, this.power);

      var _Util$findExitPointEn2 = _slicedToArray(_Util$findExitPointEn, 2);

      exitX = _Util$findExitPointEn2[0];
      exitY = _Util$findExitPointEn2[1];


      Util.drawTrajectory(this.ctx, exitX, exitY, this.turretAngle, this.power, this.tankName, opponent, game);
    }
  }, {
    key: 'displayName',
    value: function displayName() {
      $('#player').text(this.tankName);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var tank = new Image();
      tank.src = 'assets/images/tank_enemy.png';
      tank.crossOrigin = "Anonymous";
      tank.onload = function () {
        _this2.ctx.clearRect(_this2.x - 20, _this2.y - 20, 80, 60);
        _this2.ctx.drawImage(tank, _this2.x, _this2.y);

        var exitX = void 0,
            exitY = void 0;

        var _Util$findExitPointEn3 = Util.findExitPointEnemy(_this2.x + 36, _this2.y + 16, _this2.turretAngle);

        var _Util$findExitPointEn4 = _slicedToArray(_Util$findExitPointEn3, 2);

        exitX = _Util$findExitPointEn4[0];
        exitY = _Util$findExitPointEn4[1];


        _this2.ctx.beginPath();
        _this2.ctx.moveTo(_this2.x + 28, _this2.y + 13);
        _this2.ctx.lineWidth = 3;
        _this2.ctx.lineTo(exitX, exitY);
        _this2.ctx.stroke();
      };
    }
  }]);

  return EnemyTank;
}(_tank2.default);

exports.default = EnemyTank;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(2);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var game = new _game2.default(ctx);
  game.drawLand();
  game.start();
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map