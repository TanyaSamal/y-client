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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9uZXh0UmVzdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyUGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMveGhyLmpzIiwid2VicGFjazovLy8uL3NyYy95b3V0dWJlQXBwLmpzIl0sIm5hbWVzIjpbInJlcXVlc3QiLCJnYWxlcnkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ3aWR0aCIsIm9mZnNldFdpZHRoIiwibiIsIk1hdGgiLCJmbG9vciIsInJlc2l6ZVRocm90dGxlciIsIm5ld04iLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwic2hvd05leHQiLCJuZXh0IiwicXVlcnkiLCJ2YWx1ZSIsInBhcmFtcyIsInR5cGUiLCJwYXJ0IiwicSIsImVuY29kZVVSSUNvbXBvbmVudCIsIm1heFJlc3VsdHMiLCJwYWdlVG9rZW4iLCJrZXkiLCJxdWVyeUFyciIsImtleXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJpIiwibGVuZ3RoIiwicHVzaCIsImpvaW4iLCJvcHQiLCJtZXRob2QiLCJnZXRWaWRlbyIsImlkU3RyIiwibmV4dFJlcyIsInF1ZXJ5VmlkZW8iLCJ1cmwiLCJuUGFnZSIsIm5leHRWaWRlb3MiLCJ2aWRlb3MiLCJpdGVtcyIsImZvckVhY2giLCJpdGVtIiwiaHR0cFJlcXVlc3QiLCJuZXh0TmV4dCIsImdldFNlYXJjaE5leHQiLCJuZXh0UGFnZVRva2VuIiwiaWQiLCJ2aWRlb0lkIiwic2hvd1BhZ2luZyIsImNvdW50IiwiYWN0aXZlIiwicGFnaW5hdGlvbiIsImlubmVySFRNTCIsInN0eWxlIiwidHJhbnNmb3JtIiwicGFnTGkiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiYXBwZW5kQ2hpbGQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJjaGFuZ2VWaWRlbyIsIm5ld1BhZ2UiLCJjaGFuZ2VQYWdlIiwidGFyZ2V0IiwiY2hpbGRyZW4iLCJlbGVtZW50IiwiY29udGFpbnMiLCJyZW1vdmUiLCJoYXNBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJmaXJzdENoaWxkIiwibGFzdENoaWxkIiwicHJldmlvdXNTaWJsaW5nIiwibmV4dFNpYmxpbmciLCJjaGlsZEVsZW1lbnRDb3VudCIsInN3aXBlIiwieDEiLCJ4MiIsInkiLCJhY3RpdmVMaSIsIm51bWJlciIsIk51bWJlciIsImZpcnN0IiwiY29vcmRzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicmlnaHQiLCJsZWZ0IiwidG9wIiwiYm90dG9tIiwic2V0UGFnaW5nQWN0aW9uIiwiZSIsIm5vZGVOYW1lIiwic2V0TW91c2VTd2lwZUFjdGlvbiIsInkxIiwicHJldmVudERlZmF1bHQiLCJwYWdlWCIsInBhZ2VZIiwic2V0VG91Y2hTd2lwZUFjdGlvbiIsInRvdWNoZXMiLCJjbGllbnRYIiwiY2xpZW50WSIsImNoYW5nZWRUb3VjaGVzIiwiYWN0dWFsUmVzaXplIiwib2xkTiIsImFjdGl2ZVZpZGVvIiwibmV3QWN0aXZlIiwiY2VpbCIsIm5leHRQYWdlIiwiaW5wdXQiLCJidXR0b24iLCJyZW5kZXJQYWdlIiwid3JhcHBlciIsImJvZHkiLCJoZWFkZXIiLCJmb3JtIiwicGxhY2Vob2xkZXIiLCJzZWN0aW9uIiwiZm9vdGVyIiwic2V0U2VhcmNoQWN0aW9uIiwiZnVuYyIsImtleUNvZGUiLCJibHVyIiwicXVlcnlTdHIiLCJzaG93R2FsbGVyeSIsImdldFNlYXJjaCIsIm9wdGlvbnMiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjYXRjaCIsImVycm9yIiwid3JpdGUiLCJtZXNzYWdlIiwiY291bnRWaWRlbyIsInNob3dWaWRlbyIsImRpdlZpZGVvIiwibWluV2lkdGgiLCJpbWciLCJzcmMiLCJzbmlwcGV0IiwidGh1bWJuYWlscyIsIm1lZGl1bSIsImFsdCIsInRpdGxlIiwidmlkZW9UaXRsZSIsImhyZWYiLCJhdXRob3IiLCJjaGFubmVsVGl0bGUiLCJwdWJsaXNoRGF0ZSIsInB1Ymxpc2hlZEF0Iiwic2xpY2UiLCJ2aWV3UmF0ZSIsInN0YXRpc3RpY3MiLCJ2aWV3Q291bnQiLCJkZXNjcmlwdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBOztBQUNBOzs7O0FBQ0E7Ozs7QUFJQTtBQUNBLGlDQUFnQkEsa0JBQVFBLE9BQXhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1DLFNBQVNDLFNBQVNDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBZjtBQUNBLElBQUlDLFFBQVFILE9BQU9JLFdBQW5CO0FBQ0EsSUFBSUMsSUFBSUMsS0FBS0MsS0FBTCxDQUFXSixRQUFRLEdBQW5CLENBQVI7O0FBRUEs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QixhQUF4QjtBQUNBcUcsY0FBWTFHLFNBQVosR0FBd0JYLEtBQUtzRyxPQUFMLENBQWFlLFdBQXJDO0FBQ0FuQixXQUFTakYsV0FBVCxDQUFxQm9HLFdBQXJCO0FBQ0Q7O1FBRVFwQixTLEdBQUFBLFM7UUFBV0QsVSxHQUFBQSxVIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHsgcmVuZGVyUGFnZSwgc2V0U2VhcmNoQWN0aW9uIH0gZnJvbSAnLi9yZW5kZXJQYWdlJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQge1xuICBzZXRQYWdpbmdBY3Rpb24sIHNldE1vdXNlU3dpcGVBY3Rpb24sIHNldFRvdWNoU3dpcGVBY3Rpb24sIGFjdHVhbFJlc2l6ZSxcbn0gZnJvbSAnLi9wYWdpbmF0aW9uJztcblxucmVuZGVyUGFnZSgpO1xuc2V0U2VhcmNoQWN0aW9uKHJlcXVlc3QucmVxdWVzdCk7XG5zZXRQYWdpbmdBY3Rpb24oKTtcbnNldE1vdXNlU3dpcGVBY3Rpb24oKTtcbnNldFRvdWNoU3dpcGVBY3Rpb24oKTtcblxuY29uc3QgZ2FsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGVyeScpO1xubGV0IHdpZHRoID0gZ2FsZXJ5Lm9mZnNldFdpZHRoO1xubGV0IG4gPSBNYXRoLmZsb29yKHdpZHRoIC8gMzAwKTtcblxuZnVuY3Rpb24gcmVzaXplVGhyb3R0bGVyKCkge1xuICB3aWR0aCA9IGdhbGVyeS5vZmZzZXRXaWR0aDtcbiAgY29uc3QgbmV3TiA9IE1hdGguZmxvb3Iod2lkdGggLyAzMDApO1xuICBpZiAobmV3TiAhPT0gbikge1xuICAgIGFjdHVhbFJlc2l6ZShuKTtcbiAgICBuID0gbmV3TjtcbiAgfVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplVGhyb3R0bGVyLCBmYWxzZSk7XG4iLCJpbXBvcnQgeyBzaG93VmlkZW8sIGNvdW50VmlkZW8gfSBmcm9tICcuL3lvdXR1YmVBcHAnO1xuaW1wb3J0IHsgbmV4dFBhZ2UgfSBmcm9tICcuL3BhZ2luYXRpb24nOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuaW1wb3J0IGh0dHBSZXF1ZXN0IGZyb20gJy4veGhyJztcblxuZnVuY3Rpb24gc2hvd05leHQobmV4dCkge1xuICBsZXQgcXVlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoJykudmFsdWU7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICB0eXBlOiAndmlkZW8nLFxuICAgIHBhcnQ6ICdzbmlwcGV0JyxcbiAgICBxOiBlbmNvZGVVUklDb21wb25lbnQocXVlcnkpLFxuICAgIG1heFJlc3VsdHM6IDE2LFxuICAgIHBhZ2VUb2tlbjogbmV4dCxcbiAgICBrZXk6ICdBSXphU3lBa2QwQll4c0daUVBuZHpEcm5STW42SlZtT2gwc25LZmcnLFxuICB9O1xuXG4gIGNvbnN0IHF1ZXJ5QXJyID0gW107XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhwYXJhbXMpO1xuICBjb25zdCB2YWx1ZXMgPSBPYmplY3QudmFsdWVzKHBhcmFtcyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHF1ZXJ5QXJyLnB1c2goYCR7a2V5c1tpXX09JHt2YWx1ZXNbaV19YCk7XG4gIH1cblxuICBxdWVyeSA9IHF1ZXJ5QXJyLmpvaW4oJyYnKTtcbiAgY29uc3Qgb3B0ID0ge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gIH07XG5cbiAgZnVuY3Rpb24gZ2V0VmlkZW8oaWRTdHIsIG5leHRSZXMpIHtcbiAgICBjb25zdCBxdWVyeVZpZGVvID0gYGtleT0ke3BhcmFtcy5rZXl9JmlkPSR7aWRTdHJ9JnBhcnQ9c25pcHBldCxzdGF0aXN0aWNzYDtcbiAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My92aWRlb3M/JHtxdWVyeVZpZGVvfWA7XG4gICAgY29uc3QgblBhZ2UgPSBNYXRoLmZsb29yKDE2IC8gY291bnRWaWRlbygpKTtcblxuICAgIGZ1bmN0aW9uIG5leHRWaWRlb3ModmlkZW9zKSB7XG4gICAgICB2aWRlb3MuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBzaG93VmlkZW8oaXRlbSk7XG4gICAgICB9KTtcbiAgICAgIG5leHRQYWdlKG5QYWdlLCBuZXh0UmVzKTtcbiAgICB9XG5cbiAgICBodHRwUmVxdWVzdC5odHRwUmVxdWVzdCh1cmwsIG9wdCwgbmV4dFZpZGVvcyk7XG4gIH1cblxuICBsZXQgbmV4dE5leHQgPSAnJztcbiAgY29uc3QgdXJsID0gYGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvc2VhcmNoPyR7cXVlcnl9YDtcblxuICBmdW5jdGlvbiBnZXRTZWFyY2hOZXh0KHZpZGVvcykge1xuICAgIGxldCBpZFN0ciA9ICcnO1xuICAgIG5leHROZXh0ID0gdmlkZW9zLm5leHRQYWdlVG9rZW47XG4gICAgdmlkZW9zLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlkU3RyID0gYCR7aWRTdHJ9JHtpdGVtLmlkLnZpZGVvSWR9LGA7XG4gICAgfSk7XG4gICAgZ2V0VmlkZW8oaWRTdHIsIG5leHROZXh0KTtcbiAgfVxuXG4gIGh0dHBSZXF1ZXN0Lmh0dHBSZXF1ZXN0KHVybCwgb3B0LCBnZXRTZWFyY2hOZXh0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBzaG93TmV4dCB9O1xuIiwiaW1wb3J0IHNob3dOZXh0IGZyb20gJy4vbmV4dFJlc3VsdHMnOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG5mdW5jdGlvbiBzaG93UGFnaW5nKGNvdW50LCBuZXh0LCBhY3RpdmUpIHtcbiAgY29uc3QgcGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uJyk7XG4gIHBhZ2luYXRpb24uaW5uZXJIVE1MID0gJyc7XG4gIGNvbnN0IGdhbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxlcnknKTtcbiAgZ2FsZXJ5LnN0eWxlLnRyYW5zZm9ybSA9ICdub25lJztcbiAgZ2FsZXJ5LnN0eWxlWyd0cmFuc2l0aW9uLWR1cmF0aW9uJ10gPSAnMHMnO1xuICBmb3IgKGxldCBpID0gMTsgaSA8PSBjb3VudDsgaSArPSAxKSB7XG4gICAgY29uc3QgcGFnTGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIHBhZ0xpLmNsYXNzTmFtZSA9ICdwYWdlTnVtYmVyJztcbiAgICBwYWdpbmF0aW9uLmFwcGVuZENoaWxkKHBhZ0xpKTtcbiAgICBwYWdMaS5pbm5lckhUTUwgPSBpO1xuICAgIGlmIChpICE9PSAxICYmIGkgIT09IGNvdW50KSB7XG4gICAgICBpZiAoaSA+IGFjdGl2ZSArIDIgfHwgaSA8IGFjdGl2ZSAtIDEpIHBhZ0xpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH1cbiAgICBpZiAoaSA9PT0gYWN0aXZlKSB7XG4gICAgICBwYWdMaS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG4gICAgaWYgKGkgPT09IGNvdW50KSB7XG4gICAgICBwYWdMaS5zZXRBdHRyaWJ1dGUoJ2RhdGEtbmV4dCcsIG5leHQpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjaGFuZ2VWaWRlbyhuZXdQYWdlKSB7XG4gIGNvbnN0IGdhbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxlcnknKTtcbiAgY29uc3Qgd2lkdGggPSBnYWxlcnkub2Zmc2V0V2lkdGg7XG4gIGdhbGVyeS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHt3aWR0aCAqIChuZXdQYWdlIC0gMSl9cHgpYDtcbiAgZ2FsZXJ5LnN0eWxlWyd0cmFuc2l0aW9uLWR1cmF0aW9uJ10gPSAnMXMnO1xufVxuXG5mdW5jdGlvbiBjaGFuZ2VQYWdlKHRhcmdldCkge1xuICBjb25zdCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24nKTtcbiAgcGFnaW5hdGlvbi5jaGlsZHJlbi5mb3JFYWNoID0gW10uZm9yRWFjaDtcbiAgcGFnaW5hdGlvbi5jaGlsZHJlbi5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICB9XG4gIH0pO1xuICBpZiAodGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1uZXh0JykpIHtcbiAgICBjb25zdCBuZXh0ID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1uZXh0Jyk7XG4gICAgc2hvd05leHQuc2hvd05leHQobmV4dCk7XG4gICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1uZXh0Jyk7XG4gIH1cbiAgcGFnaW5hdGlvbi5jaGlsZHJlbi5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgaWYgKGVsZW1lbnQgPT09IHBhZ2luYXRpb24uZmlyc3RDaGlsZCB8fCBlbGVtZW50ID09PSBwYWdpbmF0aW9uLmxhc3RDaGlsZFxuICAgICAgfHwgZWxlbWVudCA9PT0gdGFyZ2V0LnByZXZpb3VzU2libGluZyB8fCBlbGVtZW50ID09PSB0YXJnZXRcbiAgICAgIHx8IGVsZW1lbnQgPT09IHRhcmdldC5uZXh0U2libGluZykge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICB9IGVsc2UgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgfSk7XG4gIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgaWYgKHRhcmdldCA9PT0gcGFnaW5hdGlvbi5maXJzdENoaWxkKSB7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwYWdpbmF0aW9uLmNoaWxkRWxlbWVudENvdW50OyBpICs9IDEpIHtcbiAgICAgIGlmIChpIDwgNCAmJiBwYWdpbmF0aW9uLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJykpIHtcbiAgICAgICAgcGFnaW5hdGlvbi5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgIH0gZWxzZSBpZiAoaSA+PSA0ICYmIHBhZ2luYXRpb24uY2hpbGRyZW5baV0gIT09IHBhZ2luYXRpb24ubGFzdENoaWxkKSB7XG4gICAgICAgIHBhZ2luYXRpb24uY2hpbGRyZW5baV0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmICh0YXJnZXQucHJldmlvdXNTaWJsaW5nXG4gICAgJiYgdGFyZ2V0LnByZXZpb3VzU2libGluZy5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGRlbicpKSB7XG4gICAgdGFyZ2V0LnByZXZpb3VzU2libGluZy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgfVxuICBpZiAodGFyZ2V0Lm5leHRTaWJsaW5nICYmIHRhcmdldC5uZXh0U2libGluZy5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGRlbicpKSB7XG4gICAgdGFyZ2V0Lm5leHRTaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN3aXBlKHgxLCB4MiwgeSkge1xuICBjb25zdCBnYWxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xuICBjb25zdCBhY3RpdmVMaSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKTtcbiAgY29uc3QgbnVtYmVyID0gTnVtYmVyKGFjdGl2ZUxpLmlubmVySFRNTCk7XG4gIGNvbnN0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xuICBjb25zdCBmaXJzdCA9IE51bWJlcihwYWdpbmF0aW9uLmZpcnN0Q2hpbGQuaW5uZXJIVE1MKTtcbiAgY29uc3QgY29vcmRzID0gZ2FsZXJ5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBpZiAoeDEgPD0gY29vcmRzLnJpZ2h0ICYmIHgxID49IGNvb3Jkcy5sZWZ0ICYmIHkgPj0gY29vcmRzLnRvcCAmJiB5IDw9IGNvb3Jkcy5ib3R0b20pIHtcbiAgICBpZiAoeDEgLSB4MiA+IDMwKSB7XG4gICAgICBjaGFuZ2VWaWRlbyhudW1iZXIgKyAxKTtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGFjdGl2ZUxpLm5leHRTaWJsaW5nO1xuICAgICAgY2hhbmdlUGFnZSh0YXJnZXQpO1xuICAgIH1cbiAgICBpZiAoeDIgLSB4MSA+IDMwICYmIG51bWJlciAhPT0gZmlyc3QpIHtcbiAgICAgIGNoYW5nZVZpZGVvKG51bWJlciAtIDEpO1xuICAgICAgY29uc3QgdGFyZ2V0ID0gYWN0aXZlTGkucHJldmlvdXNTaWJsaW5nO1xuICAgICAgY2hhbmdlUGFnZSh0YXJnZXQpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRQYWdpbmdBY3Rpb24oKSB7XG4gIGNvbnN0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xuICBwYWdpbmF0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQubm9kZU5hbWUgPT09ICdMSScpIHtcbiAgICAgIGNoYW5nZVZpZGVvKE51bWJlcihlLnRhcmdldC5pbm5lckhUTUwpKTtcbiAgICAgIGNoYW5nZVBhZ2UoZS50YXJnZXQpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldE1vdXNlU3dpcGVBY3Rpb24oKSB7XG4gIGNvbnN0IGdhbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJyk7XG4gIGxldCB4MSA9IDA7XG4gIGxldCB5MSA9IDA7XG4gIGdhbGVyeS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB4MSA9IGUucGFnZVg7XG4gICAgeTEgPSBlLnBhZ2VZO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG4gIGdhbGVyeS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgeDIgPSBlLnBhZ2VYO1xuICAgIHN3aXBlKHgxLCB4MiwgeTEpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0VG91Y2hTd2lwZUFjdGlvbigpIHtcbiAgY29uc3QgZ2FsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKTtcbiAgbGV0IHgxID0gMDtcbiAgbGV0IHkxID0gMDtcbiAgZ2FsZXJ5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB4MSA9IGUudG91Y2hlc1swXS5jbGllbnRYO1xuICAgIHkxID0gZS50b3VjaGVzWzBdLmNsaWVudFk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbiAgZ2FsZXJ5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgeDIgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XG4gICAgc3dpcGUoeDEsIHgyLCB5MSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhY3R1YWxSZXNpemUob2xkTikge1xuICBjb25zdCBnYWxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsZXJ5Jyk7XG4gIGNvbnN0IHdpZHRoID0gZ2FsZXJ5Lm9mZnNldFdpZHRoO1xuICBjb25zdCBuID0gTWF0aC5mbG9vcih3aWR0aCAvIDMwMCk7XG4gIGNvbnN0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xuICBjb25zdCBuUGFnZSA9IE51bWJlcihnYWxlcnkuY2hpbGRFbGVtZW50Q291bnQpO1xuICBjb25zdCBuZXdOID0gTWF0aC5mbG9vcihuUGFnZSAvIG4pO1xuICBsZXQgbmV4dCA9ICcnO1xuICBsZXQgYWN0aXZlID0gJyc7XG4gIHBhZ2luYXRpb24uY2hpbGRyZW4uZm9yRWFjaCA9IFtdLmZvckVhY2g7XG4gIHBhZ2luYXRpb24uY2hpbGRyZW4uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1uZXh0JykpIHtcbiAgICAgIG5leHQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1uZXh0Jyk7XG4gICAgfVxuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgIGFjdGl2ZSA9IE51bWJlcihlbGVtZW50LmlubmVySFRNTCk7XG4gICAgfVxuICB9KTtcbiAgY29uc3QgYWN0aXZlVmlkZW8gPSBvbGROICogKGFjdGl2ZSAtIDEpICsgMTtcbiAgbGV0IG5ld0FjdGl2ZSA9IDA7XG4gIGlmIChhY3RpdmVWaWRlbyA8IG4pIHtcbiAgICBuZXdBY3RpdmUgPSBhY3RpdmVWaWRlbztcbiAgfSBlbHNlIHtcbiAgICBuZXdBY3RpdmUgPSBNYXRoLmNlaWwoYWN0aXZlVmlkZW8gLyBuKTtcbiAgfVxuICBzaG93UGFnaW5nKG5ld04sIG5leHQsIG5ld0FjdGl2ZSk7XG4gIGdhbGVyeS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHt3aWR0aCAqIChuZXdBY3RpdmUgLSAxKX1weClgO1xuICBnYWxlcnkuc3R5bGVbJ3RyYW5zaXRpb24tZHVyYXRpb24nXSA9ICcwcyc7XG59XG5cbmZ1bmN0aW9uIG5leHRQYWdlKGNvdW50LCBuZXh0TmV4dCkge1xuICBjb25zdCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb24nKTtcbiAgY29uc3QgYWN0aXZlTGkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk7XG4gIGNvbnN0IG51bWJlciA9IE51bWJlcihhY3RpdmVMaS5pbm5lckhUTUwpO1xuICBmb3IgKGxldCBpID0gMTsgaSA8PSBjb3VudDsgaSArPSAxKSB7XG4gICAgY29uc3QgcGFnTGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIHBhZ0xpLmNsYXNzTmFtZSA9ICdwYWdlTnVtYmVyJztcbiAgICBwYWdpbmF0aW9uLmFwcGVuZENoaWxkKHBhZ0xpKTtcbiAgICBwYWdMaS5pbm5lckhUTUwgPSBudW1iZXIgKyBpO1xuICAgIGlmIChpID09PSBjb3VudCkge1xuICAgICAgcGFnTGkuc2V0QXR0cmlidXRlKCdkYXRhLW5leHQnLCBuZXh0TmV4dCk7XG4gICAgfVxuICAgIGlmIChpID4gY291bnQgLyAyICYmIGkgIT09IGNvdW50KSB7XG4gICAgICBwYWdMaS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgc2hvd1BhZ2luZywgc2V0UGFnaW5nQWN0aW9uLCBuZXh0UGFnZSwgc2V0TW91c2VTd2lwZUFjdGlvbiwgYWN0dWFsUmVzaXplLCBzZXRUb3VjaFN3aXBlQWN0aW9uLFxufTtcbiIsImxldCBpbnB1dDtcbmxldCBidXR0b247XG5cbmZ1bmN0aW9uIHJlbmRlclBhZ2UoKSB7XG4gIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCd3cmFwcGVyJyk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQod3JhcHBlcik7XG5cbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGZvcm0uY2xhc3NMaXN0LmFkZCgnc2VhcmNoLWZvcm0nKTtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnc2VhcmNoJyk7XG4gIGlucHV0LnBsYWNlaG9sZGVyID0gJ1NlYXJjaC4uLic7XG4gIGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXG4gIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuLXNlYXJjaCcpO1xuICBidXR0b24uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEgZmEtc2VhcmNoXCI+PC9pPic7XG4gIGZvcm0uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcblxuICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICBzZWN0aW9uLmNsYXNzTmFtZSA9ICdtYWluJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWN0aW9uKTtcblxuICBjb25zdCBnYWxlcnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZ2FsZXJ5LmNsYXNzTmFtZSA9ICdnYWxlcnknO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKGdhbGVyeSk7XG5cbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdGVyJyk7XG4gIGZvb3Rlci5jbGFzc05hbWUgPSAnZm9vdGVyJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb290ZXIpO1xuXG4gIGNvbnN0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICBwYWdpbmF0aW9uLmNsYXNzTmFtZSA9ICdwYWdpbmF0aW9uJztcbiAgZm9vdGVyLmFwcGVuZENoaWxkKHBhZ2luYXRpb24pO1xufVxuXG5mdW5jdGlvbiBzZXRTZWFyY2hBY3Rpb24oZnVuYykge1xuICBjb25zdCBnYWxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsZXJ5Jyk7XG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgZ2FsZXJ5LmlubmVySFRNTCA9ICcnO1xuICAgICAgZnVuYyhpbnB1dC52YWx1ZSk7XG4gICAgICBpbnB1dC5ibHVyKCk7XG4gICAgfVxuICB9KTtcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGdhbGVyeS5pbm5lckhUTUwgPSAnJztcbiAgICBmdW5jKGlucHV0LnZhbHVlKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IHNldFNlYXJjaEFjdGlvbiwgcmVuZGVyUGFnZSB9O1xuIiwiaW1wb3J0IHsgc2hvd1ZpZGVvLCBjb3VudFZpZGVvIH0gZnJvbSAnLi95b3V0dWJlQXBwJztcbmltcG9ydCB7IHNob3dQYWdpbmcgfSBmcm9tICcuL3BhZ2luYXRpb24nO1xuaW1wb3J0IGh0dHBSZXF1ZXN0IGZyb20gJy4veGhyJztcblxuZnVuY3Rpb24gcmVxdWVzdChxdWVyeVN0cikge1xuICBsZXQgcXVlcnkgPSBxdWVyeVN0cjtcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIHR5cGU6ICd2aWRlbycsXG4gICAgcGFydDogJ3NuaXBwZXQnLFxuICAgIHE6IGVuY29kZVVSSUNvbXBvbmVudChxdWVyeSksXG4gICAgbWF4UmVzdWx0czogMTYsXG4gICAga2V5OiAnQUl6YVN5QWtkMEJZeHNHWlFQbmR6RHJuUk1uNkpWbU9oMHNuS2ZnJyxcbiAgfTtcblxuICBjb25zdCBxdWVyeUFyciA9IFtdO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocGFyYW1zKTtcbiAgY29uc3QgdmFsdWVzID0gT2JqZWN0LnZhbHVlcyhwYXJhbXMpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBxdWVyeUFyci5wdXNoKGAke2tleXNbaV19PSR7dmFsdWVzW2ldfWApO1xuICB9XG5cbiAgcXVlcnkgPSBxdWVyeUFyci5qb2luKCcmJyk7XG4gIGNvbnN0IG9wdCA9IHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICB9O1xuXG4gIGZ1bmN0aW9uIGdldFZpZGVvKGlkU3RyLCBuZXh0KSB7XG4gICAgY29uc3QgcXVlcnlWaWRlbyA9IGBrZXk9JHtwYXJhbXMua2V5fSZpZD0ke2lkU3RyfSZwYXJ0PXNuaXBwZXQsc3RhdGlzdGljc2A7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvdmlkZW9zPyR7cXVlcnlWaWRlb31gO1xuICAgIGNvbnN0IG5QYWdlID0gTWF0aC5mbG9vcigxNiAvIGNvdW50VmlkZW8oKSk7XG5cbiAgICBmdW5jdGlvbiBzaG93R2FsbGVyeSh2aWRlb3MpIHtcbiAgICAgIHZpZGVvcy5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHNob3dWaWRlbyhpdGVtKTtcbiAgICAgIH0pO1xuICAgICAgc2hvd1BhZ2luZyhuUGFnZSwgbmV4dCwgMSk7XG4gICAgfVxuXG4gICAgaHR0cFJlcXVlc3QuaHR0cFJlcXVlc3QodXJsLCBvcHQsIHNob3dHYWxsZXJ5KTtcbiAgfVxuXG4gIGNvbnN0IHVybCA9IGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS95b3V0dWJlL3YzL3NlYXJjaD8ke3F1ZXJ5fWA7XG5cbiAgZnVuY3Rpb24gZ2V0U2VhcmNoKHZpZGVvcykge1xuICAgIGxldCBuZXh0ID0gJyc7XG4gICAgbGV0IGlkU3RyID0gJyc7XG4gICAgbmV4dCA9IHZpZGVvcy5uZXh0UGFnZVRva2VuO1xuICAgIHZpZGVvcy5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZFN0ciA9IGAke2lkU3RyfSR7aXRlbS5pZC52aWRlb0lkfSxgO1xuICAgIH0pO1xuICAgIGdldFZpZGVvKGlkU3RyLCBuZXh0KTtcbiAgfVxuXG4gIGh0dHBSZXF1ZXN0Lmh0dHBSZXF1ZXN0KHVybCwgb3B0LCBnZXRTZWFyY2gpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IHJlcXVlc3QgfTtcbiIsImZ1bmN0aW9uIGh0dHBSZXF1ZXN0KHVybCwgb3B0aW9ucywgZnVuYykge1xuICBmZXRjaCh1cmwsIG9wdGlvbnMpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKCh2aWRlb3MpID0+IHtcbiAgICAgIGZ1bmModmlkZW9zKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGRvY3VtZW50LndyaXRlKGBUaGVyZSBoYXMgYmVlbiBhIHByb2JsZW0gd2l0aCByZXF1ZXN0OiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgaHR0cFJlcXVlc3QgfTtcbiIsImZ1bmN0aW9uIGNvdW50VmlkZW8oKSB7XG4gIGNvbnN0IGdhbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxlcnknKTtcbiAgY29uc3Qgd2lkdGggPSBnYWxlcnkub2Zmc2V0V2lkdGg7XG4gIHJldHVybiBNYXRoLmZsb29yKHdpZHRoIC8gMzAwKTtcbn1cblxuZnVuY3Rpb24gc2hvd1ZpZGVvKGl0ZW0pIHtcbiAgY29uc3QgZ2FsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGVyeScpO1xuICBjb25zdCB3aWR0aCA9IGdhbGVyeS5vZmZzZXRXaWR0aDtcbiAgY29uc3QgY291bnQgPSBjb3VudFZpZGVvKCk7XG5cbiAgY29uc3QgZGl2VmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2VmlkZW8uY2xhc3NOYW1lID0gJ3ZpZGVvJztcbiAgZGl2VmlkZW8uc3R5bGUubWluV2lkdGggPSBgJHt3aWR0aCAvIGNvdW50IC0gNjZ9cHhgO1xuICBnYWxlcnkuYXBwZW5kQ2hpbGQoZGl2VmlkZW8pO1xuXG4gIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICBpbWcuc3JjID0gaXRlbS5zbmlwcGV0LnRodW1ibmFpbHMubWVkaXVtLnVybDtcbiAgaW1nLmFsdCA9IGl0ZW0uc25pcHBldC50aXRsZTtcbiAgZGl2VmlkZW8uYXBwZW5kQ2hpbGQoaW1nKTtcblxuICBjb25zdCB2aWRlb1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgdmlkZW9UaXRsZS5jbGFzc05hbWUgPSAndGl0bGUnO1xuICBjb25zdCBocmVmID0gYGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9JHtpdGVtLmlkfWA7XG4gIHZpZGVvVGl0bGUuaW5uZXJIVE1MID0gYDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCIke2hyZWZ9XCI+JHtpdGVtLnNuaXBwZXQudGl0bGV9PC9hPmA7XG4gIGRpdlZpZGVvLmFwcGVuZENoaWxkKHZpZGVvVGl0bGUpO1xuXG4gIGNvbnN0IGF1dGhvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgYXV0aG9yLmNsYXNzTmFtZSA9ICdhdXRob3InO1xuICBhdXRob3IuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEgZmEtdXNlclwiPjwvaT4ke2l0ZW0uc25pcHBldC5jaGFubmVsVGl0bGV9YDtcbiAgZGl2VmlkZW8uYXBwZW5kQ2hpbGQoYXV0aG9yKTtcblxuICBjb25zdCBwdWJsaXNoRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgcHVibGlzaERhdGUuY2xhc3NOYW1lID0gJ2RhdGUnO1xuICBwdWJsaXNoRGF0ZS5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYSBmYS1jYWxlbmRhclwiPjwvaT4ke2l0ZW0uc25pcHBldC5wdWJsaXNoZWRBdC5zbGljZSgwLCAxMCl9YDtcbiAgZGl2VmlkZW8uYXBwZW5kQ2hpbGQocHVibGlzaERhdGUpO1xuXG4gIGNvbnN0IHZpZXdSYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICB2aWV3UmF0ZS5jbGFzc05hbWUgPSAndmlld1JhdGUnO1xuICB2aWV3UmF0ZS5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYSBmYS1leWVcIj48L2k+JHtpdGVtLnN0YXRpc3RpY3Mudmlld0NvdW50fWA7XG4gIGRpdlZpZGVvLmFwcGVuZENoaWxkKHZpZXdSYXRlKTtcblxuICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgZGVzY3JpcHRpb24uY2xhc3NOYW1lID0gJ2Rlc2NyaXB0aW9uJztcbiAgZGVzY3JpcHRpb24uaW5uZXJIVE1MID0gaXRlbS5zbmlwcGV0LmRlc2NyaXB0aW9uO1xuICBkaXZWaWRlby5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG59XG5cbmV4cG9ydCB7IHNob3dWaWRlbywgY291bnRWaWRlbyB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==