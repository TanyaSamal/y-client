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
} // eslint-disable-line
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
  activeLi.classList.remove('active');
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
    if (i > count / 2 && i !== count) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9uZXh0UmVzdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyUGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMveGhyLmpzIiwid2VicGFjazovLy8uL3NyYy95b3V0dWJlQXBwLmpzIl0sIm5hbWVzIjpbInJlcXVlc3QiLCJnYWxlcnkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ3aWR0aCIsIm9mZnNldFdpZHRoIiwibiIsIk1hdGgiLCJmbG9vciIsInJlc2l6ZVRocm90dGxlciIsIm5ld04iLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwic2hvd05leHQiLCJuZXh0IiwicXVlcnkiLCJ2YWx1ZSIsInBhcmFtcyIsInR5cGUiLCJwYXJ0IiwicSIsImVuY29kZVVSSUNvbXBvbmVudCIsIm1heFJlc3VsdHMiLCJwYWdlVG9rZW4iLCJrZXkiLCJxdWVyeUFyciIsImtleXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJpIiwibGVuZ3RoIiwicHVzaCIsImpvaW4iLCJvcHQiLCJtZXRob2QiLCJnZXRWaWRlbyIsImlkU3RyIiwibmV4dFJlcyIsInF1ZXJ5VmlkZW8iLCJ1cmwiLCJuUGFnZSIsIm5leHRWaWRlb3MiLCJ2aWRlb3MiLCJpdGVtcyIsImZvckVhY2giLCJpdGVtIiwiaHR0cFJlcXVlc3QiLCJuZXh0TmV4dCIsImdldFNlYXJjaE5leHQiLCJuZXh0UGFnZVRva2VuIiwiaWQiLCJ2aWRlb0lkIiwic2hvd1BhZ2luZyIsImNvdW50IiwiYWN0aXZlIiwicGFnaW5hdGlvbiIsImlubmVySFRNTCIsInN0eWxlIiwidHJhbnNmb3JtIiwicGFnTGkiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiYXBwZW5kQ2hpbGQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJjaGFuZ2VWaWRlbyIsIm5ld1BhZ2UiLCJjaGFuZ2VQYWdlIiwidGFyZ2V0IiwiY2hpbGRyZW4iLCJlbGVtZW50IiwiY29udGFpbnMiLCJyZW1vdmUiLCJoYXNBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJmaXJzdENoaWxkIiwibGFzdENoaWxkIiwicHJldmlvdXNTaWJsaW5nIiwibmV4dFNpYmxpbmciLCJjaGlsZEVsZW1lbnRDb3VudCIsInN3aXBlIiwieDEiLCJ4MiIsInkiLCJhY3RpdmVMaSIsIm51bWJlciIsIk51bWJlciIsImZpcnN0IiwiY29vcmRzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicmlnaHQiLCJsZWZ0IiwidG9wIiwiYm90dG9tIiwic2V0UGFnaW5nQWN0aW9uIiwiZSIsIm5vZGVOYW1lIiwic2V0TW91c2VTd2lwZUFjdGlvbiIsInkxIiwicHJldmVudERlZmF1bHQiLCJwYWdlWCIsInBhZ2VZIiwic2V0VG91Y2hTd2lwZUFjdGlvbiIsInRvdWNoZXMiLCJjbGllbnRYIiwiY2xpZW50WSIsImNoYW5nZWRUb3VjaGVzIiwiYWN0dWFsUmVzaXplIiwib2xkTiIsImFjdGl2ZVZpZGVvIiwibmV3QWN0aXZlIiwiY2VpbCIsIm5leHRQYWdlIiwiaW5wdXQiLCJidXR0b24iLCJyZW5kZXJQYWdlIiwid3JhcHBlciIsImJvZHkiLCJoZWFkZXIiLCJmb3JtIiwicGxhY2Vob2xkZXIiLCJzZWN0aW9uIiwiZm9vdGVyIiwic2V0U2VhcmNoQWN0aW9uIiwiZnVuYyIsImtleUNvZGUiLCJibHVyIiwicXVlcnlTdHIiLCJzaG93R2FsbGVyeSIsImdldFNlYXJjaCIsIm9wdGlvbnMiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjYXRjaCIsImVycm9yIiwid3JpdGUiLCJtZXNzYWdlIiwiY291bnRWaWRlbyIsInNob3dWaWRlbyIsImRpdlZpZGVvIiwibWluV2lkdGgiLCJpbWciLCJzcmMiLCJzbmlwcGV0IiwidGh1bWJuYWlscyIsIm1lZGl1bSIsImFsdCIsInRpdGxlIiwidmlkZW9UaXRsZSIsImhyZWYiLCJhdXRob3IiLCJjaGFubmVsVGl0bGUiLCJwdWJsaXNoRGF0ZSIsInB1Ymxpc2hlZEF0Iiwic2xpY2UiLCJ2aWV3UmF0ZSIsInN0YXRpc3RpY3MiLCJ2aWV3Q291bnQiLCJkZXNjcmlwdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBOztBQUNBOzs7O0FBQ0E7Ozs7QUFJQTtBQUNBLGlDQUFnQkEsa0JBQVFBLE9BQXhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1DLFNBQVNDLFNBQVNDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBZjtBQUNBLElBQUlDLFFBQVFILE9BQU9JLFdBQW5CO0FBQ0EsSUFBSUMsSUFBSUMsS0FBS0MsS0FBTCxDQUFXSixRQUFRLEdBQW5CLENBQVI7O0FBRUEs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VCxDQUF1QixHQUF2QixDQUFwQjtBQUNBc0csY0FBWXJHLFNBQVosR0FBd0IsYUFBeEI7QUFDQXFHLGNBQVkxRyxTQUFaLEdBQXdCWCxLQUFLc0csT0FBTCxDQUFhZSxXQUFyQztBQUNBbkIsV0FBU2pGLFdBQVQsQ0FBcUJvRyxXQUFyQjtBQUNEOztRQUVRcEIsUyxHQUFBQSxTO1FBQVdELFUsR0FBQUEsVSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCB7IHJlbmRlclBhZ2UsIHNldFNlYXJjaEFjdGlvbiB9IGZyb20gJy4vcmVuZGVyUGFnZSc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgc2V0UGFnaW5nQWN0aW9uLCBzZXRNb3VzZVN3aXBlQWN0aW9uLCBzZXRUb3VjaFN3aXBlQWN0aW9uLCBhY3R1YWxSZXNpemUsXG59IGZyb20gJy4vcGFnaW5hdGlvbic7XG5cbnJlbmRlclBhZ2UoKTtcbnNldFNlYXJjaEFjdGlvbihyZXF1ZXN0LnJlcXVlc3QpO1xuc2V0UGFnaW5nQWN0aW9uKCk7XG5zZXRNb3VzZVN3aXBlQWN0aW9uKCk7XG5zZXRUb3VjaFN3aXBlQWN0aW9uKCk7XG5cbmNvbnN0IGdhbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxlcnknKTtcbmxldCB3aWR0aCA9IGdhbGVyeS5vZmZzZXRXaWR0aDtcbmxldCBuID0gTWF0aC5mbG9vcih3aWR0aCAvIDMwMCk7XG5cbmZ1bmN0aW9uIHJlc2l6ZVRocm90dGxlcigpIHtcbiAgd2lkdGggPSBnYWxlcnkub2Zmc2V0V2lkdGg7XG4gIGNvbnN0IG5ld04gPSBNYXRoLmZsb29yKHdpZHRoIC8gMzAwKTtcbiAgaWYgKG5ld04gIT09IG4pIHtcbiAgICBhY3R1YWxSZXNpemUobik7XG4gICAgbiA9IG5ld047XG4gIH1cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZVRocm90dGxlciwgZmFsc2UpO1xuIiwiaW1wb3J0IHsgc2hvd1ZpZGVvLCBjb3VudFZpZGVvIH0gZnJvbSAnLi95b3V0dWJlQXBwJztcbmltcG9ydCB7IG5leHRQYWdlIH0gZnJvbSAnLi9wYWdpbmF0aW9uJzsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbmltcG9ydCBodHRwUmVxdWVzdCBmcm9tICcuL3hocic7XG5cbmZ1bmN0aW9uIHNob3dOZXh0KG5leHQpIHtcbiAgbGV0IHF1ZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaCcpLnZhbHVlO1xuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgdHlwZTogJ3ZpZGVvJyxcbiAgICBwYXJ0OiAnc25pcHBldCcsXG4gICAgcTogZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KSxcbiAgICBtYXhSZXN1bHRzOiAxNixcbiAgICBwYWdlVG9rZW46IG5leHQsXG4gICAga2V5OiAnQUl6YVN5QWtkMEJZeHNHWlFQbmR6RHJuUk1uNkpWbU9oMHNuS2ZnJyxcbiAgfTtcblxuICBjb25zdCBxdWVyeUFyciA9IFtdO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocGFyYW1zKTtcbiAgY29uc3QgdmFsdWVzID0gT2JqZWN0LnZhbHVlcyhwYXJhbXMpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBxdWVyeUFyci5wdXNoKGAke2tleXNbaV19PSR7dmFsdWVzW2ldfWApO1xuICB9XG5cbiAgcXVlcnkgPSBxdWVyeUFyci5qb2luKCcmJyk7XG4gIGNvbnN0IG9wdCA9IHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICB9O1xuXG4gIGZ1bmN0aW9uIGdldFZpZGVvKGlkU3RyLCBuZXh0UmVzKSB7XG4gICAgY29uc3QgcXVlcnlWaWRlbyA9IGBrZXk9JHtwYXJhbXMua2V5fSZpZD0ke2lkU3RyfSZwYXJ0PXNuaXBwZXQsc3RhdGlzdGljc2A7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvdmlkZW9zPyR7cXVlcnlWaWRlb31gO1xuICAgIGNvbnN0IG5QYWdlID0gTWF0aC5mbG9vcigxNiAvIGNvdW50VmlkZW8oKSk7XG5cbiAgICBmdW5jdGlvbiBuZXh0VmlkZW9zKHZpZGVvcykge1xuICAgICAgdmlkZW9zLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgc2hvd1ZpZGVvKGl0ZW0pO1xuICAgICAgfSk7XG4gICAgICBuZXh0UGFnZShuUGFnZSwgbmV4dFJlcyk7XG4gICAgfVxuXG4gICAgaHR0cFJlcXVlc3QuaHR0cFJlcXVlc3QodXJsLCBvcHQsIG5leHRWaWRlb3MpO1xuICB9XG5cbiAgbGV0IG5leHROZXh0ID0gJyc7XG4gIGNvbnN0IHVybCA9IGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3NlYXJjaD8ke3F1ZXJ5fWA7XG5cbiAgZnVuY3Rpb24gZ2V0U2VhcmNoTmV4dCh2aWRlb3MpIHtcbiAgICBsZXQgaWRTdHIgPSAnJztcbiAgICBuZXh0TmV4dCA9IHZpZGVvcy5uZXh0UGFnZVRva2VuO1xuICAgIHZpZGVvcy5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZFN0ciA9IGAke2lkU3RyfSR7aXRlbS5pZC52aWRlb0lkfSxgO1xuICAgIH0pO1xuICAgIGdldFZpZGVvKGlkU3RyLCBuZXh0TmV4dCk7XG4gIH1cblxuICBodHRwUmVxdWVzdC5odHRwUmVxdWVzdCh1cmwsIG9wdCwgZ2V0U2VhcmNoTmV4dCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgc2hvd05leHQgfTtcbiIsImltcG9ydCBzaG93TmV4dCBmcm9tICcuL25leHRSZXN1bHRzJzsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuZnVuY3Rpb24gc2hvd1BhZ2luZyhjb3VudCwgbmV4dCwgYWN0aXZlKSB7XG4gIGNvbnN0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xuICBwYWdpbmF0aW9uLmlubmVySFRNTCA9ICcnO1xuICBjb25zdCBnYWxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsZXJ5Jyk7XG4gIGdhbGVyeS5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSc7XG4gIGdhbGVyeS5zdHlsZVsndHJhbnNpdGlvbi1kdXJhdGlvbiddID0gJzBzJztcbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gY291bnQ7IGkgKz0gMSkge1xuICAgIGNvbnN0IHBhZ0xpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBwYWdMaS5jbGFzc05hbWUgPSAncGFnZU51bWJlcic7XG4gICAgcGFnaW5hdGlvbi5hcHBlbmRDaGlsZChwYWdMaSk7XG4gICAgcGFnTGkuaW5uZXJIVE1MID0gaTtcbiAgICBpZiAoaSAhPT0gMSAmJiBpICE9PSBjb3VudCkge1xuICAgICAgaWYgKGkgPiBhY3RpdmUgKyAyIHx8IGkgPCBhY3RpdmUgLSAxKSBwYWdMaS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG4gICAgaWYgKGkgPT09IGFjdGl2ZSkge1xuICAgICAgcGFnTGkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxuICAgIGlmIChpID09PSBjb3VudCkge1xuICAgICAgcGFnTGkuc2V0QXR0cmlidXRlKCdkYXRhLW5leHQnLCBuZXh0KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hhbmdlVmlkZW8obmV3UGFnZSkge1xuICBjb25zdCBnYWxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsZXJ5Jyk7XG4gIGNvbnN0IHdpZHRoID0gZ2FsZXJ5Lm9mZnNldFdpZHRoO1xuICBnYWxlcnkuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7d2lkdGggKiAobmV3UGFnZSAtIDEpfXB4KWA7XG4gIGdhbGVyeS5zdHlsZVsndHJhbnNpdGlvbi1kdXJhdGlvbiddID0gJzFzJztcbn1cblxuZnVuY3Rpb24gY2hhbmdlUGFnZSh0YXJnZXQpIHtcbiAgY29uc3QgcGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uJyk7XG4gIHBhZ2luYXRpb24uY2hpbGRyZW4uZm9yRWFjaCA9IFtdLmZvckVhY2g7XG4gIHBhZ2luYXRpb24uY2hpbGRyZW4uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgfVxuICB9KTtcbiAgaWYgKHRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbmV4dCcpKSB7XG4gICAgY29uc3QgbmV4dCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbmV4dCcpO1xuICAgIHNob3dOZXh0LnNob3dOZXh0KG5leHQpO1xuICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtbmV4dCcpO1xuICB9XG4gIHBhZ2luYXRpb24uY2hpbGRyZW4uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgIGlmIChlbGVtZW50ID09PSBwYWdpbmF0aW9uLmZpcnN0Q2hpbGQgfHwgZWxlbWVudCA9PT0gcGFnaW5hdGlvbi5sYXN0Q2hpbGRcbiAgICAgIHx8IGVsZW1lbnQgPT09IHRhcmdldC5wcmV2aW91c1NpYmxpbmcgfHwgZWxlbWVudCA9PT0gdGFyZ2V0XG4gICAgICB8fCBlbGVtZW50ID09PSB0YXJnZXQubmV4dFNpYmxpbmcpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgfSBlbHNlIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gIH0pO1xuICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gIGlmICh0YXJnZXQgPT09IHBhZ2luYXRpb24uZmlyc3RDaGlsZCkge1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcGFnaW5hdGlvbi5jaGlsZEVsZW1lbnRDb3VudDsgaSArPSAxKSB7XG4gICAgICBpZiAoaSA8IDQgJiYgcGFnaW5hdGlvbi5jaGlsZHJlbltpXS5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGRlbicpKSB7XG4gICAgICAgIHBhZ2luYXRpb24uY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICB9IGVsc2UgaWYgKGkgPj0gNCAmJiBwYWdpbmF0aW9uLmNoaWxkcmVuW2ldICE9PSBwYWdpbmF0aW9uLmxhc3RDaGlsZCkge1xuICAgICAgICBwYWdpbmF0aW9uLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAodGFyZ2V0LnByZXZpb3VzU2libGluZ1xuICAgICYmIHRhcmdldC5wcmV2aW91c1NpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSkge1xuICAgIHRhcmdldC5wcmV2aW91c1NpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gIH1cbiAgaWYgKHRhcmdldC5uZXh0U2libGluZyAmJiB0YXJnZXQubmV4dFNpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSkge1xuICAgIHRhcmdldC5uZXh0U2libGluZy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzd2lwZSh4MSwgeDIsIHkpIHtcbiAgY29uc3QgZ2FsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKTtcbiAgY29uc3QgYWN0aXZlTGkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk7XG4gIGNvbnN0IG51bWJlciA9IE51bWJlcihhY3RpdmVMaS5pbm5lckhUTUwpO1xuICBjb25zdCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24nKTtcbiAgY29uc3QgZmlyc3QgPSBOdW1iZXIocGFnaW5hdGlvbi5maXJzdENoaWxkLmlubmVySFRNTCk7XG4gIGNvbnN0IGNvb3JkcyA9IGdhbGVyeS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgYWN0aXZlTGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gIGlmICh4MSA8PSBjb29yZHMucmlnaHQgJiYgeDEgPj0gY29vcmRzLmxlZnQgJiYgeSA+PSBjb29yZHMudG9wICYmIHkgPD0gY29vcmRzLmJvdHRvbSkge1xuICAgIGlmICh4MSAtIHgyID4gMzApIHtcbiAgICAgIGNoYW5nZVZpZGVvKG51bWJlciArIDEpO1xuICAgICAgY29uc3QgdGFyZ2V0ID0gYWN0aXZlTGkubmV4dFNpYmxpbmc7XG4gICAgICBjaGFuZ2VQYWdlKHRhcmdldCk7XG4gICAgfVxuICAgIGlmICh4MiAtIHgxID4gMzAgJiYgbnVtYmVyICE9PSBmaXJzdCkge1xuICAgICAgY2hhbmdlVmlkZW8obnVtYmVyIC0gMSk7XG4gICAgICBjb25zdCB0YXJnZXQgPSBhY3RpdmVMaS5wcmV2aW91c1NpYmxpbmc7XG4gICAgICBjaGFuZ2VQYWdlKHRhcmdldCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNldFBhZ2luZ0FjdGlvbigpIHtcbiAgY29uc3QgcGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uJyk7XG4gIHBhZ2luYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5ub2RlTmFtZSA9PT0gJ0xJJykge1xuICAgICAgY2hhbmdlVmlkZW8oTnVtYmVyKGUudGFyZ2V0LmlubmVySFRNTCkpO1xuICAgICAgY2hhbmdlUGFnZShlLnRhcmdldCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0TW91c2VTd2lwZUFjdGlvbigpIHtcbiAgY29uc3QgZ2FsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKTtcbiAgbGV0IHgxID0gMDtcbiAgbGV0IHkxID0gMDtcbiAgZ2FsZXJ5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHgxID0gZS5wYWdlWDtcbiAgICB5MSA9IGUucGFnZVk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbiAgZ2FsZXJ5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB4MiA9IGUucGFnZVg7XG4gICAgc3dpcGUoeDEsIHgyLCB5MSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRUb3VjaFN3aXBlQWN0aW9uKCkge1xuICBjb25zdCBnYWxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xuICBsZXQgeDEgPSAwO1xuICBsZXQgeTEgPSAwO1xuICBnYWxlcnkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHgxID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgeTEgPSBlLnRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xuICBnYWxlcnkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB4MiA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICBzd2lwZSh4MSwgeDIsIHkxKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFjdHVhbFJlc2l6ZShvbGROKSB7XG4gIGNvbnN0IGdhbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxlcnknKTtcbiAgY29uc3Qgd2lkdGggPSBnYWxlcnkub2Zmc2V0V2lkdGg7XG4gIGNvbnN0IG4gPSBNYXRoLmZsb29yKHdpZHRoIC8gMzAwKTtcbiAgY29uc3QgcGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uJyk7XG4gIGNvbnN0IG5QYWdlID0gTnVtYmVyKGdhbGVyeS5jaGlsZEVsZW1lbnRDb3VudCk7XG4gIGNvbnN0IG5ld04gPSBNYXRoLmZsb29yKG5QYWdlIC8gbik7XG4gIGxldCBuZXh0ID0gJyc7XG4gIGxldCBhY3RpdmUgPSAnJztcbiAgcGFnaW5hdGlvbi5jaGlsZHJlbi5mb3JFYWNoID0gW10uZm9yRWFjaDtcbiAgcGFnaW5hdGlvbi5jaGlsZHJlbi5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRhLW5leHQnKSkge1xuICAgICAgbmV4dCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW5leHQnKTtcbiAgICB9XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgYWN0aXZlID0gTnVtYmVyKGVsZW1lbnQuaW5uZXJIVE1MKTtcbiAgICB9XG4gIH0pO1xuICBjb25zdCBhY3RpdmVWaWRlbyA9IG9sZE4gKiAoYWN0aXZlIC0gMSkgKyAxO1xuICBsZXQgbmV3QWN0aXZlID0gMDtcbiAgaWYgKGFjdGl2ZVZpZGVvIDwgbikge1xuICAgIG5ld0FjdGl2ZSA9IGFjdGl2ZVZpZGVvO1xuICB9IGVsc2Uge1xuICAgIG5ld0FjdGl2ZSA9IE1hdGguY2VpbChhY3RpdmVWaWRlbyAvIG4pO1xuICB9XG4gIHNob3dQYWdpbmcobmV3TiwgbmV4dCwgbmV3QWN0aXZlKTtcbiAgZ2FsZXJ5LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke3dpZHRoICogKG5ld0FjdGl2ZSAtIDEpfXB4KWA7XG4gIGdhbGVyeS5zdHlsZVsndHJhbnNpdGlvbi1kdXJhdGlvbiddID0gJzBzJztcbn1cblxuZnVuY3Rpb24gbmV4dFBhZ2UoY291bnQsIG5leHROZXh0KSB7XG4gIGNvbnN0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xuICBjb25zdCBhY3RpdmVMaSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKTtcbiAgY29uc3QgbnVtYmVyID0gTnVtYmVyKGFjdGl2ZUxpLmlubmVySFRNTCk7XG4gIGZvciAobGV0IGkgPSAxOyBpIDw9IGNvdW50OyBpICs9IDEpIHtcbiAgICBjb25zdCBwYWdMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgcGFnTGkuY2xhc3NOYW1lID0gJ3BhZ2VOdW1iZXInO1xuICAgIHBhZ2luYXRpb24uYXBwZW5kQ2hpbGQocGFnTGkpO1xuICAgIHBhZ0xpLmlubmVySFRNTCA9IG51bWJlciArIGk7XG4gICAgaWYgKGkgPT09IGNvdW50KSB7XG4gICAgICBwYWdMaS5zZXRBdHRyaWJ1dGUoJ2RhdGEtbmV4dCcsIG5leHROZXh0KTtcbiAgICB9XG4gICAgaWYgKGkgPiBjb3VudCAvIDIgJiYgaSAhPT0gY291bnQpIHtcbiAgICAgIHBhZ0xpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQge1xuICBzaG93UGFnaW5nLCBzZXRQYWdpbmdBY3Rpb24sIG5leHRQYWdlLCBzZXRNb3VzZVN3aXBlQWN0aW9uLCBhY3R1YWxSZXNpemUsIHNldFRvdWNoU3dpcGVBY3Rpb24sXG59O1xuIiwibGV0IGlucHV0O1xubGV0IGJ1dHRvbjtcblxuZnVuY3Rpb24gcmVuZGVyUGFnZSgpIHtcbiAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3dyYXBwZXInKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcblxuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgd3JhcHBlci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZm9ybS5jbGFzc0xpc3QuYWRkKCdzZWFyY2gtZm9ybScpO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBpbnB1dC5jbGFzc0xpc3QuYWRkKCdzZWFyY2gnKTtcbiAgaW5wdXQucGxhY2Vob2xkZXIgPSAnU2VhcmNoLi4uJztcbiAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG5cbiAgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4tc2VhcmNoJyk7XG4gIGJ1dHRvbi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYSBmYS1zZWFyY2hcIj48L2k+JztcbiAgZm9ybS5hcHBlbmRDaGlsZChidXR0b24pO1xuXG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gIHNlY3Rpb24uY2xhc3NOYW1lID0gJ21haW4nO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuXG4gIGNvbnN0IGdhbGVyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBnYWxlcnkuY2xhc3NOYW1lID0gJ2dhbGVyeSc7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoZ2FsZXJ5KTtcblxuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb290ZXInKTtcbiAgZm9vdGVyLmNsYXNzTmFtZSA9ICdmb290ZXInO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XG5cbiAgY29uc3QgcGFnaW5hdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIHBhZ2luYXRpb24uY2xhc3NOYW1lID0gJ3BhZ2luYXRpb24nO1xuICBmb290ZXIuYXBwZW5kQ2hpbGQocGFnaW5hdGlvbik7XG59XG5cbmZ1bmN0aW9uIHNldFNlYXJjaEFjdGlvbihmdW5jKSB7XG4gIGNvbnN0IGdhbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxlcnknKTtcbiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICBnYWxlcnkuaW5uZXJIVE1MID0gJyc7XG4gICAgICBmdW5jKGlucHV0LnZhbHVlKTtcbiAgICAgIGlucHV0LmJsdXIoKTtcbiAgICB9XG4gIH0pO1xuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZ2FsZXJ5LmlubmVySFRNTCA9ICcnO1xuICAgIGZ1bmMoaW5wdXQudmFsdWUpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgc2V0U2VhcmNoQWN0aW9uLCByZW5kZXJQYWdlIH07XG4iLCJpbXBvcnQgeyBzaG93VmlkZW8sIGNvdW50VmlkZW8gfSBmcm9tICcuL3lvdXR1YmVBcHAnO1xuaW1wb3J0IHsgc2hvd1BhZ2luZyB9IGZyb20gJy4vcGFnaW5hdGlvbic7XG5pbXBvcnQgaHR0cFJlcXVlc3QgZnJvbSAnLi94aHInO1xuXG5mdW5jdGlvbiByZXF1ZXN0KHF1ZXJ5U3RyKSB7XG4gIGxldCBxdWVyeSA9IHF1ZXJ5U3RyO1xuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgdHlwZTogJ3ZpZGVvJyxcbiAgICBwYXJ0OiAnc25pcHBldCcsXG4gICAgcTogZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KSxcbiAgICBtYXhSZXN1bHRzOiAxNixcbiAgICBrZXk6ICdBSXphU3lBa2QwQll4c0daUVBuZHpEcm5STW42SlZtT2gwc25LZmcnLFxuICB9O1xuXG4gIGNvbnN0IHF1ZXJ5QXJyID0gW107XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhwYXJhbXMpO1xuICBjb25zdCB2YWx1ZXMgPSBPYmplY3QudmFsdWVzKHBhcmFtcyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHF1ZXJ5QXJyLnB1c2goYCR7a2V5c1tpXX09JHt2YWx1ZXNbaV19YCk7XG4gIH1cblxuICBxdWVyeSA9IHF1ZXJ5QXJyLmpvaW4oJyYnKTtcbiAgY29uc3Qgb3B0ID0ge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gIH07XG5cbiAgZnVuY3Rpb24gZ2V0VmlkZW8oaWRTdHIsIG5leHQpIHtcbiAgICBjb25zdCBxdWVyeVZpZGVvID0gYGtleT0ke3BhcmFtcy5rZXl9JmlkPSR7aWRTdHJ9JnBhcnQ9c25pcHBldCxzdGF0aXN0aWNzYDtcbiAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My92aWRlb3M/JHtxdWVyeVZpZGVvfWA7XG4gICAgY29uc3QgblBhZ2UgPSBNYXRoLmZsb29yKDE2IC8gY291bnRWaWRlbygpKTtcblxuICAgIGZ1bmN0aW9uIHNob3dHYWxsZXJ5KHZpZGVvcykge1xuICAgICAgdmlkZW9zLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgc2hvd1ZpZGVvKGl0ZW0pO1xuICAgICAgfSk7XG4gICAgICBzaG93UGFnaW5nKG5QYWdlLCBuZXh0LCAxKTtcbiAgICB9XG5cbiAgICBodHRwUmVxdWVzdC5odHRwUmVxdWVzdCh1cmwsIG9wdCwgc2hvd0dhbGxlcnkpO1xuICB9XG5cbiAgY29uc3QgdXJsID0gYGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvc2VhcmNoPyR7cXVlcnl9YDtcblxuICBmdW5jdGlvbiBnZXRTZWFyY2godmlkZW9zKSB7XG4gICAgbGV0IG5leHQgPSAnJztcbiAgICBsZXQgaWRTdHIgPSAnJztcbiAgICBuZXh0ID0gdmlkZW9zLm5leHRQYWdlVG9rZW47XG4gICAgdmlkZW9zLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlkU3RyID0gYCR7aWRTdHJ9JHtpdGVtLmlkLnZpZGVvSWR9LGA7XG4gICAgfSk7XG4gICAgZ2V0VmlkZW8oaWRTdHIsIG5leHQpO1xuICB9XG5cbiAgaHR0cFJlcXVlc3QuaHR0cFJlcXVlc3QodXJsLCBvcHQsIGdldFNlYXJjaCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgcmVxdWVzdCB9O1xuIiwiZnVuY3Rpb24gaHR0cFJlcXVlc3QodXJsLCBvcHRpb25zLCBmdW5jKSB7XG4gIGZldGNoKHVybCwgb3B0aW9ucylcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKHZpZGVvcykgPT4ge1xuICAgICAgZnVuYyh2aWRlb3MpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgZG9jdW1lbnQud3JpdGUoYFRoZXJlIGhhcyBiZWVuIGEgcHJvYmxlbSB3aXRoIHJlcXVlc3Q6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBodHRwUmVxdWVzdCB9O1xuIiwiZnVuY3Rpb24gY291bnRWaWRlbygpIHtcbiAgY29uc3QgZ2FsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGVyeScpO1xuICBjb25zdCB3aWR0aCA9IGdhbGVyeS5vZmZzZXRXaWR0aDtcbiAgcmV0dXJuIE1hdGguZmxvb3Iod2lkdGggLyAzMDApO1xufVxuXG5mdW5jdGlvbiBzaG93VmlkZW8oaXRlbSkge1xuICBjb25zdCBnYWxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsZXJ5Jyk7XG4gIGNvbnN0IHdpZHRoID0gZ2FsZXJ5Lm9mZnNldFdpZHRoO1xuICBjb25zdCBjb3VudCA9IGNvdW50VmlkZW8oKTtcblxuICBjb25zdCBkaXZWaWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXZWaWRlby5jbGFzc05hbWUgPSAndmlkZW8nO1xuICBkaXZWaWRlby5zdHlsZS5taW5XaWR0aCA9IGAke3dpZHRoIC8gY291bnQgLSA2Nn1weGA7XG4gIGdhbGVyeS5hcHBlbmRDaGlsZChkaXZWaWRlbyk7XG5cbiAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIGltZy5zcmMgPSBpdGVtLnNuaXBwZXQudGh1bWJuYWlscy5tZWRpdW0udXJsO1xuICBpbWcuYWx0ID0gaXRlbS5zbmlwcGV0LnRpdGxlO1xuICBkaXZWaWRlby5hcHBlbmRDaGlsZChpbWcpO1xuXG4gIGNvbnN0IHZpZGVvVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICB2aWRlb1RpdGxlLmNsYXNzTmFtZSA9ICd0aXRsZSc7XG4gIGNvbnN0IGhyZWYgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj0ke2l0ZW0uaWR9YDtcbiAgdmlkZW9UaXRsZS5pbm5lckhUTUwgPSBgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cIiR7aHJlZn1cIj4ke2l0ZW0uc25pcHBldC50aXRsZX08L2E+YDtcbiAgZGl2VmlkZW8uYXBwZW5kQ2hpbGQodmlkZW9UaXRsZSk7XG5cbiAgY29uc3QgYXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBhdXRob3IuY2xhc3NOYW1lID0gJ2F1dGhvcic7XG4gIGF1dGhvci5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYSBmYS11c2VyXCI+PC9pPiR7aXRlbS5zbmlwcGV0LmNoYW5uZWxUaXRsZX1gO1xuICBkaXZWaWRlby5hcHBlbmRDaGlsZChhdXRob3IpO1xuXG4gIGNvbnN0IHB1Ymxpc2hEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBwdWJsaXNoRGF0ZS5jbGFzc05hbWUgPSAnZGF0ZSc7XG4gIHB1Ymxpc2hEYXRlLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhIGZhLWNhbGVuZGFyXCI+PC9pPiR7aXRlbS5zbmlwcGV0LnB1Ymxpc2hlZEF0LnNsaWNlKDAsIDEwKX1gO1xuICBkaXZWaWRlby5hcHBlbmRDaGlsZChwdWJsaXNoRGF0ZSk7XG5cbiAgY29uc3Qgdmlld1JhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHZpZXdSYXRlLmNsYXNzTmFtZSA9ICd2aWV3UmF0ZSc7XG4gIHZpZXdSYXRlLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhIGZhLWV5ZVwiPjwvaT4ke2l0ZW0uc3RhdGlzdGljcy52aWV3Q291bnR9YDtcbiAgZGl2VmlkZW8uYXBwZW5kQ2hpbGQodmlld1JhdGUpO1xuXG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBkZXNjcmlwdGlvbi5jbGFzc05hbWUgPSAnZGVzY3JpcHRpb24nO1xuICBkZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBpdGVtLnNuaXBwZXQuZGVzY3JpcHRpb247XG4gIGRpdlZpZGVvLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbn1cblxuZXhwb3J0IHsgc2hvd1ZpZGVvLCBjb3VudFZpZGVvIH07XG4iXSwic291cmNlUm9vdCI6IiJ9