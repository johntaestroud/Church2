var win = window,
doc = document;

// Global Functions

function hasClass(el, cls) {
  return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};

function addClass(el, cls) {
  if (!this.hasClass(el, cls)) {
    el.className += " " + cls;
  }
};

function removeClass(el, cls) {
  if (this.hasClass(el, cls)) {

    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    el.className = el.className.replace(reg, ' ');
  }
};

// Elements

var site = doc.getElementsByClassName('site-wrap')[0];
var wrap = doc.getElementsByClassName('panel-wrap')[0];

var panel = doc.getElementsByClassName('panel');

var zoom = doc.getElementsByClassName('js-zoom');

var nav_up = doc.getElementsByClassName('js-up'),
nav_left = doc.getElementsByClassName('js-left'),
nav_right = doc.getElementsByClassName('js-right'),
nav_down = doc.getElementsByClassName('js-down');

var animation = doc.getElementsByClassName('js-animation');

// Tracking
var pos_x = 0,
pos_y = 0;

function setPos() {
  wrap.style.transform = 'translateX(' + pos_x + '00%) translateY(' + pos_y + '00%)';
  setTimeout(function () {
    removeClass(wrap, 'animate');
  }, 600);
}

setPos();

function moveUp() {
  addClass(wrap, 'animate');
  pos_y++;
  setPos();
}

function moveLeft() {
  addClass(wrap, 'animate');
  pos_x++;
  setPos();
}

function moveRight() {
  addClass(wrap, 'animate');
  pos_x--;
  setPos();
}

function moveDown() {
  addClass(wrap, 'animate');
  pos_y--;
  setPos();
}

for (var x = 0; x < nav_up.length; x++) {if (window.CP.shouldStopExecution(0)) break;
  nav_up[x].addEventListener('click', moveUp);
}window.CP.exitedLoop(0);

for (var x = 0; x < nav_left.length; x++) {if (window.CP.shouldStopExecution(1)) break;
  nav_left[x].addEventListener('click', moveLeft);
}window.CP.exitedLoop(1);

for (var x = 0; x < nav_right.length; x++) {if (window.CP.shouldStopExecution(2)) break;
  nav_right[x].addEventListener('click', moveRight);
}window.CP.exitedLoop(2);

for (var x = 0; x < nav_down.length; x++) {if (window.CP.shouldStopExecution(3)) break;
  nav_down[x].addEventListener('click', moveDown);
}

// Animations
window.CP.exitedLoop(3);
for (var x = 0; x < animation.length; x++) {if (window.CP.shouldStopExecution(4)) break;
  (function (_x) {
    animation[_x].addEventListener('click', function () {
      toggleAnimation(_x);
    });
  })(x);
}window.CP.exitedLoop(4);

function toggleAnimation(i) {
  for (var x = 0; x < animation.length; x++) {if (window.CP.shouldStopExecution(5)) break;
    if (i === x) {
      addClass(animation[x], 'active');
      addClass(wrap, animation[x].getAttribute('data-animation'));
    } else {
      removeClass(animation[x], 'active');
      removeClass(wrap, animation[x].getAttribute('data-animation'));
    }
  }window.CP.exitedLoop(5);

}

for (var x = 0; x < zoom.length; x++) {if (window.CP.shouldStopExecution(6)) break;
  zoom[x].addEventListener('click', zoomOut);
}window.CP.exitedLoop(6);

function zoomOut(e) {
  e.stopPropagation();
  addClass(site, 'show-all');
  for (var x = 0; x < panel.length; x++) {if (window.CP.shouldStopExecution(7)) break;
    (function (_x) {
      panel[_x].addEventListener('click', setPanelAndZoom);
    })(x);
  }window.CP.exitedLoop(7);
}

function setPanelAndZoom(e) {
  pos_x = -e.target.getAttribute('data-x-pos'),
  pos_y = e.target.getAttribute('data-y-pos');
  setPos();
  zoomIn();
}


function zoomIn() {
  for (var x = 0; x < panel.length; x++) {if (window.CP.shouldStopExecution(8)) break;
    panel[x].removeEventListener('click', setPanelAndZoom);
  }window.CP.exitedLoop(8);
  removeClass(site, 'show-all');
}

//


// Copyright 2025 https://codepen.io/bradarnett/full/dNEbzB
// MIT License: https://opensource.org/license/MIT
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

