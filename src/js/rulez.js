/* jshint latedef:nofunc */
/* jshint unused:false*/
/**
 *
 * @param config
 * @constructor
 */
var Rulez = function (config) {
  'use strict';
  var svgNS = 'http://www.w3.org/2000/svg';
  var defaultConfig = {
    width: null,
    height: null,
    element: null,
    layout: 'horizontal',
    divisionDefaults: {
      strokeWidth: 1,
      type: 'rect',
      className: 'rulez-rect'
    },
    textDefaults: {
      rotation: 0,
      offset: 25,
      className: 'rulez-text'
    },
    divisions: [
      {
        pixelGap: 5,
        lineLength: 5
      },
      {
        pixelGap: 25,
        lineLength: 10
      },
      {
        pixelGap: 50,
        lineLength: 15
      },
      {
        pixelGap: 100,
        lineLength: 20
      }
    ],
    texts: [
      {
        pixelGap: 100
      }
    ]
  };
  var c = mergeConfigs(JSON.parse(JSON.stringify(defaultConfig)), config);

  var g = createGroup();
  c.width = c.width ? c.width : c.element.clientWidth;
  c.height = c.height ? c.height : c.element.clientHeight;
  c.element.appendChild(g);
  var maxDistance = 0;

  var currentPosition = 0;

  var texts = [];

  /**
   * Renders ruler inside svg element
   */
  this.render = function () {
    c.divisions.forEach(function (entry) {
      if (entry.pixelGap > maxDistance) {
        maxDistance = entry.pixelGap;
      }
    });
    var additionalDivisionsAmount = 1;
    var size = isVertical() ? c.height : c.width;
    var endPosition = currentPosition + size + maxDistance * additionalDivisionsAmount;
    var startPosition = currentPosition - currentPosition % maxDistance - maxDistance * additionalDivisionsAmount;

    c.divisions.forEach(function (division) {
      generateDivisions(startPosition, endPosition, division);
    });
    c.texts.forEach(function (textConfig) {
      var additionalTextsAmount = getAdditionalTextsAmount(textConfig);
      var endPosition = currentPosition + size + textConfig.pixelGap * additionalTextsAmount;
      var startPosition = currentPosition - currentPosition % (textConfig.pixelGap) - textConfig.pixelGap * additionalTextsAmount;
      texts.push(generateTexts(startPosition, endPosition, textConfig));
    });
  };

  /**
   * Scrolls ruler to specified position.
   * @param pos left(or top for vertical rulers) position to scroll to.
   */
  this.scrollTo = function (pos) {
    currentPosition = pos;

    if (isVertical()) {
      g.setAttribute('transform', 'matrix(1,0,0,1,0,' + (-currentPosition % maxDistance) + ')');
    } else {
      g.setAttribute('transform', 'matrix(1,0,0,1,' + (-currentPosition % maxDistance) + ',0)');
    }
    for (var i = 0; i < c.texts.length; i++) {
      var textConfig = c.texts[i];
      var textElements = texts[i];
      var offset = currentPosition % maxDistance;
      var startTextPos = currentPosition - offset;
      var additionalTextsAmount = getAdditionalTextsAmount(textConfig);
      for (var j = 0; j < textElements.length; j++) {
        var textElement = textElements[j];
        textElement.textContent = startTextPos + (j - additionalTextsAmount) * textConfig.pixelGap;
      }
    }
  };

  function getAdditionalTextsAmount(config) {
    return Math.floor(maxDistance / config.pixelGap) + 1;
  }

  function generateDivisions(startPosition, endPosition, elementConfig) {
    for (var i = startPosition; i < endPosition; i += elementConfig.pixelGap) {
      var line = createLine(i, elementConfig);
      if (elementConfig.renderer) {
        elementConfig.renderer(line);
      }
      g.appendChild(line);
    }
  }

  function generateTexts(startPosition, endPosition, elementConfig) {
    var texts = [];
    for (var i = startPosition; i < endPosition; i += elementConfig.pixelGap) {
      var text = createText(i, elementConfig);
      g.appendChild(text);
      if (elementConfig.renderer) {
        elementConfig.renderer(text);
      }
      texts.push(text);
    }
    return texts;
  }

  function createLine(pos, elementConfig) {
    switch (elementConfig.type) {
      case 'line':
        return _createLine(pos, elementConfig);
      case 'rect':
        return _createRect(pos, elementConfig);
      default :
        return _createRect(pos, elementConfig);
    }
  }

  function _createLine(pos, elementConfig) {
    var line = document.createElementNS(svgNS, 'line');
    var x1, x2, y1, y2;
    if (isVertical()) {
      x1 = 'y1';
      x2 = 'y2';
      y1 = 'x1';
      y2 = 'x2';
    } else {
      x1 = 'x1';
      x2 = 'x2';
      y1 = 'y1';
      y2 = 'y2';
    }

    line.setAttribute('class', elementConfig.className);
    line.setAttribute(x1, pos);
    line.setAttribute(x2, pos);
    line.setAttribute(y1, '0');
    line.setAttribute(y2, elementConfig.lineLength);
    line.setAttribute('stroke-width', elementConfig.strokeWidth);
    return line;
  }

  function _createRect(pos, elementConfig) {
    var line = document.createElementNS(svgNS, 'rect');
    var x, y, height, width;
    if (isVertical()) {
      x = 'y';
      y = 'x';
      height = 'width';
      width = 'height';
    } else {
      x = 'x';
      y = 'y';
      height = 'height';
      width = 'width';
    }
    line.setAttribute('class', elementConfig.className);
    line.setAttribute(x, pos);
    line.setAttribute(y, '0');
    line.setAttribute(height, elementConfig.lineLength);
    line.setAttribute(width, elementConfig.strokeWidth);
    return line;
  }

  function createText(pos, elementConfig) {
    var textSvg = document.createElementNS(svgNS, 'text');
    var x, y, rotate;
    textSvg.setAttribute('class', elementConfig.className);
    if (isVertical()) {
      x = 'y';
      y = 'x';
      rotate = 'rotate(' + elementConfig.rotation + ' ' + elementConfig.offset + ' ' + pos + ')';
    } else {
      x = 'x';
      y = 'y';
      rotate = 'rotate(' + elementConfig.rotation + ' ' + pos + ' ' + elementConfig.offset + ')';
    }
    textSvg.setAttribute(x, pos);
    textSvg.setAttribute(y, elementConfig.offset);
    textSvg.setAttribute('transform', rotate);
    textSvg.textContent = pos;
    return textSvg;
  }

  function createGroup() {
    return document.createElementNS(svgNS, 'g');
  }

  function isVertical() {
    return c.layout === 'vertical';
  }

  function mergeConfigs(def, cus, notOverrideDef) {
    if (!cus) {
      return def;
    }

    for (var param in cus) {
      if (cus.hasOwnProperty(param)) {
        switch (param) {
          case 'divisionDefaults':
          case 'textDefaults':
            mergeConfigs(def[param], cus[param]);
            break;
          default :
            if (!(notOverrideDef && def[param])) {
              def[param] = cus[param];
            }
        }
      }
    }
    if (def.divisions) {
      def.divisions.forEach(function (entry) {
        mergeConfigs(entry, def.divisionDefaults, entry);
        if (!entry.className) {
          entry.className = entry.type === 'line' ? 'rulez-line' : 'rulez-rect';
        }
      });
    }
    if (def.texts) {
      def.texts.forEach(function (entry) {
        mergeConfigs(entry, def.textDefaults, entry);
      });
    }

    return def;
  }
};
