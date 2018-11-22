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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9uZXh0UmVzdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyUGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMveGhyLmpzIiwid2VicGFjazovLy8uL3NyYy95b3V0dWJlQXBwLmpzIl0sIm5hbWVzIjpbInJlcXVlc3QiLCJnYWxlcnkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ3aWR0aCIsIm9mZnNldFdpZHRoIiwibiIsIk1hdGgiLCJmbG9vciIsInJlc2l6ZVRocm90dGxlciIsIm5ld04iLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwic2hvd05leHQiLCJuZXh0IiwicXVlcnkiLCJ2YWx1ZSIsInBhcmFtcyIsInR5cGUiLCJwYXJ0IiwicSIsImVuY29kZVVSSUNvbXBvbmVudCIsIm1heFJlc3VsdHMiLCJwYWdlVG9rZW4iLCJrZXkiLCJxdWVyeUFyciIsImtleXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJpIiwibGVuZ3RoIiwicHVzaCIsImpvaW4iLCJvcHQiLCJtZXRob2QiLCJnZXRWaWRlbyIsImlkU3RyIiwibmV4dFJlcyIsInF1ZXJ5VmlkZW8iLCJ1cmwiLCJuUGFnZSIsIm5leHRWaWRlb3MiLCJ2aWRlb3MiLCJpdGVtcyIsImZvckVhY2giLCJpdGVtIiwiaHR0cFJlcXVlc3QiLCJuZXh0TmV4dCIsImdldFNlYXJjaE5leHQiLCJuZXh0UGFnZVRva2VuIiwiaWQiLCJ2aWRlb0lkIiwic2hvd1BhZ2luZyIsImNvdW50IiwiYWN0aXZlIiwicGFnaW5hdGlvbiIsImlubmVySFRNTCIsInN0eWxlIiwidHJhbnNmb3JtIiwicGFnTGkiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiYXBwZW5kQ2hpbGQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJjaGFuZ2VWaWRlbyIsIm5ld1BhZ2UiLCJjaGFuZ2VQYWdlIiwidGFyZ2V0IiwiY2hpbGRyZW4iLCJlbGVtZW50IiwiY29udGFpbnMiLCJyZW1vdmUiLCJoYXNBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJmaXJzdENoaWxkIiwibGFzdENoaWxkIiwicHJldmlvdXNTaWJsaW5nIiwibmV4dFNpYmxpbmciLCJjaGlsZEVsZW1lbnRDb3VudCIsInN3aXBlIiwieDEiLCJ4MiIsInkiLCJhY3RpdmVMaSIsIm51bWJlciIsIk51bWJlciIsImZpcnN0IiwiY29vcmRzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicmlnaHQiLCJsZWZ0IiwidG9wIiwiYm90dG9tIiwic2V0UGFnaW5nQWN0aW9uIiwiZSIsIm5vZGVOYW1lIiwic2V0TW91c2VTd2lwZUFjdGlvbiIsInkxIiwicHJldmVudERlZmF1bHQiLCJwYWdlWCIsInBhZ2VZIiwic2V0VG91Y2hTd2lwZUFjdGlvbiIsInRvdWNoZXMiLCJjbGllbnRYIiwiY2xpZW50WSIsImNoYW5nZWRUb3VjaGVzIiwiYWN0dWFsUmVzaXplIiwib2xkTiIsImFjdGl2ZVZpZGVvIiwibmV3QWN0aXZlIiwiY2VpbCIsIm5leHRQYWdlIiwiaW5wdXQiLCJidXR0b24iLCJyZW5kZXJQYWdlIiwid3JhcHBlciIsImJvZHkiLCJoZWFkZXIiLCJmb3JtIiwicGxhY2Vob2xkZXIiLCJzZWN0aW9uIiwiZm9vdGVyIiwic2V0U2VhcmNoQWN0aW9uIiwiZnVuYyIsImtleUNvZGUiLCJxdWVyeVN0ciIsInNob3dHYWxsZXJ5IiwiZ2V0U2VhcmNoIiwib3B0aW9ucyIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImNhdGNoIiwiZXJyb3IiLCJ3cml0ZSIsIm1lc3NhZ2UiLCJjb3VudFZpZGVvIiwic2hvd1ZpZGVvIiwiZGl2VmlkZW8iLCJtaW5XaWR0aCIsImltZyIsInNyYyIsInNuaXBwZXQiLCJ0aHVtYm5haWxzIiwibWVkaXVtIiwiYWx0IiwidGl0bGUiLCJ2aWRlb1RpdGxlIiwiaHJlZiIsImF1dGhvciIsImNoYW5uZWxUaXRsZSIsInB1Ymxpc2hEYXRlIiwicHVibGlzaGVkQXQiLCJzbGljZSIsInZpZXdSYXRlIiwic3RhdGlzdGljcyIsInZpZXdDb3VudCIsImRlc2NyaXB0aW9uIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7O0FBQ0E7Ozs7QUFDQTs7OztBQUtBO0FBQ0EsaUNBQWdCQSxrQkFBUUEsT0FBeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUMsU0FBU0MsU0FBU0MsYUFBVCxDQUF1QixTQUF2QixDQUFmO0FBQ0EsSUFBSUMsUUFBUUgsT0FBT0ksV0FBbkI7QUFDQSxJQUFJQyxJQUFJQyxLQUFLQyxLQUFMLENBQVdKLFFBQVEsR0FBbkIsQ0FBUjs7QUFFQSxTQUFTSyxl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QVosR0FBd0JYLEtBQUtxRyxPQUFMLENBQWFlLFdBQXJDO0FBQ0FuQixXQUFTaEYsV0FBVCxDQUFxQm1HLFdBQXJCO0FBQ0Q7O1FBRVFwQixTLEdBQUFBLFM7UUFBV0QsVSxHQUFBQSxVIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHsgcmVuZGVyUGFnZSwgc2V0U2VhcmNoQWN0aW9uIH0gZnJvbSAnLi9yZW5kZXJQYWdlJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQge1xuICBzZXRQYWdpbmdBY3Rpb24sIHNldE1vdXNlU3dpcGVBY3Rpb24sIHNldFRvdWNoU3dpcGVBY3Rpb24sIGFjdHVhbFJlc2l6ZSxcbn0gZnJvbSAnLi9wYWdpbmF0aW9uJztcblxuXG5yZW5kZXJQYWdlKCk7XG5zZXRTZWFyY2hBY3Rpb24ocmVxdWVzdC5yZXF1ZXN0KTtcbnNldFBhZ2luZ0FjdGlvbigpO1xuc2V0TW91c2VTd2lwZUFjdGlvbigpO1xuc2V0VG91Y2hTd2lwZUFjdGlvbigpO1xuXG5jb25zdCBnYWxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsZXJ5Jyk7XG5sZXQgd2lkdGggPSBnYWxlcnkub2Zmc2V0V2lkdGg7XG5sZXQgbiA9IE1hdGguZmxvb3Iod2lkdGggLyAzMDApO1xuXG5mdW5jdGlvbiByZXNpemVUaHJvdHRsZXIoKSB7XG4gIHdpZHRoID0gZ2FsZXJ5Lm9mZnNldFdpZHRoO1xuICBjb25zdCBuZXdOID0gTWF0aC5mbG9vcih3aWR0aCAvIDMwMCk7XG4gIGlmIChuZXdOICE9PSBuKSB7XG4gICAgYWN0dWFsUmVzaXplKG4pO1xuICAgIG4gPSBuZXdOO1xuICB9XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVUaHJvdHRsZXIsIGZhbHNlKTtcbiIsImltcG9ydCB7IHNob3dWaWRlbywgY291bnRWaWRlbyB9IGZyb20gJy4veW91dHViZUFwcCc7XG5pbXBvcnQgeyBuZXh0UGFnZSB9IGZyb20gJy4vcGFnaW5hdGlvbic7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5pbXBvcnQgaHR0cFJlcXVlc3QgZnJvbSAnLi94aHInO1xuXG5mdW5jdGlvbiBzaG93TmV4dChuZXh0KSB7XG4gIGxldCBxdWVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gnKS52YWx1ZTtcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIHR5cGU6ICd2aWRlbycsXG4gICAgcGFydDogJ3NuaXBwZXQnLFxuICAgIHE6IGVuY29kZVVSSUNvbXBvbmVudChxdWVyeSksXG4gICAgbWF4UmVzdWx0czogMTYsXG4gICAgcGFnZVRva2VuOiBuZXh0LFxuICAgIGtleTogJ0FJemFTeUFrZDBCWXhzR1pRUG5kekRyblJNbjZKVm1PaDBzbktmZycsXG4gIH07XG5cbiAgY29uc3QgcXVlcnlBcnIgPSBbXTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHBhcmFtcyk7XG4gIGNvbnN0IHZhbHVlcyA9IE9iamVjdC52YWx1ZXMocGFyYW1zKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgcXVlcnlBcnIucHVzaChgJHtrZXlzW2ldfT0ke3ZhbHVlc1tpXX1gKTtcbiAgfVxuXG4gIHF1ZXJ5ID0gcXVlcnlBcnIuam9pbignJicpO1xuICBjb25zdCBvcHQgPSB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgfTtcblxuICBmdW5jdGlvbiBnZXRWaWRlbyhpZFN0ciwgbmV4dFJlcykge1xuICAgIGNvbnN0IHF1ZXJ5VmlkZW8gPSBga2V5PSR7cGFyYW1zLmtleX0maWQ9JHtpZFN0cn0mcGFydD1zbmlwcGV0LHN0YXRpc3RpY3NgO1xuICAgIGNvbnN0IHVybCA9IGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3ZpZGVvcz8ke3F1ZXJ5VmlkZW99YDtcbiAgICBjb25zdCBuUGFnZSA9IE1hdGguZmxvb3IoMTYgLyBjb3VudFZpZGVvKCkpO1xuXG4gICAgZnVuY3Rpb24gbmV4dFZpZGVvcyh2aWRlb3MpIHtcbiAgICAgIHZpZGVvcy5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHNob3dWaWRlbyhpdGVtKTtcbiAgICAgIH0pO1xuICAgICAgbmV4dFBhZ2UoblBhZ2UsIG5leHRSZXMpO1xuICAgIH1cblxuICAgIGh0dHBSZXF1ZXN0Lmh0dHBSZXF1ZXN0KHVybCwgb3B0LCBuZXh0VmlkZW9zKTtcbiAgfVxuXG4gIGxldCBuZXh0TmV4dCA9ICcnO1xuICBjb25zdCB1cmwgPSBgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My9zZWFyY2g/JHtxdWVyeX1gO1xuXG4gIGZ1bmN0aW9uIGdldFNlYXJjaE5leHQodmlkZW9zKSB7XG4gICAgbGV0IGlkU3RyID0gJyc7XG4gICAgbmV4dE5leHQgPSB2aWRlb3MubmV4dFBhZ2VUb2tlbjtcbiAgICB2aWRlb3MuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWRTdHIgPSBgJHtpZFN0cn0ke2l0ZW0uaWQudmlkZW9JZH0sYDtcbiAgICB9KTtcbiAgICBnZXRWaWRlbyhpZFN0ciwgbmV4dE5leHQpO1xuICB9XG5cbiAgaHR0cFJlcXVlc3QuaHR0cFJlcXVlc3QodXJsLCBvcHQsIGdldFNlYXJjaE5leHQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IHNob3dOZXh0IH07XG4iLCJpbXBvcnQgc2hvd05leHQgZnJvbSAnLi9uZXh0UmVzdWx0cyc7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbmZ1bmN0aW9uIHNob3dQYWdpbmcoY291bnQsIG5leHQsIGFjdGl2ZSkge1xuICBjb25zdCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24nKTtcbiAgcGFnaW5hdGlvbi5pbm5lckhUTUwgPSAnJztcbiAgY29uc3QgZ2FsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGVyeScpO1xuICBnYWxlcnkuc3R5bGUudHJhbnNmb3JtID0gJ25vbmUnO1xuICBnYWxlcnkuc3R5bGVbJ3RyYW5zaXRpb24tZHVyYXRpb24nXSA9ICcwcyc7XG4gIGZvciAobGV0IGkgPSAxOyBpIDw9IGNvdW50OyBpICs9IDEpIHtcbiAgICBjb25zdCBwYWdMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgcGFnTGkuY2xhc3NOYW1lID0gJ3BhZ2VOdW1iZXInO1xuICAgIHBhZ2luYXRpb24uYXBwZW5kQ2hpbGQocGFnTGkpO1xuICAgIHBhZ0xpLmlubmVySFRNTCA9IGk7XG4gICAgaWYgKGkgIT09IDEgJiYgaSAhPT0gY291bnQpIHtcbiAgICAgIGlmIChpID4gYWN0aXZlICsgMiB8fCBpIDwgYWN0aXZlIC0gMSkgcGFnTGkuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfVxuICAgIGlmIChpID09PSBhY3RpdmUpIHtcbiAgICAgIHBhZ0xpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cbiAgICBpZiAoaSA9PT0gY291bnQpIHtcbiAgICAgIHBhZ0xpLnNldEF0dHJpYnV0ZSgnZGF0YS1uZXh0JywgbmV4dCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNoYW5nZVZpZGVvKG5ld1BhZ2UpIHtcbiAgY29uc3QgZ2FsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGVyeScpO1xuICBjb25zdCB3aWR0aCA9IGdhbGVyeS5vZmZzZXRXaWR0aDtcbiAgZ2FsZXJ5LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke3dpZHRoICogKG5ld1BhZ2UgLSAxKX1weClgO1xuICBnYWxlcnkuc3R5bGVbJ3RyYW5zaXRpb24tZHVyYXRpb24nXSA9ICcxcyc7XG59XG5cbmZ1bmN0aW9uIGNoYW5nZVBhZ2UodGFyZ2V0KSB7XG4gIGNvbnN0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xuICBwYWdpbmF0aW9uLmNoaWxkcmVuLmZvckVhY2ggPSBbXS5mb3JFYWNoO1xuICBwYWdpbmF0aW9uLmNoaWxkcmVuLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH1cbiAgfSk7XG4gIGlmICh0YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLW5leHQnKSkge1xuICAgIGNvbnN0IG5leHQgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLW5leHQnKTtcbiAgICBzaG93TmV4dC5zaG93TmV4dChuZXh0KTtcbiAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLW5leHQnKTtcbiAgfVxuICBwYWdpbmF0aW9uLmNoaWxkcmVuLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICBpZiAoZWxlbWVudCA9PT0gcGFnaW5hdGlvbi5maXJzdENoaWxkIHx8IGVsZW1lbnQgPT09IHBhZ2luYXRpb24ubGFzdENoaWxkXG4gICAgICB8fCBlbGVtZW50ID09PSB0YXJnZXQucHJldmlvdXNTaWJsaW5nIHx8IGVsZW1lbnQgPT09IHRhcmdldFxuICAgICAgfHwgZWxlbWVudCA9PT0gdGFyZ2V0Lm5leHRTaWJsaW5nKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH0gZWxzZSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICB9KTtcbiAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICBpZiAodGFyZ2V0ID09PSBwYWdpbmF0aW9uLmZpcnN0Q2hpbGQpIHtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBhZ2luYXRpb24uY2hpbGRFbGVtZW50Q291bnQ7IGkgKz0gMSkge1xuICAgICAgaWYgKGkgPCA0ICYmIHBhZ2luYXRpb24uY2hpbGRyZW5baV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW4nKSkge1xuICAgICAgICBwYWdpbmF0aW9uLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgfSBlbHNlIGlmIChpID49IDQgJiYgcGFnaW5hdGlvbi5jaGlsZHJlbltpXSAhPT0gcGFnaW5hdGlvbi5sYXN0Q2hpbGQpIHtcbiAgICAgICAgcGFnaW5hdGlvbi5jaGlsZHJlbltpXS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHRhcmdldC5wcmV2aW91c1NpYmxpbmdcbiAgICAmJiB0YXJnZXQucHJldmlvdXNTaWJsaW5nLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJykpIHtcbiAgICB0YXJnZXQucHJldmlvdXNTaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICB9XG4gIGlmICh0YXJnZXQubmV4dFNpYmxpbmcgJiYgdGFyZ2V0Lm5leHRTaWJsaW5nLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJykpIHtcbiAgICB0YXJnZXQubmV4dFNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3dpcGUoeDEsIHgyLCB5KSB7XG4gIGNvbnN0IGdhbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJyk7XG4gIGNvbnN0IGFjdGl2ZUxpID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpO1xuICBjb25zdCBudW1iZXIgPSBOdW1iZXIoYWN0aXZlTGkuaW5uZXJIVE1MKTtcbiAgY29uc3QgcGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uJyk7XG4gIGNvbnN0IGZpcnN0ID0gTnVtYmVyKHBhZ2luYXRpb24uZmlyc3RDaGlsZC5pbm5lckhUTUwpO1xuICBjb25zdCBjb29yZHMgPSBnYWxlcnkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGlmICh4MSA8PSBjb29yZHMucmlnaHQgJiYgeDEgPj0gY29vcmRzLmxlZnQgJiYgeSA+PSBjb29yZHMudG9wICYmIHkgPD0gY29vcmRzLmJvdHRvbSkge1xuICAgIGlmICh4MSAtIHgyID4gMzApIHtcbiAgICAgIGNoYW5nZVZpZGVvKG51bWJlciArIDEpO1xuICAgICAgY29uc3QgdGFyZ2V0ID0gYWN0aXZlTGkubmV4dFNpYmxpbmc7XG4gICAgICBjaGFuZ2VQYWdlKHRhcmdldCk7XG4gICAgfVxuICAgIGlmICh4MiAtIHgxID4gMzAgJiYgbnVtYmVyICE9PSBmaXJzdCkge1xuICAgICAgY2hhbmdlVmlkZW8obnVtYmVyIC0gMSk7XG4gICAgICBjb25zdCB0YXJnZXQgPSBhY3RpdmVMaS5wcmV2aW91c1NpYmxpbmc7XG4gICAgICBjaGFuZ2VQYWdlKHRhcmdldCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNldFBhZ2luZ0FjdGlvbigpIHtcbiAgY29uc3QgcGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uJyk7XG4gIHBhZ2luYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5ub2RlTmFtZSA9PT0gJ0xJJykge1xuICAgICAgY2hhbmdlVmlkZW8oTnVtYmVyKGUudGFyZ2V0LmlubmVySFRNTCkpO1xuICAgICAgY2hhbmdlUGFnZShlLnRhcmdldCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0TW91c2VTd2lwZUFjdGlvbigpIHtcbiAgY29uc3QgZ2FsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKTtcbiAgbGV0IHgxID0gMDtcbiAgbGV0IHkxID0gMDtcbiAgZ2FsZXJ5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHgxID0gZS5wYWdlWDtcbiAgICB5MSA9IGUucGFnZVk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbiAgZ2FsZXJ5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB4MiA9IGUucGFnZVg7XG4gICAgc3dpcGUoeDEsIHgyLCB5MSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRUb3VjaFN3aXBlQWN0aW9uKCkge1xuICBjb25zdCBnYWxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xuICBsZXQgeDEgPSAwO1xuICBsZXQgeTEgPSAwO1xuICBnYWxlcnkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHgxID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgeTEgPSBlLnRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xuICBnYWxlcnkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB4MiA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICBzd2lwZSh4MSwgeDIsIHkxKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFjdHVhbFJlc2l6ZShvbGROKSB7XG4gIGNvbnN0IGdhbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxlcnknKTtcbiAgY29uc3Qgd2lkdGggPSBnYWxlcnkub2Zmc2V0V2lkdGg7XG4gIGNvbnN0IG4gPSBNYXRoLmZsb29yKHdpZHRoIC8gMzAwKTtcbiAgY29uc3QgcGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uJyk7XG4gIGNvbnN0IG5QYWdlID0gTnVtYmVyKGdhbGVyeS5jaGlsZEVsZW1lbnRDb3VudCk7XG4gIGNvbnN0IG5ld04gPSBNYXRoLmZsb29yKG5QYWdlIC8gbik7XG4gIGxldCBuZXh0ID0gJyc7XG4gIGxldCBhY3RpdmUgPSAnJztcbiAgcGFnaW5hdGlvbi5jaGlsZHJlbi5mb3JFYWNoID0gW10uZm9yRWFjaDtcbiAgcGFnaW5hdGlvbi5jaGlsZHJlbi5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRhLW5leHQnKSkge1xuICAgICAgbmV4dCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW5leHQnKTtcbiAgICB9XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgYWN0aXZlID0gTnVtYmVyKGVsZW1lbnQuaW5uZXJIVE1MKTtcbiAgICB9XG4gIH0pO1xuICBjb25zdCBhY3RpdmVWaWRlbyA9IG9sZE4gKiAoYWN0aXZlIC0gMSkgKyAxO1xuICBsZXQgbmV3QWN0aXZlID0gMDtcbiAgaWYgKGFjdGl2ZVZpZGVvIDwgbikge1xuICAgIG5ld0FjdGl2ZSA9IGFjdGl2ZVZpZGVvO1xuICB9IGVsc2Uge1xuICAgIG5ld0FjdGl2ZSA9IE1hdGguY2VpbChhY3RpdmVWaWRlbyAvIG4pO1xuICB9XG4gIHNob3dQYWdpbmcobmV3TiwgbmV4dCwgbmV3QWN0aXZlKTtcbiAgZ2FsZXJ5LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke3dpZHRoICogKG5ld0FjdGl2ZSAtIDEpfXB4KWA7XG4gIGdhbGVyeS5zdHlsZVsndHJhbnNpdGlvbi1kdXJhdGlvbiddID0gJzBzJztcbn1cblxuZnVuY3Rpb24gbmV4dFBhZ2UoY291bnQsIG5leHROZXh0KSB7XG4gIGNvbnN0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xuICBjb25zdCBhY3RpdmVMaSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKTtcbiAgY29uc3QgbnVtYmVyID0gTnVtYmVyKGFjdGl2ZUxpLmlubmVySFRNTCk7XG4gIGZvciAobGV0IGkgPSAxOyBpIDw9IGNvdW50OyBpICs9IDEpIHtcbiAgICBjb25zdCBwYWdMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgcGFnTGkuY2xhc3NOYW1lID0gJ3BhZ2VOdW1iZXInO1xuICAgIHBhZ2luYXRpb24uYXBwZW5kQ2hpbGQocGFnTGkpO1xuICAgIHBhZ0xpLmlubmVySFRNTCA9IG51bWJlciArIGk7XG4gICAgaWYgKGkgPT09IGNvdW50KSB7XG4gICAgICBwYWdMaS5zZXRBdHRyaWJ1dGUoJ2RhdGEtbmV4dCcsIG5leHROZXh0KTtcbiAgICB9XG4gICAgaWYgKGkgPiBjb3VudCAvIDIgJiYgaSAhPT0gY291bnQpIHtcbiAgICAgIHBhZ0xpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQge1xuICBzaG93UGFnaW5nLCBzZXRQYWdpbmdBY3Rpb24sIG5leHRQYWdlLCBzZXRNb3VzZVN3aXBlQWN0aW9uLCBhY3R1YWxSZXNpemUsIHNldFRvdWNoU3dpcGVBY3Rpb24sXG59O1xuIiwibGV0IGlucHV0O1xubGV0IGJ1dHRvbjtcblxuZnVuY3Rpb24gcmVuZGVyUGFnZSgpIHtcbiAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3dyYXBwZXInKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcblxuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgd3JhcHBlci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZm9ybS5jbGFzc0xpc3QuYWRkKCdzZWFyY2gtZm9ybScpO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBpbnB1dC5jbGFzc0xpc3QuYWRkKCdzZWFyY2gnKTtcbiAgaW5wdXQucGxhY2Vob2xkZXIgPSAnU2VhcmNoLi4uJztcbiAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG5cbiAgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4tc2VhcmNoJyk7XG4gIGJ1dHRvbi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYSBmYS1zZWFyY2hcIj48L2k+JztcbiAgZm9ybS5hcHBlbmRDaGlsZChidXR0b24pO1xuXG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gIHNlY3Rpb24uY2xhc3NOYW1lID0gJ21haW4nO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuXG4gIGNvbnN0IGdhbGVyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBnYWxlcnkuY2xhc3NOYW1lID0gJ2dhbGVyeSc7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoZ2FsZXJ5KTtcblxuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb290ZXInKTtcbiAgZm9vdGVyLmNsYXNzTmFtZSA9ICdmb290ZXInO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XG5cbiAgY29uc3QgcGFnaW5hdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIHBhZ2luYXRpb24uY2xhc3NOYW1lID0gJ3BhZ2luYXRpb24nO1xuICBmb290ZXIuYXBwZW5kQ2hpbGQocGFnaW5hdGlvbik7XG59XG5cbmZ1bmN0aW9uIHNldFNlYXJjaEFjdGlvbihmdW5jKSB7XG4gIGNvbnN0IGdhbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxlcnknKTtcbiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICBnYWxlcnkuaW5uZXJIVE1MID0gJyc7XG4gICAgICBmdW5jKGlucHV0LnZhbHVlKTtcbiAgICB9XG4gIH0pO1xuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZ2FsZXJ5LmlubmVySFRNTCA9ICcnO1xuICAgIGZ1bmMoaW5wdXQudmFsdWUpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgc2V0U2VhcmNoQWN0aW9uLCByZW5kZXJQYWdlIH07XG4iLCJpbXBvcnQgeyBzaG93VmlkZW8sIGNvdW50VmlkZW8gfSBmcm9tICcuL3lvdXR1YmVBcHAnO1xuaW1wb3J0IHsgc2hvd1BhZ2luZyB9IGZyb20gJy4vcGFnaW5hdGlvbic7XG5pbXBvcnQgaHR0cFJlcXVlc3QgZnJvbSAnLi94aHInO1xuXG5mdW5jdGlvbiByZXF1ZXN0KHF1ZXJ5U3RyKSB7XG4gIGxldCBxdWVyeSA9IHF1ZXJ5U3RyO1xuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgdHlwZTogJ3ZpZGVvJyxcbiAgICBwYXJ0OiAnc25pcHBldCcsXG4gICAgcTogZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KSxcbiAgICBtYXhSZXN1bHRzOiAxNixcbiAgICBrZXk6ICdBSXphU3lBa2QwQll4c0daUVBuZHpEcm5STW42SlZtT2gwc25LZmcnLFxuICB9O1xuXG4gIGNvbnN0IHF1ZXJ5QXJyID0gW107XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhwYXJhbXMpO1xuICBjb25zdCB2YWx1ZXMgPSBPYmplY3QudmFsdWVzKHBhcmFtcyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHF1ZXJ5QXJyLnB1c2goYCR7a2V5c1tpXX09JHt2YWx1ZXNbaV19YCk7XG4gIH1cblxuICBxdWVyeSA9IHF1ZXJ5QXJyLmpvaW4oJyYnKTtcbiAgY29uc3Qgb3B0ID0ge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gIH07XG5cbiAgZnVuY3Rpb24gZ2V0VmlkZW8oaWRTdHIsIG5leHQpIHtcbiAgICBjb25zdCBxdWVyeVZpZGVvID0gYGtleT0ke3BhcmFtcy5rZXl9JmlkPSR7aWRTdHJ9JnBhcnQ9c25pcHBldCxzdGF0aXN0aWNzYDtcbiAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My92aWRlb3M/JHtxdWVyeVZpZGVvfWA7XG4gICAgY29uc3QgblBhZ2UgPSBNYXRoLmZsb29yKDE2IC8gY291bnRWaWRlbygpKTtcblxuICAgIGZ1bmN0aW9uIHNob3dHYWxsZXJ5KHZpZGVvcykge1xuICAgICAgdmlkZW9zLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgc2hvd1ZpZGVvKGl0ZW0pO1xuICAgICAgfSk7XG4gICAgICBzaG93UGFnaW5nKG5QYWdlLCBuZXh0LCAxKTtcbiAgICB9XG5cbiAgICBodHRwUmVxdWVzdC5odHRwUmVxdWVzdCh1cmwsIG9wdCwgc2hvd0dhbGxlcnkpO1xuICB9XG5cbiAgY29uc3QgdXJsID0gYGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvc2VhcmNoPyR7cXVlcnl9YDtcblxuICBmdW5jdGlvbiBnZXRTZWFyY2godmlkZW9zKSB7XG4gICAgbGV0IG5leHQgPSAnJztcbiAgICBsZXQgaWRTdHIgPSAnJztcbiAgICBuZXh0ID0gdmlkZW9zLm5leHRQYWdlVG9rZW47XG4gICAgdmlkZW9zLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlkU3RyID0gYCR7aWRTdHJ9JHtpdGVtLmlkLnZpZGVvSWR9LGA7XG4gICAgfSk7XG4gICAgZ2V0VmlkZW8oaWRTdHIsIG5leHQpO1xuICB9XG5cbiAgaHR0cFJlcXVlc3QuaHR0cFJlcXVlc3QodXJsLCBvcHQsIGdldFNlYXJjaCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgcmVxdWVzdCB9O1xuIiwiZnVuY3Rpb24gaHR0cFJlcXVlc3QodXJsLCBvcHRpb25zLCBmdW5jKSB7XG4gIGZldGNoKHVybCwgb3B0aW9ucylcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKHZpZGVvcykgPT4ge1xuICAgICAgZnVuYyh2aWRlb3MpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgZG9jdW1lbnQud3JpdGUoYFRoZXJlIGhhcyBiZWVuIGEgcHJvYmxlbSB3aXRoIHJlcXVlc3Q6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBodHRwUmVxdWVzdCB9O1xuIiwiZnVuY3Rpb24gY291bnRWaWRlbygpIHtcbiAgY29uc3QgZ2FsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGVyeScpO1xuICBjb25zdCB3aWR0aCA9IGdhbGVyeS5vZmZzZXRXaWR0aDtcbiAgcmV0dXJuIE1hdGguZmxvb3Iod2lkdGggLyAzMDApO1xufVxuXG5mdW5jdGlvbiBzaG93VmlkZW8oaXRlbSkge1xuICBjb25zdCBnYWxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsZXJ5Jyk7XG4gIGNvbnN0IHdpZHRoID0gZ2FsZXJ5Lm9mZnNldFdpZHRoO1xuICBjb25zdCBjb3VudCA9IGNvdW50VmlkZW8oKTtcblxuICBjb25zdCBkaXZWaWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXZWaWRlby5jbGFzc05hbWUgPSAndmlkZW8nO1xuICBkaXZWaWRlby5zdHlsZS5taW5XaWR0aCA9IGAke3dpZHRoIC8gY291bnQgLSA2Nn1weGA7XG4gIGdhbGVyeS5hcHBlbmRDaGlsZChkaXZWaWRlbyk7XG5cbiAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIGltZy5zcmMgPSBpdGVtLnNuaXBwZXQudGh1bWJuYWlscy5tZWRpdW0udXJsO1xuICBpbWcuYWx0ID0gaXRlbS5zbmlwcGV0LnRpdGxlO1xuICBkaXZWaWRlby5hcHBlbmRDaGlsZChpbWcpO1xuXG4gIGNvbnN0IHZpZGVvVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICB2aWRlb1RpdGxlLmNsYXNzTmFtZSA9ICd0aXRsZSc7XG4gIGNvbnN0IGhyZWYgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj0ke2l0ZW0uaWR9YDtcbiAgdmlkZW9UaXRsZS5pbm5lckhUTUwgPSBgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cIiR7aHJlZn1cIj4ke2l0ZW0uc25pcHBldC50aXRsZX08L2E+YDtcbiAgZGl2VmlkZW8uYXBwZW5kQ2hpbGQodmlkZW9UaXRsZSk7XG5cbiAgY29uc3QgYXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBhdXRob3IuY2xhc3NOYW1lID0gJ2F1dGhvcic7XG4gIGF1dGhvci5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYSBmYS11c2VyXCI+PC9pPiR7aXRlbS5zbmlwcGV0LmNoYW5uZWxUaXRsZX1gO1xuICBkaXZWaWRlby5hcHBlbmRDaGlsZChhdXRob3IpO1xuXG4gIGNvbnN0IHB1Ymxpc2hEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBwdWJsaXNoRGF0ZS5jbGFzc05hbWUgPSAnZGF0ZSc7XG4gIHB1Ymxpc2hEYXRlLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhIGZhLWNhbGVuZGFyXCI+PC9pPiR7aXRlbS5zbmlwcGV0LnB1Ymxpc2hlZEF0LnNsaWNlKDAsIDEwKX1gO1xuICBkaXZWaWRlby5hcHBlbmRDaGlsZChwdWJsaXNoRGF0ZSk7XG5cbiAgY29uc3Qgdmlld1JhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHZpZXdSYXRlLmNsYXNzTmFtZSA9ICd2aWV3UmF0ZSc7XG4gIHZpZXdSYXRlLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhIGZhLWV5ZVwiPjwvaT4ke2l0ZW0uc3RhdGlzdGljcy52aWV3Q291bnR9YDtcbiAgZGl2VmlkZW8uYXBwZW5kQ2hpbGQodmlld1JhdGUpO1xuXG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBkZXNjcmlwdGlvbi5jbGFzc05hbWUgPSAnZGVzY3JpcHRpb24nO1xuICBkZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBpdGVtLnNuaXBwZXQuZGVzY3JpcHRpb247XG4gIGRpdlZpZGVvLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbn1cblxuZXhwb3J0IHsgc2hvd1ZpZGVvLCBjb3VudFZpZGVvIH07XG4iXSwic291cmNlUm9vdCI6IiJ9