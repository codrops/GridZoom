const imagesLoaded = require('imagesloaded');

// Preload images
const preloadImages = (selector = 'img') => {
    return new Promise((resolve) => {
        imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
    });
};

const calcWinsize = () => {
    return { width: window.innerWidth, height: window.innerHeight };
};

const getScrollValues = () => {
    const supportPageOffset = window.pageXOffset !== undefined;
    const isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    const x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
    const y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    return {x,y};
}

// wrap each element of an array
// elems - the array of elements to wrap
// wrapType - type of wrapper ('div', 'span' etc)
// wrapClass - wrapper class(s) 
const wrapLines = (elems, wrapType, wrapClass) => {
    elems.forEach(char => {
        // add a wrap for every char (overflow hidden)
        const wrapEl = document.createElement(wrapType);
        wrapEl.classList = wrapClass;
        char.parentNode.appendChild(wrapEl);
        wrapEl.appendChild(char);
    });
}

const adjustedBoundingRect = el => {
    var rect = el.getBoundingClientRect();
    var style = getComputedStyle(el);
    var tx = style.transform;
  
    if (tx) {
      var sx, sy, dx, dy;
      if (tx.startsWith('matrix3d(')) {
        var ta = tx.slice(9,-1).split(/, /);
        sx = +ta[0];
        sy = +ta[5];
        dx = +ta[12];
        dy = +ta[13];
      } else if (tx.startsWith('matrix(')) {
        var ta = tx.slice(7,-1).split(/, /);
        sx = +ta[0];
        sy = +ta[3];
        dx = +ta[4];
        dy = +ta[5];
      } else {
        return rect;
      }
  
      var to = style.transformOrigin;
      var x = rect.x - dx - (1 - sx) * parseFloat(to);
      var y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(' ') + 1));
      var w = sx ? rect.width / sx : el.offsetWidth;
      var h = sy ? rect.height / sy : el.offsetHeight;
      return {
        x: x, y: y, width: w, height: h, top: y, right: x + w, bottom: y + h, left: x
      };
    } else {
      return rect;
    }
}

export { 
    preloadImages,
    calcWinsize,
    getScrollValues,
    wrapLines,
    adjustedBoundingRect
};