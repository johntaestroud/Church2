        (function ($) {
            "use strict";

            //Page cursors

            document.getElementsByTagName("body")[0].addEventListener("mousemove", function (n) {
                t.style.left = n.clientX + "px",
                    t.style.top = n.clientY + "px",
                    e.style.left = n.clientX + "px",
                    e.style.top = n.clientY + "px",
                    i.style.left = n.clientX + "px",
                    i.style.top = n.clientY + "px";
            });
            var t = document.getElementById("cursor"),
                e = document.getElementById("cursor2"),
                i = document.getElementById("cursor3");
            function n(t) {
                e.classList.add("hover"), i.classList.add("hover");
            }
            function s(t) {
                e.classList.remove("hover"), i.classList.remove("hover");
            }
            s();
            for (var r = document.querySelectorAll(".hover-target"), a = r.length - 1; a >= 0; a--) {
                if (window.CP.shouldStopExecution(0)) break;
                o(r[a]);
            } window.CP.exitedLoop(0);
            function o(t) {
                t.addEventListener("mouseover", n), t.addEventListener("mouseout", s);
            }


            //About page

            $(".about-text").on('click', function () {
                $("body").addClass("about-on");
            });
            $(".about-close").on('click', function () {
                $("body").removeClass("about-on");
            });


            //Contact page

            $(".contact-text").on('click', function () {
                $("body").addClass("contact-on");
            });
            $(".contact-close").on('click', function () {
                $("body").removeClass("contact-on");
            });


            //Travel portfolio page

            $(".travel").on('click', function () {
                $("body").addClass("travel-on");
            });
            $(".travel-close").on('click', function () {
                $("body").removeClass("travel-on");
            });


            //Wildlife portfolio page

            $(".wildlife").on('click', function () {
                $("body").addClass("wildlife-on");
            });
            $(".wildlife-close").on('click', function () {
                $("body").removeClass("wildlife-on");
            });


            //Nature portfolio page

            $(".nature").on('click', function () {
                $("body").addClass("nature-on");
            });
            $(".nature-close").on('click', function () {
                $("body").removeClass("nature-on");
            });


        })(jQuery);
      

// EXPAND MENU START
class expand {
  constructor() {
    this._el = document.querySelector('.js-expand');
    this._elInner = this._el.querySelector('.js-expand-inner');
    this._elInnerInverter = this._el.querySelector('.js-expand-inner-inverter');
    this._expandBtn = this._el.querySelector('.js-expand-expand-btn');
    this._collapseBtn = this._el.querySelector('.js-expand-collapse-btn');
    this._content = this._el.querySelector('.js-content');

    this.toggle = this.toggle.bind(this);
    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);

    this._calculate();
    this._createEaseAnimations();

    this._expandBtn.addEventListener('click', this.expand);
    this._collapseBtn.addEventListener('click', this.collapse);
  }

  expand() {
    if (this._isExpanded) {
      return;
    }
    this._isExpanded = true;
    this._applyAnimation({ expand: true });
  }

  collapse() {
    if (!this._isExpanded) {
      return;
    }
    this._isExpanded = false;
    this._applyAnimation({ expand: false });
  }

  toggle() {
    if (this._isExpanded) {
      return this.collapse();
    }

    this.expand();
  }

  _applyAnimation({ expand } = opts) {
    this._elInner.classList.remove('item--expanded');
    this._elInner.classList.remove('item--collapsed');
    this._elInnerInverter.classList.remove('item__contents--expanded');
    this._elInnerInverter.classList.remove('item__contents--collapsed');

    // Force a recalc styles here so the classes take hold.
    window.getComputedStyle(this._elInner).transform;

    if (expand) {
      this._elInner.classList.add('item--expanded');
      this._elInnerInverter.classList.add('item__contents--expanded');
      return;
    }

    this._elInner.classList.add('item--collapsed');
    this._elInnerInverter.classList.add('item__contents--collapsed');
  }

  _calculate() {
    const elBCR = this._el.getBoundingClientRect();
    const collapsed = this._expandBtn.getBoundingClientRect();
    const expanded = this._content.getBoundingClientRect();

    const expandedWidth = Math.abs(expanded.right - elBCR.left);
    const expandedHeight = Math.abs(expanded.bottom - elBCR.top);

    const collapsedWidth = collapsed.width;
    const collapsedHeight = collapsed.height;

    const exRadius = Math.sqrt(expandedWidth * expandedWidth +
    expandedHeight * expandedHeight);
    const colRadius = collapsedWidth * 0.5;

    this._scale = (exRadius - colRadius) / colRadius;

    // Set initial sizes.
    this._el.style.width = `${expandedWidth}px`;
    this._el.style.height = `${expandedHeight}px`;

    this._elInner.style.width = `${collapsedWidth}px`;
    this._elInner.style.height = `${collapsedHeight}px`;

    this._elInner.style.transformOrigin =
    `${collapsedWidth * 0.5}px ${collapsedHeight * 0.5}px`;
    this._elInnerInverter.style.transformOrigin =
    `${collapsedWidth * 0.5}px ${collapsedHeight * 0.5}px`;

  }

  _createEaseAnimations() {
    let ease = document.querySelector('.ease');
    if (ease) {
      return ease;
    }

    ease = document.createElement('style');
    ease.classList.add('ease');

    const expandAnimation = [];
    const expandContentsAnimation = [];
    const expandCircleAnimation = [];
    const collapseAnimation = [];
    const collapseContentsAnimation = [];
    const collapseCircleAnimation = [];
    for (let i = 0; i <= 100; i++) {if (window.CP.shouldStopExecution(0)) break;
      const step = this._ease(i / 100);

      // Expand animation.
      this._append({
        i,
        step,
        start: 1,
        end: this._scale,
        outerAnimation: expandAnimation,
        innerAnimation: expandContentsAnimation });


      // Collapse animation.
      this._append({
        i,
        step,
        start: this._scale,
        end: 1,
        outerAnimation: collapseAnimation,
        innerAnimation: collapseContentsAnimation });

    }window.CP.exitedLoop(0);

    ease.textContent = `
      @keyframes expandAnimation {
        ${expandAnimation.join('')}
      }
      @keyframes expandContentsAnimation {
        ${expandContentsAnimation.join('')}
      }
      @keyframes collapseAnimation {
        ${collapseAnimation.join('')}
      }
      @keyframes collapseContentsAnimation {
        ${collapseContentsAnimation.join('')}
      }`;

    document.head.appendChild(ease);
    return ease;
  }

  _append({
    i,
    step,
    start,
    end,
    outerAnimation,
    innerAnimation } = opts) {

    const scale = start + (end - start) * step;
    const invScale = 1 / scale;

    outerAnimation.push(`
      ${i}% {
        transform: scale(${scale});
      }`);

    innerAnimation.push(`
      ${i}% {
        transform: scale(${invScale});
      }`);
  }

  _clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  _ease(v, pow = 4) {
    v = this._clamp(v, 0, 1);

    return 1 - Math.pow(1 - v, pow);
  }}


new expand();
// EXPAND MENU END
    