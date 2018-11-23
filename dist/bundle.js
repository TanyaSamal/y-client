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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _renderPage = __webpack_require__(/*! ./renderPage */ "./src/renderPage.js");

var _request = __webpack_require__(/*! ./request */ "./src/request.js");

var _request2 = _interopRequireDefault(_request);

var _pagination = __webpack_require__(/*! ./pagination */ "./src/pagination.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _renderPage.renderPage)();
(0, _renderPage.setSearchAction)(_request2.default.request);
(0, _pagination.setPagingAction)();
(0, _pagination.setMouseSwipeAction)();
(0, _pagination.setTouchSwipeAction)();

var galery = document.querySelector('.galery');
var width = galery.offsetWidth;
var n = Math.floor(width / 300);

function resizeThrottler() {
  width = galery.offsetWidth;
  var newN = Math.floor(width / 300);
  if (newN !== n) {
    (0, _pagination.actualResize)(n);
    n = newN;
  }
}

window.addEventListener('resize', resizeThrottler, false);

/***/ }),

/***/ "./src/nextResults.js":
/*!****************************!*\
  !*** ./src/nextResults.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _youtubeApp = __webpack_require__(/*! ./youtubeApp */ "./src/youtubeApp.js");

var _pagination = __webpack_require__(/*! ./pagination */ "./src/pagination.js");

var _xhr = __webpack_require__(/*! ./xhr */ "./src/xhr.js");

var _xhr2 = _interopRequireDefault(_xhr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function showNext(next) {
  var query = document.querySelector('.search').value;
  var params = {
    type: 'video',
    part: 'snippet',
    q: encodeURIComponent(query),
    maxResults: 16,
    pageToken: next,
    key: 'AIzaSyAkd0BYxsGZQPndzDrnRMn6JVmOh0snKfg'
  };

  var queryArr = [];
  var keys = Object.keys(params);
  var values = Object.values(params);
  for (var i = 0; i < keys.length; i += 1) {
    queryArr.push(keys[i] + '=' + values[i]);
  }

  query = queryArr.join('&');
  var opt = {
    method: 'GET'
  };

  function getVideo(idStr, nextRes) {
    var queryVideo = 'key=' + params.key + '&id=' + idStr + '&part=snippet,statistics';
    var url = 'https://www.googleapis.com/youtube/v3/videos?' + queryVideo;
    var nPage = Math.floor(16 / (0, _youtubeApp.countVideo)());

    function nextVideos(videos) {
      videos.items.forEach(function (item) {
        (0, _youtubeApp.showVideo)(item);
      });
      (0, _pagination.nextPage)(nPage, nextRes);
    }

    _xhr2.default.httpRequest(url, opt, nextVideos);
  }

  var nextNext = '';
  var url = 'https://www.googleapis.com/youtube/v3/search?' + query;

  function getSearchNext(videos) {
    var idStr = '';
    nextNext = videos.nextPageToken;
    videos.items.forEach(function (item) {
      idStr = '' + idStr + item.id.videoId + ',';
    });
    getVideo(idStr, nextNext);
  }

  _xhr2.default.httpRequest(url, opt, getSearchNext);
}

exports.default = { showNext: showNext };

/***/ }),

/***/ "./src/pagination.js":
/*!***************************!*\
  !*** ./src/pagination.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTouchSwipeAction = exports.actualResize = exports.setMouseSwipeAction = exports.nextPage = exports.setPagingAction = exports.showPaging = undefined;

var _nextResults = __webpack_require__(/*! ./nextResults */ "./src/nextResults.js");

var _nextResults2 = _interopRequireDefault(_nextResults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line

function showPaging(count, next, active) {
  var pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';
  var galery = document.querySelector('.galery');
  galery.style.transform = 'none';
  galery.style['transition-duration'] = '0s';
  for (var i = 1; i <= count; i += 1) {
    var pagLi = document.createElement('li');
    pagLi.className = 'pageNumber';
    pagination.appendChild(pagLi);
    pagLi.innerHTML = i;
    if (i !== 1 && i !== count) {
      if (i > active + 2 || i < active - 1) pagLi.classList.add('hidden');
    }
    if (i === active) {
      pagLi.classList.add('active');
    }
    if (i === count) {
      pagLi.setAttribute('data-next', next);
    }
  }
}

function changeVideo(newPage) {
  var galery = document.querySelector('.galery');
  var width = galery.offsetWidth;
  galery.style.transform = 'translateX(-' + width * (newPage - 1) + 'px)';
  galery.style['transition-duration'] = '1s';
}

function changePage(target) {
  var pagination = document.querySelector('.pagination');
  pagination.children.forEach = [].forEach;
  pagination.children.forEach(function (element) {
    if (element.classList.contains('active')) {
      element.classList.remove('active');
    }
  });
  if (target.hasAttribute('data-next')) {
    var next = target.getAttribute('data-next');
    _nextResults2.default.showNext(next);
    target.removeAttribute('data-next');
  }
  pagination.children.forEach(function (element) {
    if (element === pagination.firstChild || element === pagination.lastChild || element === target.previousSibling || element === target || element === target.nextSibling) {
      element.classList.remove('hidden');
    } else element.classList.add('hidden');
  });
  target.classList.add('active');
  if (target === pagination.firstChild) {
    for (var i = 1; i < pagination.childElementCount; i += 1) {
      if (i < 4 && pagination.children[i].classList.contains('hidden')) {
        pagination.children[i].classList.remove('hidden');
      } else if (i >= 4 && pagination.children[i] !== pagination.lastChild) {
        pagination.children[i].classList.add('hidden');
      }
    }
  }
  if (target.previousSibling && target.previousSibling.classList.contains('hidden')) {
    target.previousSibling.classList.remove('hidden');
  }
  if (target.nextSibling && target.nextSibling.classList.contains('hidden')) {
    target.nextSibling.classList.remove('hidden');
  }
}

function swipe(x1, x2, y) {
  var galery = document.querySelector('.main');
  var activeLi = document.querySelector('.active');
  var number = Number(activeLi.innerHTML);
  var pagination = document.querySelector('.pagination');
  var first = Number(pagination.firstChild.innerHTML);
  var coords = galery.getBoundingClientRect();
  if (x1 <= coords.right && x1 >= coords.left && y >= coords.top && y <= coords.bottom) {
    if (x1 - x2 > 30) {
      changeVideo(number + 1);
      var target = activeLi.nextSibling;
      changePage(target);
    }
    if (x2 - x1 > 30 && number !== first) {
      changeVideo(number - 1);
      var _target = activeLi.previousSibling;
      changePage(_target);
    }
  }
}

function setPagingAction() {
  var pagination = document.querySelector('.pagination');
  pagination.addEventListener('click', function (e) {
    if (e.target.nodeName === 'LI') {
      changeVideo(Number(e.target.innerHTML));
      changePage(e.target);
    }
  });
  pagination.addEventListener('touchend', function (e) {
    e.preventDefault();
    if (e.changedTouches[0].target.nodeName === 'LI') {
      changeVideo(Number(e.changedTouches[0].target.innerHTML));
      changePage(e.changedTouches[0].target);
    }
  });
}

function setMouseSwipeAction() {
  var galery = document.querySelector('.main');
  var x1 = 0;
  var y1 = 0;
  galery.addEventListener('mousedown', function (e) {
    e.preventDefault();
    x1 = e.pageX;
    y1 = e.pageY;
    return false;
  });
  galery.addEventListener('mouseup', function (e) {
    e.preventDefault();
    var x2 = e.pageX;
    swipe(x1, x2, y1);
  });
}

function setTouchSwipeAction() {
  var galery = document.querySelector('.main');
  var x1 = 0;
  var y1 = 0;
  galery.addEventListener('touchstart', function (e) {
    e.preventDefault();
    x1 = e.touches[0].clientX;
    y1 = e.touches[0].clientY;
    return false;
  });
  galery.addEventListener('touchend', function (e) {
    e.preventDefault();
    var x2 = e.changedTouches[0].clientX;
    swipe(x1, x2, y1);
  });
}

function actualResize(oldN) {
  var galery = document.querySelector('.galery');
  var width = galery.offsetWidth;
  var n = Math.floor(width / 300);
  var pagination = document.querySelector('.pagination');
  var nPage = Number(galery.childElementCount);
  var newN = Math.floor(nPage / n);
  var next = '';
  var active = '';
  pagination.children.forEach = [].forEach;
  pagination.children.forEach(function (element) {
    if (element.hasAttribute('data-next')) {
      next = element.getAttribute('data-next');
    }
    if (element.classList.contains('active')) {
      active = Number(element.innerHTML);
    }
  });
  var activeVideo = oldN * (active - 1) + 1;
  var newActive = 0;
  if (activeVideo < n) {
    newActive = activeVideo;
  } else {
    newActive = Math.ceil(activeVideo / n);
  }
  showPaging(newN, next, newActive);
  galery.style.transform = 'translateX(-' + width * (newActive - 1) + 'px)';
  galery.style['transition-duration'] = '0s';
}

function nextPage(count, nextNext) {
  var pagination = document.querySelector('.pagination');
  var activeLi = document.querySelector('.active');
  var number = Number(activeLi.innerHTML);
  for (var i = 1; i <= count; i += 1) {
    var pagLi = document.createElement('li');
    pagLi.className = 'pageNumber';
    pagination.appendChild(pagLi);
    pagLi.innerHTML = number + i;
    if (i === count) {
      pagLi.setAttribute('data-next', nextNext);
    }
    if (i !== 1 && i !== count) {
      pagLi.classList.add('hidden');
    }
  }
}

exports.showPaging = showPaging;
exports.setPagingAction = setPagingAction;
exports.nextPage = nextPage;
exports.setMouseSwipeAction = setMouseSwipeAction;
exports.actualResize = actualResize;
exports.setTouchSwipeAction = setTouchSwipeAction;

/***/ }),

/***/ "./src/renderPage.js":
/*!***************************!*\
  !*** ./src/renderPage.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var input = void 0;
var button = void 0;

function renderPage() {
  var wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  document.body.appendChild(wrapper);

  var header = document.createElement('header');
  wrapper.appendChild(header);

  var form = document.createElement('div');
  form.classList.add('search-form');
  header.appendChild(form);

  input = document.createElement('input');
  input.classList.add('search');
  input.placeholder = 'Search...';
  form.appendChild(input);

  button = document.createElement('button');
  button.classList.add('btn-search');
  button.innerHTML = '<i class="fa fa-search"></i>';
  form.appendChild(button);

  var section = document.createElement('section');
  section.className = 'main';
  document.body.appendChild(section);

  var galery = document.createElement('div');
  galery.className = 'galery';
  section.appendChild(galery);

  var footer = document.createElement('footer');
  footer.className = 'footer';
  document.body.appendChild(footer);

  var pagination = document.createElement('ul');
  pagination.className = 'pagination';
  footer.appendChild(pagination);
}

function setSearchAction(func) {
  var galery = document.querySelector('.galery');
  input.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
      galery.innerHTML = '';
      func(input.value);
      input.blur();
    }
  });
  button.addEventListener('click', function () {
    galery.innerHTML = '';
    func(input.value);
  });
}

exports.setSearchAction = setSearchAction;
exports.renderPage = renderPage;

/***/ }),

/***/ "./src/request.js":
/*!************************!*\
  !*** ./src/request.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _youtubeApp = __webpack_require__(/*! ./youtubeApp */ "./src/youtubeApp.js");

var _pagination = __webpack_require__(/*! ./pagination */ "./src/pagination.js");

var _xhr = __webpack_require__(/*! ./xhr */ "./src/xhr.js");

var _xhr2 = _interopRequireDefault(_xhr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function request(queryStr) {
  var query = queryStr;
  var params = {
    type: 'video',
    part: 'snippet',
    q: encodeURIComponent(query),
    maxResults: 16,
    key: 'AIzaSyAkd0BYxsGZQPndzDrnRMn6JVmOh0snKfg'
  };

  var queryArr = [];
  var keys = Object.keys(params);
  var values = Object.values(params);
  for (var i = 0; i < keys.length; i += 1) {
    queryArr.push(keys[i] + '=' + values[i]);
  }

  query = queryArr.join('&');
  var opt = {
    method: 'GET'
  };

  function getVideo(idStr, next) {
    var queryVideo = 'key=' + params.key + '&id=' + idStr + '&part=snippet,statistics';
    var url = 'https://www.googleapis.com/youtube/v3/videos?' + queryVideo;
    var nPage = Math.floor(16 / (0, _youtubeApp.countVideo)());

    function showGallery(videos) {
      videos.items.forEach(function (item) {
        (0, _youtubeApp.showVideo)(item);
      });
      (0, _pagination.showPaging)(nPage, next, 1);
    }

    _xhr2.default.httpRequest(url, opt, showGallery);
  }

  var url = 'https://www.googleapis.com/youtube/v3/search?' + query;

  function getSearch(videos) {
    var next = '';
    var idStr = '';
    next = videos.nextPageToken;
    videos.items.forEach(function (item) {
      idStr = '' + idStr + item.id.videoId + ',';
    });
    getVideo(idStr, next);
  }

  _xhr2.default.httpRequest(url, opt, getSearch);
}

exports.default = { request: request };

/***/ }),

/***/ "./src/xhr.js":
/*!********************!*\
  !*** ./src/xhr.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function httpRequest(url, options, func) {
  fetch(url, options).then(function (response) {
    return response.json();
  }).then(function (videos) {
    func(videos);
  }).catch(function (error) {
    document.write("There has been a problem with request: " + error.message);
  });
}

exports.default = { httpRequest: httpRequest };

/***/ }),

/***/ "./src/youtubeApp.js":
/*!***************************!*\
  !*** ./src/youtubeApp.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function countVideo() {
  var galery = document.querySelector('.galery');
  var width = galery.offsetWidth;
  return Math.floor(width / 300);
}

function showVideo(item) {
  var galery = document.querySelector('.galery');
  var width = galery.offsetWidth;
  var count = countVideo();

  var divVideo = document.createElement('div');
  divVideo.className = 'video';
  divVideo.style.minWidth = width / count - 66 + 'px';
  galery.appendChild(divVideo);

  var img = document.createElement('img');
  img.src = item.snippet.thumbnails.medium.url;
  img.alt = item.snippet.title;
  divVideo.appendChild(img);

  var videoTitle = document.createElement('h2');
  videoTitle.className = 'title';
  var href = 'https://www.youtube.com/watch?v=' + item.id;
  videoTitle.innerHTML = '<a target="_blank" href="' + href + '">' + item.snippet.title + '</a>';
  divVideo.appendChild(videoTitle);

  var author = document.createElement('p');
  author.className = 'author';
  author.innerHTML = '<i class="fa fa-user"></i>' + item.snippet.channelTitle;
  divVideo.appendChild(author);

  var publishDate = document.createElement('p');
  publishDate.className = 'date';
  publishDate.innerHTML = '<i class="fa fa-calendar"></i>' + item.snippet.publishedAt.slice(0, 10);
  divVideo.appendChild(publishDate);

  var viewRate = document.createElement('p');
  viewRate.className = 'viewRate';
  viewRate.innerHTML = '<i class="fa fa-eye"></i>' + item.statistics.viewCount;
  divVideo.appendChild(viewRate);

  var description = document.createElement('p');
  description.className = 'description';
  description.innerHTML = item.snippet.description;
  divVideo.appendChild(description);
}

exports.showVideo = showVideo;
exports.countVideo = countVideo;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9uZXh0UmVzdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyUGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMveGhyLmpzIiwid2VicGFjazovLy8uL3NyYy95b3V0dWJlQXBwLmpzIl0sIm5hbWVzIjpbInJlcXVlc3QiLCJnYWxlcnkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ3aWR0aCIsIm9mZnNldFdpZHRoIiwibiIsIk1hdGgiLCJmbG9vciIsInJlc2l6ZVRocm90dGxlciIsIm5ld04iLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwic2hvd05leHQiLCJuZXh0IiwicXVlcnkiLCJ2YWx1ZSIsInBhcmFtcyIsInR5cGUiLCJwYXJ0IiwicSIsImVuY29kZVVSSUNvbXBvbmVudCIsIm1heFJlc3VsdHMiLCJwYWdlVG9rZW4iLCJrZXkiLCJxdWVyeUFyciIsImtleXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJpIiwibGVuZ3RoIiwicHVzaCIsImpvaW4iLCJvcHQiLCJtZXRob2QiLCJnZXRWaWRlbyIsImlkU3RyIiwibmV4dFJlcyIsInF1ZXJ5VmlkZW8iLCJ1cmwiLCJuUGFnZSIsIm5leHRWaWRlb3MiLCJ2aWRlb3MiLCJpdGVtcyIsImZvckVhY2giLCJpdGVtIiwiaHR0cFJlcXVlc3QiLCJuZXh0TmV4dCIsImdldFNlYXJjaE5leHQiLCJuZXh0UGFnZVRva2VuIiwiaWQiLCJ2aWRlb0lkIiwic2hvd1BhZ2luZyIsImNvdW50IiwiYWN0aXZlIiwicGFnaW5hdGlvbiIsImlubmVySFRNTCIsInN0eWxlIiwidHJhbnNmb3JtIiwicGFnTGkiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiYXBwZW5kQ2hpbGQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJjaGFuZ2VWaWRlbyIsIm5ld1BhZ2UiLCJjaGFuZ2VQYWdlIiwidGFyZ2V0IiwiY2hpbGRyZW4iLCJlbGVtZW50IiwiY29udGFpbnMiLCJyZW1vdmUiLCJoYXNBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJmaXJzdENoaWxkIiwibGFzdENoaWxkIiwicHJldmlvdXNTaWJsaW5nIiwibmV4dFNpYmxpbmciLCJjaGlsZEVsZW1lbnRDb3VudCIsInN3aXBlIiwieDEiLCJ4MiIsInkiLCJhY3RpdmVMaSIsIm51bWJlciIsIk51bWJlciIsImZpcnN0IiwiY29vcmRzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicmlnaHQiLCJsZWZ0IiwidG9wIiwiYm90dG9tIiwic2V0UGFnaW5nQWN0aW9uIiwiZSIsIm5vZGVOYW1lIiwicHJldmVudERlZmF1bHQiLCJjaGFuZ2VkVG91Y2hlcyIsInNldE1vdXNlU3dpcGVBY3Rpb24iLCJ5MSIsInBhZ2VYIiwicGFnZVkiLCJzZXRUb3VjaFN3aXBlQWN0aW9uIiwidG91Y2hlcyIsImNsaWVudFgiLCJjbGllbnRZIiwiYWN0dWFsUmVzaXplIiwib2xkTiIsImFjdGl2ZVZpZGVvIiwibmV3QWN0aXZlIiwiY2VpbCIsIm5leHRQYWdlIiwiaW5wdXQiLCJidXR0b24iLCJyZW5kZXJQYWdlIiwid3JhcHBlciIsImJvZHkiLCJoZWFkZXIiLCJmb3JtIiwicGxhY2Vob2xkZXIiLCJzZWN0aW9uIiwiZm9vdGVyIiwic2V0U2VhcmNoQWN0aW9uIiwiZnVuYyIsImtleUNvZGUiLCJibHVyIiwicXVlcnlTdHIiLCJzaG93R2FsbGVyeSIsImdldFNlYXJjaCIsIm9wdGlvbnMiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjYXRjaCIsImVycm9yIiwid3JpdGUiLCJtZXNzYWdlIiwiY291bnRWaWRlbyIsInNob3dWaWRlbyIsImRpdlZpZGVvIiwibWluV2lkdGgiLCJpbWciLCJzcmMiLCJzbmlwcGV0IiwidGh1bWJuYWlscyIsIm1lZGl1bSIsImFsdCIsInRpdGxlIiwidmlkZW9UaXRsZSIsImhyZWYiLCJhdXRob3IiLCJjaGFubmVsVGl0bGUiLCJwdWJsaXNoRGF0ZSIsInB1Ymxpc2hlZEF0Iiwic2xpY2UiLCJ2aWV3UmF0ZSIsInN0YXRpc3RpY3MiLCJ2aWV3Q291bnQiLCJkZXNjcmlwdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBOztBQUNBOzs7O0FBQ0E7Ozs7QUFJQTtBQUNBLGlDQUFnQkEsa0JBQVFBLE9BQXhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1DLFNBQVNDLFNBQVNDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBZjtBQUNBLElBQUlDLFFBQVFILE9BQU9JLFdBQW5CO0FBQ0EsSUFBSUMsSUFBSUMsS0FBS0MsS0FBTCxDQUFXSixRQUFRLEdBQW5CLENBQVI7O0FBRUEs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QUF6RDtBQUNBZixXQUFTakYsV0FBVCxDQUFxQjhGLFdBQXJCOztBQUVBLE1BQU1HLFdBQVc3SixTQUFTMEQsYUFBVCxDQUF1QixHQUF2QixDQUFqQjtBQUNBbUcsV0FBU2xHLFNBQVQsR0FBcUIsVUFBckI7QUFDQWtHLFdBQVN2RyxTQUFULGlDQUFpRFgsS0FBS21ILFVBQUwsQ0FBZ0JDLFNBQWpFO0FBQ0FsQixXQUFTakYsV0FBVCxDQUFxQmlHLFFBQXJCOztBQUVBLE1BQU1HLGNBQWNoSyxTQUFTMEQsYUFBVCxDQUF1QixHQUF2QixDQUFwQjtBQUNBc0csY0FBWXJHLFNBQVosR0FBd0IsYUFBeEI7QUFDQXFHLGNBQVkxRyxTQUFaLEdBQXdCWCxLQUFLc0csT0FBTCxDQUFhZSxXQUFyQztBQUNBbkIsV0FBU2pGLFdBQVQsQ0FBcUJvRyxXQUFyQjtBQUNEOztRQUVRcEIsUyxHQUFBQSxTO1FBQVdELFUsR0FBQUEsVSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCB7IHJlbmRlclBhZ2UsIHNldFNlYXJjaEFjdGlvbiB9IGZyb20gJy4vcmVuZGVyUGFnZSc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgc2V0UGFnaW5nQWN0aW9uLCBzZXRNb3VzZVN3aXBlQWN0aW9uLCBzZXRUb3VjaFN3aXBlQWN0aW9uLCBhY3R1YWxSZXNpemUsXG59IGZyb20gJy4vcGFnaW5hdGlvbic7XG5cbnJlbmRlclBhZ2UoKTtcbnNldFNlYXJjaEFjdGlvbihyZXF1ZXN0LnJlcXVlc3QpO1xuc2V0UGFnaW5nQWN0aW9uKCk7XG5zZXRNb3VzZVN3aXBlQWN0aW9uKCk7XG5zZXRUb3VjaFN3aXBlQWN0aW9uKCk7XG5cbmNvbnN0IGdhbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxlcnknKTtcbmxldCB3aWR0aCA9IGdhbGVyeS5vZmZzZXRXaWR0aDtcbmxldCBuID0gTWF0aC5mbG9vcih3aWR0aCAvIDMwMCk7XG5cbmZ1bmN0aW9uIHJlc2l6ZVRocm90dGxlcigpIHtcbiAgd2lkdGggPSBnYWxlcnkub2Zmc2V0V2lkdGg7XG4gIGNvbnN0IG5ld04gPSBNYXRoLmZsb29yKHdpZHRoIC8gMzAwKTtcbiAgaWYgKG5ld04gIT09IG4pIHtcbiAgICBhY3R1YWxSZXNpemUobik7XG4gICAgbiA9IG5ld047XG4gIH1cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZVRocm90dGxlciwgZmFsc2UpO1xuIiwiaW1wb3J0IHsgc2hvd1ZpZGVvLCBjb3VudFZpZGVvIH0gZnJvbSAnLi95b3V0dWJlQXBwJztcbmltcG9ydCB7IG5leHRQYWdlIH0gZnJvbSAnLi9wYWdpbmF0aW9uJztcbmltcG9ydCBodHRwUmVxdWVzdCBmcm9tICcuL3hocic7XG5cbmZ1bmN0aW9uIHNob3dOZXh0KG5leHQpIHtcbiAgbGV0IHF1ZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaCcpLnZhbHVlO1xuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgdHlwZTogJ3ZpZGVvJyxcbiAgICBwYXJ0OiAnc25pcHBldCcsXG4gICAgcTogZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KSxcbiAgICBtYXhSZXN1bHRzOiAxNixcbiAgICBwYWdlVG9rZW46IG5leHQsXG4gICAga2V5OiAnQUl6YVN5QWtkMEJZeHNHWlFQbmR6RHJuUk1uNkpWbU9oMHNuS2ZnJyxcbiAgfTtcblxuICBjb25zdCBxdWVyeUFyciA9IFtdO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocGFyYW1zKTtcbiAgY29uc3QgdmFsdWVzID0gT2JqZWN0LnZhbHVlcyhwYXJhbXMpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBxdWVyeUFyci5wdXNoKGAke2tleXNbaV19PSR7dmFsdWVzW2ldfWApO1xuICB9XG5cbiAgcXVlcnkgPSBxdWVyeUFyci5qb2luKCcmJyk7XG4gIGNvbnN0IG9wdCA9IHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICB9O1xuXG4gIGZ1bmN0aW9uIGdldFZpZGVvKGlkU3RyLCBuZXh0UmVzKSB7XG4gICAgY29uc3QgcXVlcnlWaWRlbyA9IGBrZXk9JHtwYXJhbXMua2V5fSZpZD0ke2lkU3RyfSZwYXJ0PXNuaXBwZXQsc3RhdGlzdGljc2A7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvdmlkZW9zPyR7cXVlcnlWaWRlb31gO1xuICAgIGNvbnN0IG5QYWdlID0gTWF0aC5mbG9vcigxNiAvIGNvdW50VmlkZW8oKSk7XG5cbiAgICBmdW5jdGlvbiBuZXh0VmlkZW9zKHZpZGVvcykge1xuICAgICAgdmlkZW9zLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgc2hvd1ZpZGVvKGl0ZW0pO1xuICAgICAgfSk7XG4gICAgICBuZXh0UGFnZShuUGFnZSwgbmV4dFJlcyk7XG4gICAgfVxuXG4gICAgaHR0cFJlcXVlc3QuaHR0cFJlcXVlc3QodXJsLCBvcHQsIG5leHRWaWRlb3MpO1xuICB9XG5cbiAgbGV0IG5leHROZXh0ID0gJyc7XG4gIGNvbnN0IHVybCA9IGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3NlYXJjaD8ke3F1ZXJ5fWA7XG5cbiAgZnVuY3Rpb24gZ2V0U2VhcmNoTmV4dCh2aWRlb3MpIHtcbiAgICBsZXQgaWRTdHIgPSAnJztcbiAgICBuZXh0TmV4dCA9IHZpZGVvcy5uZXh0UGFnZVRva2VuO1xuICAgIHZpZGVvcy5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZFN0ciA9IGAke2lkU3RyfSR7aXRlbS5pZC52aWRlb0lkfSxgO1xuICAgIH0pO1xuICAgIGdldFZpZGVvKGlkU3RyLCBuZXh0TmV4dCk7XG4gIH1cblxuICBodHRwUmVxdWVzdC5odHRwUmVxdWVzdCh1cmwsIG9wdCwgZ2V0U2VhcmNoTmV4dCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgc2hvd05leHQgfTtcbiIsImltcG9ydCBzaG93TmV4dCBmcm9tICcuL25leHRSZXN1bHRzJzsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuZnVuY3Rpb24gc2hvd1BhZ2luZyhjb3VudCwgbmV4dCwgYWN0aXZlKSB7XG4gIGNvbnN0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xuICBwYWdpbmF0aW9uLmlubmVySFRNTCA9ICcnO1xuICBjb25zdCBnYWxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsZXJ5Jyk7XG4gIGdhbGVyeS5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSc7XG4gIGdhbGVyeS5zdHlsZVsndHJhbnNpdGlvbi1kdXJhdGlvbiddID0gJzBzJztcbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gY291bnQ7IGkgKz0gMSkge1xuICAgIGNvbnN0IHBhZ0xpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBwYWdMaS5jbGFzc05hbWUgPSAncGFnZU51bWJlcic7XG4gICAgcGFnaW5hdGlvbi5hcHBlbmRDaGlsZChwYWdMaSk7XG4gICAgcGFnTGkuaW5uZXJIVE1MID0gaTtcbiAgICBpZiAoaSAhPT0gMSAmJiBpICE9PSBjb3VudCkge1xuICAgICAgaWYgKGkgPiBhY3RpdmUgKyAyIHx8IGkgPCBhY3RpdmUgLSAxKSBwYWdMaS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG4gICAgaWYgKGkgPT09IGFjdGl2ZSkge1xuICAgICAgcGFnTGkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxuICAgIGlmIChpID09PSBjb3VudCkge1xuICAgICAgcGFnTGkuc2V0QXR0cmlidXRlKCdkYXRhLW5leHQnLCBuZXh0KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hhbmdlVmlkZW8obmV3UGFnZSkge1xuICBjb25zdCBnYWxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsZXJ5Jyk7XG4gIGNvbnN0IHdpZHRoID0gZ2FsZXJ5Lm9mZnNldFdpZHRoO1xuICBnYWxlcnkuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7d2lkdGggKiAobmV3UGFnZSAtIDEpfXB4KWA7XG4gIGdhbGVyeS5zdHlsZVsndHJhbnNpdGlvbi1kdXJhdGlvbiddID0gJzFzJztcbn1cblxuZnVuY3Rpb24gY2hhbmdlUGFnZSh0YXJnZXQpIHtcbiAgY29uc3QgcGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uJyk7XG4gIHBhZ2luYXRpb24uY2hpbGRyZW4uZm9yRWFjaCA9IFtdLmZvckVhY2g7XG4gIHBhZ2luYXRpb24uY2hpbGRyZW4uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgfVxuICB9KTtcbiAgaWYgKHRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbmV4dCcpKSB7XG4gICAgY29uc3QgbmV4dCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbmV4dCcpO1xuICAgIHNob3dOZXh0LnNob3dOZXh0KG5leHQpO1xuICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtbmV4dCcpO1xuICB9XG4gIHBhZ2luYXRpb24uY2hpbGRyZW4uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgIGlmIChlbGVtZW50ID09PSBwYWdpbmF0aW9uLmZpcnN0Q2hpbGQgfHwgZWxlbWVudCA9PT0gcGFnaW5hdGlvbi5sYXN0Q2hpbGRcbiAgICAgIHx8IGVsZW1lbnQgPT09IHRhcmdldC5wcmV2aW91c1NpYmxpbmcgfHwgZWxlbWVudCA9PT0gdGFyZ2V0XG4gICAgICB8fCBlbGVtZW50ID09PSB0YXJnZXQubmV4dFNpYmxpbmcpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgfSBlbHNlIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gIH0pO1xuICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gIGlmICh0YXJnZXQgPT09IHBhZ2luYXRpb24uZmlyc3RDaGlsZCkge1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcGFnaW5hdGlvbi5jaGlsZEVsZW1lbnRDb3VudDsgaSArPSAxKSB7XG4gICAgICBpZiAoaSA8IDQgJiYgcGFnaW5hdGlvbi5jaGlsZHJlbltpXS5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGRlbicpKSB7XG4gICAgICAgIHBhZ2luYXRpb24uY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICB9IGVsc2UgaWYgKGkgPj0gNCAmJiBwYWdpbmF0aW9uLmNoaWxkcmVuW2ldICE9PSBwYWdpbmF0aW9uLmxhc3RDaGlsZCkge1xuICAgICAgICBwYWdpbmF0aW9uLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAodGFyZ2V0LnByZXZpb3VzU2libGluZ1xuICAgICYmIHRhcmdldC5wcmV2aW91c1NpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSkge1xuICAgIHRhcmdldC5wcmV2aW91c1NpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gIH1cbiAgaWYgKHRhcmdldC5uZXh0U2libGluZyAmJiB0YXJnZXQubmV4dFNpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSkge1xuICAgIHRhcmdldC5uZXh0U2libGluZy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzd2lwZSh4MSwgeDIsIHkpIHtcbiAgY29uc3QgZ2FsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKTtcbiAgY29uc3QgYWN0aXZlTGkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk7XG4gIGNvbnN0IG51bWJlciA9IE51bWJlcihhY3RpdmVMaS5pbm5lckhUTUwpO1xuICBjb25zdCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24nKTtcbiAgY29uc3QgZmlyc3QgPSBOdW1iZXIocGFnaW5hdGlvbi5maXJzdENoaWxkLmlubmVySFRNTCk7XG4gIGNvbnN0IGNvb3JkcyA9IGdhbGVyeS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgaWYgKHgxIDw9IGNvb3Jkcy5yaWdodCAmJiB4MSA+PSBjb29yZHMubGVmdCAmJiB5ID49IGNvb3Jkcy50b3AgJiYgeSA8PSBjb29yZHMuYm90dG9tKSB7XG4gICAgaWYgKHgxIC0geDIgPiAzMCkge1xuICAgICAgY2hhbmdlVmlkZW8obnVtYmVyICsgMSk7XG4gICAgICBjb25zdCB0YXJnZXQgPSBhY3RpdmVMaS5uZXh0U2libGluZztcbiAgICAgIGNoYW5nZVBhZ2UodGFyZ2V0KTtcbiAgICB9XG4gICAgaWYgKHgyIC0geDEgPiAzMCAmJiBudW1iZXIgIT09IGZpcnN0KSB7XG4gICAgICBjaGFuZ2VWaWRlbyhudW1iZXIgLSAxKTtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGFjdGl2ZUxpLnByZXZpb3VzU2libGluZztcbiAgICAgIGNoYW5nZVBhZ2UodGFyZ2V0KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0UGFnaW5nQWN0aW9uKCkge1xuICBjb25zdCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24nKTtcbiAgcGFnaW5hdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0Lm5vZGVOYW1lID09PSAnTEknKSB7XG4gICAgICBjaGFuZ2VWaWRlbyhOdW1iZXIoZS50YXJnZXQuaW5uZXJIVE1MKSk7XG4gICAgICBjaGFuZ2VQYWdlKGUudGFyZ2V0KTtcbiAgICB9XG4gIH0pO1xuICBwYWdpbmF0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGUuY2hhbmdlZFRvdWNoZXNbMF0udGFyZ2V0Lm5vZGVOYW1lID09PSAnTEknKSB7XG4gICAgICBjaGFuZ2VWaWRlbyhOdW1iZXIoZS5jaGFuZ2VkVG91Y2hlc1swXS50YXJnZXQuaW5uZXJIVE1MKSk7XG4gICAgICBjaGFuZ2VQYWdlKGUuY2hhbmdlZFRvdWNoZXNbMF0udGFyZ2V0KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRNb3VzZVN3aXBlQWN0aW9uKCkge1xuICBjb25zdCBnYWxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xuICBsZXQgeDEgPSAwO1xuICBsZXQgeTEgPSAwO1xuICBnYWxlcnkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgeDEgPSBlLnBhZ2VYO1xuICAgIHkxID0gZS5wYWdlWTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xuICBnYWxlcnkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHgyID0gZS5wYWdlWDtcbiAgICBzd2lwZSh4MSwgeDIsIHkxKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldFRvdWNoU3dpcGVBY3Rpb24oKSB7XG4gIGNvbnN0IGdhbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJyk7XG4gIGxldCB4MSA9IDA7XG4gIGxldCB5MSA9IDA7XG4gIGdhbGVyeS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgeDEgPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICB5MSA9IGUudG91Y2hlc1swXS5jbGllbnRZO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG4gIGdhbGVyeS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHgyID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYO1xuICAgIHN3aXBlKHgxLCB4MiwgeTEpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWN0dWFsUmVzaXplKG9sZE4pIHtcbiAgY29uc3QgZ2FsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGVyeScpO1xuICBjb25zdCB3aWR0aCA9IGdhbGVyeS5vZmZzZXRXaWR0aDtcbiAgY29uc3QgbiA9IE1hdGguZmxvb3Iod2lkdGggLyAzMDApO1xuICBjb25zdCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24nKTtcbiAgY29uc3QgblBhZ2UgPSBOdW1iZXIoZ2FsZXJ5LmNoaWxkRWxlbWVudENvdW50KTtcbiAgY29uc3QgbmV3TiA9IE1hdGguZmxvb3IoblBhZ2UgLyBuKTtcbiAgbGV0IG5leHQgPSAnJztcbiAgbGV0IGFjdGl2ZSA9ICcnO1xuICBwYWdpbmF0aW9uLmNoaWxkcmVuLmZvckVhY2ggPSBbXS5mb3JFYWNoO1xuICBwYWdpbmF0aW9uLmNoaWxkcmVuLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbmV4dCcpKSB7XG4gICAgICBuZXh0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbmV4dCcpO1xuICAgIH1cbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICBhY3RpdmUgPSBOdW1iZXIoZWxlbWVudC5pbm5lckhUTUwpO1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IGFjdGl2ZVZpZGVvID0gb2xkTiAqIChhY3RpdmUgLSAxKSArIDE7XG4gIGxldCBuZXdBY3RpdmUgPSAwO1xuICBpZiAoYWN0aXZlVmlkZW8gPCBuKSB7XG4gICAgbmV3QWN0aXZlID0gYWN0aXZlVmlkZW87XG4gIH0gZWxzZSB7XG4gICAgbmV3QWN0aXZlID0gTWF0aC5jZWlsKGFjdGl2ZVZpZGVvIC8gbik7XG4gIH1cbiAgc2hvd1BhZ2luZyhuZXdOLCBuZXh0LCBuZXdBY3RpdmUpO1xuICBnYWxlcnkuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7d2lkdGggKiAobmV3QWN0aXZlIC0gMSl9cHgpYDtcbiAgZ2FsZXJ5LnN0eWxlWyd0cmFuc2l0aW9uLWR1cmF0aW9uJ10gPSAnMHMnO1xufVxuXG5mdW5jdGlvbiBuZXh0UGFnZShjb3VudCwgbmV4dE5leHQpIHtcbiAgY29uc3QgcGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uJyk7XG4gIGNvbnN0IGFjdGl2ZUxpID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpO1xuICBjb25zdCBudW1iZXIgPSBOdW1iZXIoYWN0aXZlTGkuaW5uZXJIVE1MKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gY291bnQ7IGkgKz0gMSkge1xuICAgIGNvbnN0IHBhZ0xpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBwYWdMaS5jbGFzc05hbWUgPSAncGFnZU51bWJlcic7XG4gICAgcGFnaW5hdGlvbi5hcHBlbmRDaGlsZChwYWdMaSk7XG4gICAgcGFnTGkuaW5uZXJIVE1MID0gbnVtYmVyICsgaTtcbiAgICBpZiAoaSA9PT0gY291bnQpIHtcbiAgICAgIHBhZ0xpLnNldEF0dHJpYnV0ZSgnZGF0YS1uZXh0JywgbmV4dE5leHQpO1xuICAgIH1cbiAgICBpZiAoaSAhPT0gMSAmJiBpICE9PSBjb3VudCkge1xuICAgICAgcGFnTGkuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7XG4gIHNob3dQYWdpbmcsIHNldFBhZ2luZ0FjdGlvbiwgbmV4dFBhZ2UsIHNldE1vdXNlU3dpcGVBY3Rpb24sIGFjdHVhbFJlc2l6ZSwgc2V0VG91Y2hTd2lwZUFjdGlvbixcbn07XG4iLCJsZXQgaW5wdXQ7XG5sZXQgYnV0dG9uO1xuXG5mdW5jdGlvbiByZW5kZXJQYWdlKCkge1xuICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnd3JhcHBlcicpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHdyYXBwZXIpO1xuXG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICB3cmFwcGVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBmb3JtLmNsYXNzTGlzdC5hZGQoJ3NlYXJjaC1mb3JtJyk7XG4gIGhlYWRlci5hcHBlbmRDaGlsZChmb3JtKTtcblxuICBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGlucHV0LmNsYXNzTGlzdC5hZGQoJ3NlYXJjaCcpO1xuICBpbnB1dC5wbGFjZWhvbGRlciA9ICdTZWFyY2guLi4nO1xuICBmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcblxuICBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bi1zZWFyY2gnKTtcbiAgYnV0dG9uLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhIGZhLXNlYXJjaFwiPjwvaT4nO1xuICBmb3JtLmFwcGVuZENoaWxkKGJ1dHRvbik7XG5cbiAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgc2VjdGlvbi5jbGFzc05hbWUgPSAnbWFpbic7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VjdGlvbik7XG5cbiAgY29uc3QgZ2FsZXJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGdhbGVyeS5jbGFzc05hbWUgPSAnZ2FsZXJ5JztcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChnYWxlcnkpO1xuXG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpO1xuICBmb290ZXIuY2xhc3NOYW1lID0gJ2Zvb3Rlcic7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcblxuICBjb25zdCBwYWdpbmF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgcGFnaW5hdGlvbi5jbGFzc05hbWUgPSAncGFnaW5hdGlvbic7XG4gIGZvb3Rlci5hcHBlbmRDaGlsZChwYWdpbmF0aW9uKTtcbn1cblxuZnVuY3Rpb24gc2V0U2VhcmNoQWN0aW9uKGZ1bmMpIHtcbiAgY29uc3QgZ2FsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGVyeScpO1xuICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgIGdhbGVyeS5pbm5lckhUTUwgPSAnJztcbiAgICAgIGZ1bmMoaW5wdXQudmFsdWUpO1xuICAgICAgaW5wdXQuYmx1cigpO1xuICAgIH1cbiAgfSk7XG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBnYWxlcnkuaW5uZXJIVE1MID0gJyc7XG4gICAgZnVuYyhpbnB1dC52YWx1ZSk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBzZXRTZWFyY2hBY3Rpb24sIHJlbmRlclBhZ2UgfTtcbiIsImltcG9ydCB7IHNob3dWaWRlbywgY291bnRWaWRlbyB9IGZyb20gJy4veW91dHViZUFwcCc7XG5pbXBvcnQgeyBzaG93UGFnaW5nIH0gZnJvbSAnLi9wYWdpbmF0aW9uJztcbmltcG9ydCBodHRwUmVxdWVzdCBmcm9tICcuL3hocic7XG5cbmZ1bmN0aW9uIHJlcXVlc3QocXVlcnlTdHIpIHtcbiAgbGV0IHF1ZXJ5ID0gcXVlcnlTdHI7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICB0eXBlOiAndmlkZW8nLFxuICAgIHBhcnQ6ICdzbmlwcGV0JyxcbiAgICBxOiBlbmNvZGVVUklDb21wb25lbnQocXVlcnkpLFxuICAgIG1heFJlc3VsdHM6IDE2LFxuICAgIGtleTogJ0FJemFTeUFrZDBCWXhzR1pRUG5kekRyblJNbjZKVm1PaDBzbktmZycsXG4gIH07XG5cbiAgY29uc3QgcXVlcnlBcnIgPSBbXTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHBhcmFtcyk7XG4gIGNvbnN0IHZhbHVlcyA9IE9iamVjdC52YWx1ZXMocGFyYW1zKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgcXVlcnlBcnIucHVzaChgJHtrZXlzW2ldfT0ke3ZhbHVlc1tpXX1gKTtcbiAgfVxuXG4gIHF1ZXJ5ID0gcXVlcnlBcnIuam9pbignJicpO1xuICBjb25zdCBvcHQgPSB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgfTtcblxuICBmdW5jdGlvbiBnZXRWaWRlbyhpZFN0ciwgbmV4dCkge1xuICAgIGNvbnN0IHF1ZXJ5VmlkZW8gPSBga2V5PSR7cGFyYW1zLmtleX0maWQ9JHtpZFN0cn0mcGFydD1zbmlwcGV0LHN0YXRpc3RpY3NgO1xuICAgIGNvbnN0IHVybCA9IGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3ZpZGVvcz8ke3F1ZXJ5VmlkZW99YDtcbiAgICBjb25zdCBuUGFnZSA9IE1hdGguZmxvb3IoMTYgLyBjb3VudFZpZGVvKCkpO1xuXG4gICAgZnVuY3Rpb24gc2hvd0dhbGxlcnkodmlkZW9zKSB7XG4gICAgICB2aWRlb3MuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBzaG93VmlkZW8oaXRlbSk7XG4gICAgICB9KTtcbiAgICAgIHNob3dQYWdpbmcoblBhZ2UsIG5leHQsIDEpO1xuICAgIH1cblxuICAgIGh0dHBSZXF1ZXN0Lmh0dHBSZXF1ZXN0KHVybCwgb3B0LCBzaG93R2FsbGVyeSk7XG4gIH1cblxuICBjb25zdCB1cmwgPSBgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My9zZWFyY2g/JHtxdWVyeX1gO1xuXG4gIGZ1bmN0aW9uIGdldFNlYXJjaCh2aWRlb3MpIHtcbiAgICBsZXQgbmV4dCA9ICcnO1xuICAgIGxldCBpZFN0ciA9ICcnO1xuICAgIG5leHQgPSB2aWRlb3MubmV4dFBhZ2VUb2tlbjtcbiAgICB2aWRlb3MuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWRTdHIgPSBgJHtpZFN0cn0ke2l0ZW0uaWQudmlkZW9JZH0sYDtcbiAgICB9KTtcbiAgICBnZXRWaWRlbyhpZFN0ciwgbmV4dCk7XG4gIH1cblxuICBodHRwUmVxdWVzdC5odHRwUmVxdWVzdCh1cmwsIG9wdCwgZ2V0U2VhcmNoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyByZXF1ZXN0IH07XG4iLCJmdW5jdGlvbiBodHRwUmVxdWVzdCh1cmwsIG9wdGlvbnMsIGZ1bmMpIHtcbiAgZmV0Y2godXJsLCBvcHRpb25zKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbigodmlkZW9zKSA9PiB7XG4gICAgICBmdW5jKHZpZGVvcyk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBkb2N1bWVudC53cml0ZShgVGhlcmUgaGFzIGJlZW4gYSBwcm9ibGVtIHdpdGggcmVxdWVzdDogJHtlcnJvci5tZXNzYWdlfWApO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IGh0dHBSZXF1ZXN0IH07XG4iLCJmdW5jdGlvbiBjb3VudFZpZGVvKCkge1xuICBjb25zdCBnYWxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsZXJ5Jyk7XG4gIGNvbnN0IHdpZHRoID0gZ2FsZXJ5Lm9mZnNldFdpZHRoO1xuICByZXR1cm4gTWF0aC5mbG9vcih3aWR0aCAvIDMwMCk7XG59XG5cbmZ1bmN0aW9uIHNob3dWaWRlbyhpdGVtKSB7XG4gIGNvbnN0IGdhbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxlcnknKTtcbiAgY29uc3Qgd2lkdGggPSBnYWxlcnkub2Zmc2V0V2lkdGg7XG4gIGNvbnN0IGNvdW50ID0gY291bnRWaWRlbygpO1xuXG4gIGNvbnN0IGRpdlZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdlZpZGVvLmNsYXNzTmFtZSA9ICd2aWRlbyc7XG4gIGRpdlZpZGVvLnN0eWxlLm1pbldpZHRoID0gYCR7d2lkdGggLyBjb3VudCAtIDY2fXB4YDtcbiAgZ2FsZXJ5LmFwcGVuZENoaWxkKGRpdlZpZGVvKTtcblxuICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgaW1nLnNyYyA9IGl0ZW0uc25pcHBldC50aHVtYm5haWxzLm1lZGl1bS51cmw7XG4gIGltZy5hbHQgPSBpdGVtLnNuaXBwZXQudGl0bGU7XG4gIGRpdlZpZGVvLmFwcGVuZENoaWxkKGltZyk7XG5cbiAgY29uc3QgdmlkZW9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gIHZpZGVvVGl0bGUuY2xhc3NOYW1lID0gJ3RpdGxlJztcbiAgY29uc3QgaHJlZiA9IGBodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PSR7aXRlbS5pZH1gO1xuICB2aWRlb1RpdGxlLmlubmVySFRNTCA9IGA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiJHtocmVmfVwiPiR7aXRlbS5zbmlwcGV0LnRpdGxlfTwvYT5gO1xuICBkaXZWaWRlby5hcHBlbmRDaGlsZCh2aWRlb1RpdGxlKTtcblxuICBjb25zdCBhdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIGF1dGhvci5jbGFzc05hbWUgPSAnYXV0aG9yJztcbiAgYXV0aG9yLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhIGZhLXVzZXJcIj48L2k+JHtpdGVtLnNuaXBwZXQuY2hhbm5lbFRpdGxlfWA7XG4gIGRpdlZpZGVvLmFwcGVuZENoaWxkKGF1dGhvcik7XG5cbiAgY29uc3QgcHVibGlzaERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHB1Ymxpc2hEYXRlLmNsYXNzTmFtZSA9ICdkYXRlJztcbiAgcHVibGlzaERhdGUuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXJcIj48L2k+JHtpdGVtLnNuaXBwZXQucHVibGlzaGVkQXQuc2xpY2UoMCwgMTApfWA7XG4gIGRpdlZpZGVvLmFwcGVuZENoaWxkKHB1Ymxpc2hEYXRlKTtcblxuICBjb25zdCB2aWV3UmF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgdmlld1JhdGUuY2xhc3NOYW1lID0gJ3ZpZXdSYXRlJztcbiAgdmlld1JhdGUuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEgZmEtZXllXCI+PC9pPiR7aXRlbS5zdGF0aXN0aWNzLnZpZXdDb3VudH1gO1xuICBkaXZWaWRlby5hcHBlbmRDaGlsZCh2aWV3UmF0ZSk7XG5cbiAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIGRlc2NyaXB0aW9uLmNsYXNzTmFtZSA9ICdkZXNjcmlwdGlvbic7XG4gIGRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGl0ZW0uc25pcHBldC5kZXNjcmlwdGlvbjtcbiAgZGl2VmlkZW8uYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xufVxuXG5leHBvcnQgeyBzaG93VmlkZW8sIGNvdW50VmlkZW8gfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=