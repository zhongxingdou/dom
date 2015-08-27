/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	__webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	describe('util', function() {
	  return describe('each()', function() {
	    it('call handler with each item', function() {
	      var count;
	      count = 0;
	      Dom.each([1, 2, 3], function(n, i) {
	        return count += n;
	      });
	      return assert(count === 1 + 2 + 3);
	    });
	    return it('break if handler returns false', function() {
	      var count;
	      count = 0;
	      Dom.each([1, 2, 3], function(n, i) {
	        count += n;
	        if (n === 2) {
	          return false;
	        }
	      });
	      return assert(count === 1 + 2);
	    });
	  });
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	describe('by', function() {
	  var createEl, removeEl;
	  createEl = function(tag, id) {
	    var el;
	    el = document.createElement(tag);
	    if (id) {
	      el.id = id;
	    }
	    document.body.appendChild(el);
	    return el;
	  };
	  removeEl = function(el, wrap) {
	    if (!wrap) {
	      wrap = document.body;
	    }
	    return wrap.removeChild(el);
	  };
	  describe('byId()', function() {
	    var div;
	    div = null;
	    before(function() {
	      return div = createEl('div', 'id');
	    });
	    after(function() {
	      return removeEl(div);
	    });
	    return it('normal', function() {
	      return assert(Dom.byId('id') === div);
	    });
	  });
	  describe('byTag()', function() {
	    var input1, input2;
	    input1 = null;
	    input2 = null;
	    before(function() {
	      input1 = createEl('input');
	      return input2 = createEl('input');
	    });
	    after(function() {
	      removeEl(input1);
	      return removeEl(input2);
	    });
	    return it('normal', function() {
	      return assert(Dom.byTag('input').length === 2);
	    });
	  });
	  describe('oneByTag()', function() {
	    var input1, input2;
	    input1 = null;
	    input2 = null;
	    before(function() {
	      input1 = createEl('input');
	      return input2 = createEl('input');
	    });
	    after(function() {
	      removeEl(input1);
	      return removeEl(input2);
	    });
	    return it('normal', function() {
	      return assert(Dom.oneByTag('input') === input1);
	    });
	  });
	  describe('oneByName()', function() {
	    var input, myname;
	    input = null;
	    myname = 'myname';
	    before(function() {
	      input = createEl('input');
	      return input.name = myname;
	    });
	    after(function() {
	      return removeEl(input);
	    });
	    return it('normal', function() {
	      return Dom.oneByName(myname) === input;
	    });
	  });
	  return describe('byName()', function() {
	    var input1, input2, myname;
	    input1 = input2 = null;
	    myname = 'myname';
	    before(function() {
	      input1 = createEl('input');
	      input2 = createEl('input');
	      return input1.name = input2.name = myname;
	    });
	    after(function() {
	      removeEl(input1);
	      return removeEl(input2);
	    });
	    return it('normal', function() {
	      return Dom.byName(myname).length === 2;
	    });
	  });
	});


/***/ }
/******/ ]);