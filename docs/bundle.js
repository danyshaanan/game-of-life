/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var getRule = __webpack_require__(1).getRule;
	var math = __webpack_require__(2);
	var Grid = __webpack_require__(3);
	var Gol = __webpack_require__(4);
	var patterns = __webpack_require__(6);
	
	var dimensions = [500, 500];
	
	var init = function init(pattern) {
	  return [new Grid({ document: document, selector: 'canvas', dimensions: dimensions }), new Gol({ dimensions: dimensions, pattern: pattern })];
	};
	
	var _init = init(patterns.gliderGun),
	    _init2 = _slicedToArray(_init, 2),
	    grid = _init2[0],
	    gameOfLife = _init2[1];
	
	var updateCell = function updateCell(c) {
	  return grid.dot(c, gameOfLife.getColor(c));
	};
	var draw = function draw(changedCells) {
	  changedCells.toArray().forEach(updateCell);
	};
	var state = { tps: 60 };
	
	var frame = function frame() {
	  if (!state.freeze) draw(gameOfLife.tick(math.randRound(state.tps / 60)));
	  window.requestAnimationFrame(frame);
	};
	
	document.querySelector('canvas').onclick = function () {
	  state.freeze ^= 1;
	};(function () {
	  var element = document.querySelector('input[type=range]');
	  var output = document.querySelector('output');
	  element.value = state.tps;
	  element.onchange = function (e) {
	    output.value = state.tps = e.target.value;
	  };
	
	  var createOnClickHandler = function createOnClickHandler(key) {
	    return function () {
	      var _init3 = init(patterns[key]);
	
	      var _init4 = _slicedToArray(_init3, 2);
	
	      grid = _init4[0];
	      gameOfLife = _init4[1];
	
	      draw(gameOfLife.tick(0));
	    };
	  };
	  var atts = function atts(key) {
	    return { innerHTML: key, onclick: createOnClickHandler(key) };
	  };
	  var createButton = function createButton(key) {
	    return Object.assign(document.createElement('button'), atts(key));
	  };
	  var buttons = document.createElement('div');
	  Object.keys(patterns).map(createButton).forEach(function (b) {
	    return buttons.appendChild(b);
	  });
	  document.querySelector('body').appendChild(buttons);
	
	  document.querySelector('body').appendChild(Object.assign(document.createElement('input'), { value: 'b3s23', oninput: function oninput(e) {
	      gameOfLife.rule = getRule(e.target.value);
	    } }));
	})();
	
	draw(gameOfLife.tick(0));
	frame();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	var parseSet = function parseSet(s, r) {
	  return new Set(((s.match(r) || [])[1] || '').split('').map(Number));
	};
	
	var getRule = function getRule() {
	  var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'b3s23';
	  return {
	    born: parseSet(rule, /[bB](\d*)/),
	    survives: parseSet(rule, /[sS](\d*)/)
	  };
	};
	
	module.exports = {
	  getRule: getRule
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	var randRound = function randRound(n) {
	  return Math.trunc(n) + (Math.random() < n % 1);
	};
	
	module.exports = {
	  randRound: randRound
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	module.exports = function () {
	  function Grid(config) {
	    _classCallCheck(this, Grid);
	
	    var canvas = config.document.querySelector(config.selector);
	    var _config$dimensions = _slicedToArray(config.dimensions, 2);
	
	    canvas.width = _config$dimensions[0];
	    canvas.height = _config$dimensions[1];
	
	    this.ctx = canvas.getContext('2d');
	    this.ctx.imageSmoothingEnabled = false;
	  }
	
	  _createClass(Grid, [{
	    key: 'dot',
	    value: function dot(pixel, color) {
	      var _ctx;
	
	      this.ctx.fillStyle = color;
	      (_ctx = this.ctx).fillRect.apply(_ctx, _toConsumableArray(pixel).concat([1, 1]));
	    }
	  }]);
	
	  return Grid;
	}();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var getRule = __webpack_require__(1).getRule;
	var CellSet = __webpack_require__(5);
	
	var neiDiffs = [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]];
	// const neiDiffs = [0, 1, 2, 3, 5, 6, 7, 8].map(i => [(i / 3 | 0) - 1, i % 3 - 1])
	
	var add = function add(p, q) {
	  return [p[0] + q[0], p[1] + q[1]];
	};
	var modulo = function modulo(p, q) {
	  return [(p[0] + q[0]) % q[0], (p[1] + q[1]) % q[1]];
	};
	
	module.exports = function () {
	  function Gol(options) {
	    _classCallCheck(this, Gol);
	
	    this.dimensions = options.dimensions;
	    this.rule = getRule(options.rule);
	    this.changedSinceLastCalc = new CellSet(options.pattern);
	    this.liveCells = new CellSet(options.pattern);
	    this.diff = new CellSet(options.pattern);
	  }
	
	  _createClass(Gol, [{
	    key: 'isAlive',
	    value: function isAlive(cell) {
	      return this.liveCells.has(cell);
	    }
	  }, {
	    key: 'getColor',
	    value: function getColor(cell) {
	      return this.isAlive(cell) ? 'black' : 'white';
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle(cell) {
	      cell = modulo(cell, this.dimensions);
	      this.liveCells.toggle(cell);
	      this.changedSinceLastCalc.toggle(cell);
	      this.diff.toggle(cell);
	    }
	  }, {
	    key: 'tick',
	    value: function tick() {
	      var _this = this;
	
	      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	
	      var neighbours = function neighbours(c) {
	        return neiDiffs.map(function (d) {
	          return modulo(add(c, d), _this.dimensions);
	        });
	      };
	      var countNeighbours = function countNeighbours(cell) {
	        return neighbours(cell).filter(function (s) {
	          return _this.isAlive(s);
	        }).length;
	      };
	      var shouldChange = function shouldChange(cell, nei) {
	        return _this.isAlive(cell) && !_this.rule.survives.has(nei) || !_this.isAlive(cell) && _this.rule.born.has(nei);
	      };
	
	      var iterate = function iterate(lastGenChanged) {
	        return new CellSet(lastGenChanged.toArray().reduce(function (a, c) {
	          return a.concat([c].concat(_toConsumableArray(neighbours(c))));
	        }, []).filter(function (cell) {
	          return shouldChange(cell, countNeighbours(cell));
	        }));
	      };
	
	      for (var i = n; i > 0; i--) {
	        this.changedSinceLastCalc = iterate(this.changedSinceLastCalc);
	        this.changedSinceLastCalc.toArray().forEach(function (c) {
	          _this.liveCells.toggle(c);
	          _this.diff.toggle(c);
	        });
	      }
	
	      var ret = this.diff;
	      this.diff = new CellSet();
	      return ret;
	    }
	  }]);
	
	  return Gol;
	}();

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var encode = function encode(c) {
	  return c[0] + ',' + c[1];
	};
	var decode = function decode(s) {
	  return s.split(',').map(Number);
	};
	
	module.exports = function () {
	  function CellSet() {
	    var initValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	
	    _classCallCheck(this, CellSet);
	
	    this.set = new Set(initValues.map(encode));
	  }
	
	  _createClass(CellSet, [{
	    key: 'add',
	    value: function add(cell) {
	      this.set.add(encode(cell));
	    }
	  }, {
	    key: 'has',
	    value: function has(cell) {
	      return this.set.has(encode(cell));
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(cell) {
	      this.set.delete(encode(cell));
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle(cell) {
	      this[this.has(cell) ? 'delete' : 'add'](cell);
	    }
	  }, {
	    key: 'toArray',
	    value: function toArray() {
	      return Array.from(this.set).map(decode);
	    }
	  }]);
	
	  return CellSet;
	}();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var u = __webpack_require__(7);
	var f = __webpack_require__(8);
	
	var patterns = {
	  glider: 'bo$2bo$3o!',
	  missingname: '100o!',
	  Rpentomino: 'b2o$2o$bo!',
	  Acorn: '2o2b3o$3bo$bo!',
	  lightweightSpaceship: '4o$o3bo$o$bo!',
	  gliderGun: '2b2o$2b2o7$3b2o$2bobo$2b2o6$4b3o$4bo$5bo4$b2o$obo$2o10b2o$12bobo$12bo8$2o$2o5b3o$7bo$8bo!',
	  B52bomber: 'b2o36b$b2o17bo18b$19bobo12bobo2b$20bo12bo5b$2o7b2o23bo2bob$2obo5b2o23bobobo$3bo23bo7bo2bo$3bo23b2o7b2ob$o2bo17b2o5bo10b$b2o18bo17b$21b3o15b$36b2ob$36b2ob$b2o36b$o2bo35b$obobo16bobo4b2o5b2o2b$bo2bo17b2o4b2o5b2obo$5bo12bo3bo15bo$2bobo12bobo18bo$18bo16bo2bo$36b2o!',
	  gliderlessGun: '9b2o2bobo$2b2o4b3obo3bo$2b2o3b2o6bo$8bob5o22b2o3bo$9b3o25b3obob2o4b2o$37b3o4bo4b2o$9b3o28bo3bo$8bob5o26b3o$2b2o3b2o6bo$2b2o4b3obo3bo24b3o$9b2o2bobo24bo3bo$21bo15b3o4bo4b2o$19b2o16b3obob2o4b2o$20b2o15b2o3bo3$2b2o19bo2bo$2b2o23bo19b4o$23bo3bo18bo3bo$24b4o22bo$46bo2bo$2b3o3b3o$bo2bo3bo2bo$5bobo$b2o7b2o$b2o7b2o$4bo3bo$4b2ob2o$2b3o3b3o$2b2o5b2o$2bo7bo13$2b2o5b2o$2b2o5b2o!',
	  SHIP: '4b2o$3b4o2$2b6o$3b4o2$2b2o2b2o$2obo2bob2o$3bo2bo3$4b2o$4b2o!',
	  gbt12: '3o$2bo2$o$3o!'
	};
	
	// patterns['?'] = u.fromRLE(``)
	
	Object.keys(patterns).forEach(function (k) {
	  patterns[k] = u.centerIn(f.fromRLE(patterns[k]), [500, 500]);
	});
	
	module.exports = patterns;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var add = function add(pattern, shift) {
	  return pattern.map(function (c) {
	    return [c[0] + shift[0], c[1] + shift[1]];
	  });
	};
	var sub = function sub(pattern, shift) {
	  return add(pattern, shift.map(function (x) {
	    return -x;
	  }));
	};
	var min = function min(pattern) {
	  return [0, 1].map(function (i) {
	    return Math.min.apply(Math, _toConsumableArray(pattern.map(function (c) {
	      return c[i];
	    })));
	  });
	};
	var max = function max(pattern) {
	  return [0, 1].map(function (i) {
	    return Math.max.apply(Math, _toConsumableArray(pattern.map(function (c) {
	      return c[i];
	    })));
	  });
	};
	var transpose = function transpose(pattern) {
	  return pattern.map(function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 2),
	        x = _ref2[0],
	        y = _ref2[1];
	
	    return [y, x];
	  });
	};
	var size = function size(pattern) {
	  return function (n, x) {
	    return [0, 1].map(function (i) {
	      return Math.abs(n[i] - x[i]) + 1;
	    });
	  }(min(pattern), max(pattern));
	};
	var join = function join(s1, s2) {
	  return Array.from(new Set([].concat(_toConsumableArray(s1), _toConsumableArray(s2))));
	};
	var center = function center(pattern) {
	  return function (n, x) {
	    return [0, 1].map(function (i) {
	      return Math.round((x[i] + n[i] - 1) / 2);
	    });
	  }(min(pattern), max(pattern));
	};
	var centerIn = function centerIn(pattern, size) {
	  return add(pattern, sub([center([[0, 0], size])], center(pattern))[0]);
	};
	var zero = function zero(pattern) {
	  return sub(pattern, min(pattern));
	};
	
	module.exports = { add: add, sub: sub, transpose: transpose, min: min, max: max, size: size, join: join, center: center, centerIn: centerIn, zero: zero };

/***/ },
/* 8 */
/***/ function(module, exports) {

	/* eslint no-return-assign:0, no-sequences:0,prefer-template:0 */
	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var fromRLE = function fromRLE(st) {
	  var res = [];
	  var row = 0,
	      col = 0;
	
	  var funcs = {
	    o: function o(n) {
	      while (n--) {
	        res.push([row, col++]);
	      }
	    },
	    b: function b(n) {
	      col += n;
	    },
	    $: function $(n) {
	      var _ref = [row + n, 0];
	      row = _ref[0];
	      col = _ref[1];
	    }
	  };
	  st.replace(/(\d*)([bo$])/g, function (x, n, c) {
	    return funcs[c](Math.max(n, 1));
	  });
	  return res;
	};
	var toRLE = function toRLE(pairs) {
	  var rowReducer = function rowReducer(o, _ref2) {
	    var _ref3 = _slicedToArray(_ref2, 2),
	        a = _ref3[0],
	        b = _ref3[1];
	
	    return o[a] = (o[a] || []).concat([b]), o;
	  };
	  var getRows = function getRows(p) {
	    return Array.from(p.reduce(rowReducer, []));
	  };
	  var rowToArray = function rowToArray(row) {
	    return Array.from((row || []).reduce(function (a, n) {
	      return a[n] = a;
	    }, []));
	  };
	  var arrayToString = function arrayToString(arr) {
	    return arr.map(function (n) {
	      return n ? 'o' : 'b';
	    }).join('') + '$';
	  };
	
	  return getRows(pairs).map(rowToArray).map(arrayToString).join('').split('').reduce(function (o, curr) {
	    return {
	      prev: curr,
	      l: o.prev === curr ? o.l + 1 : 1,
	      s: o.prev && o.prev !== curr ? o.s + (o.l > 1 ? o.l : '') + o.prev : o.s
	    };
	  }, { s: '' }).s + '!';
	};
	
	var fromL = function fromL(st) {
	  return fromRLE(st.replace(/A/g, 'o').replace(/\./g, 'b'));
	};
	var toL = function toL(pairs) {
	  return toRLE(pairs).replace(/o/g, 'A').replace(/b/g, '.');
	};
	
	var fromGrid = function fromGrid(live, grid) {
	  return grid.split('\n').map(function (row, i) {
	    return row.split('').map(function (cell, j) {
	      return cell === live ? [i, j] : 0;
	    }).filter(Boolean);
	  }).reduce(function (o, line) {
	    return o.concat(line);
	  }, []);
	};
	
	module.exports = { fromRLE: fromRLE, toRLE: toRLE, fromL: fromL, toL: toL, fromGrid: fromGrid };

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map