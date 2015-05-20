#Rulez.js

Rulez.js is a javascript library for showing svg based customizable rulers. It generates divisions and texts once and
 only for visible area.

##Instalation

Download the [minified library](https://raw.githubusercontent.com/ShyykoSerhiy/rulez.js/master/dist/js/rulez.min.js) or 
use bower to install it.
````sh
bower install rulez.js
````

and include it in your html.

````html
<script type="text/javascript" src="bower_components/rulez.js/dist/js/rulez.min.js"></script>
````

##Usage

###Basic usage

Horizontal ruler 
````js
var someSvgElement = document.getElementById('someSvgElementId');
var rulez = new Rulez({
    element: someSvgElement,
});
rulez.render();
````
Vertical ruler
````js
var someSvgElement = document.getElementById('someSvgElementId');
var rulez = new Rulez({
    element: someSvgElement,
    layout: 'vertical'
});
rulez.render();
````

###Alignment

Every horizontal ruler can be aligned to top or bottom (default is 'top'): 
````js
var someSvgElement = document.getElementById('someSvgElementId');
var rulez = new Rulez({
    element: someSvgElement,
    alignment: 'bottom'
});
rulez.render();
````

Every vertical ruler can be aligned to left or right (default is 'left'): 
````js
var someSvgElement = document.getElementById('someSvgElementId');
var rulez = new Rulez({
    element: someSvgElement,
    layout: 'vertical'
    alignment: 'left'
});
rulez.render();
````

###Customizing rulers
Internally rulez.js use default config, but you can override it by passing more parameters in constructor.
There is only one limitation to remember : maximum pixelGap used for divisions must be dividable by all other 
pixelGaps (pixelGaps of texts are included also). For example, next config is ok:
````js
var rulez = new Rulez({
    ...
    divisions: [
        {
            pixelGap: 25,
            lineLength: 10
        },
        {
            pixelGap: 100,
            lineLength: 20
        }
    ],
    texts: [
        {
            pixelGap: 5
        },
        {
            pixelGap: 25
        },
        {
            pixelGap: 50
        }
    ]
});
````  
max pixelGap of divisions is 100 and it's dividable by every other pixelGap used in config(25, 5, 25, 50).
Ruler with the next one config may be rendered incorrectly if scrollTo method is used:
````js
var rulez = new Rulez({
    ...
    divisions: [
        {
            pixelGap: 25,
            lineLength: 10
        },
        {
            pixelGap: 100,
            lineLength: 20
        }
    ],
    texts: [
        {
            pixelGap: 6
        },
        {
            pixelGap: 25
        },
        {
            pixelGap: 50
        }
    ]
});
```` 
max pixelGap of divisions is 100 and it's NOT dividable by 6.

####Specifying units
By default rulez.js uses 'user' units(px). This can be changed by specifying units param in config.
  Possible values for units: 'em', 'ex', 'px', 'pt', 'pc', 'cm', 'mm', 'in' and ''(user units)
  [svg units spec](http://www.w3.org/TR/SVG/coords.html#Units). Note that those units will be used for all
  params for divisions and texts(pixelGap, lineLength, strokeWidth, etc).
      
````js
var rulez = new Rulez({
    units: 'pt'
});
````

Units conversion rate (how many pixels is in one specified unit) can be retrieved using method getUnitConversionRate
````js
var rulez = new Rulez({
    units: 'pt'
});
var unitsConversionRate = rulez.getUnitConversionRate();
````

####Customizing divisions
Divisions can be changed by providing array of divisions config objects
````js
var rulez = new Rulez({
    ...
    divisions: [
        {
            pixelGap: 25,
            lineLength: 10
        },
        {
            pixelGap: 100,
            lineLength: 20
        }
    ]
});
````
The code above means that ruler will be created with two different division types:
 1. Long ones(20px) with big gap between them(100px).
 2. Short ones(10px) with small gap between them(25px)

Other parameters that can be changed are 
````js
    strokeWidth : 1,// width of division
    className: 'someClassName',// css class applied to every division
    type: 'rect',// 'rect' or 'line': type of svg element used to render division
    renderer: function(division){// function that is called when division is added to ruler
      division.doSomething();
    }
````
  
####Customizing texts

Texts can be changed by providing array of texts config objects
````js
var rulez = new Rulez({
    ...
    texts: [
        {
            pixelGap: 50
        },
        {
            pixelGap: 100
        }
    ]
});
````

The code above means that ruler will be created with two different texts types:
 1. Texts with big gap between them(100px).
 2. Texts with smaller gap between them(50px)

Other parameters that can be changed are 
````js
className: 'someClassName'// css class applied to every text
offset: 20,//offsets of texts in pixels
rotation:90,//rotation in degrees of texts
showUnits:true,//Wherever to show or not to show units alongside text
renderer: function(text){// function that is called when text is added to ruler
  text.doSomething();
}
````  

####Default configs
It's possible to use default configs that will used for all texts and divisions if they not specify parameters on their 
own. Any parameters that can be used for divisions or texts are also applicable for default configs.
````js
divisionDefaults: {
    strokeWidth: 1,
    type: 'rect',
    className: 'rulez-rect'
},
textDefaults: {
    rotation: 0,
    offset: 25,
    className: 'rulez-text'
}
````

###Scrolling rullers to a specific position
Every ruller can be scrolled to a specific position by using
````js
ruler.scrollTo(<left (top for vertical rulers) position in pixels>, {boolean} useUnits);
/* example */
ruler.scrollTo(100);
````

###Resizing
If width(height for vertical) is increased you'll need to resize ruler by calling resize 
method.
````js
ruler.resize();
````

###Scaling
For scaling of ruler method setScale can be used. Internally it multiples text's value by provided scaleValue.
````js
ruler.setScale(<left (top for vertical rulers) position in pixels>);
/* example */
ruler.setScale(100);
````

###Text centering 
Starting from v0.1.0 text elements are centered by default. 
````js
textDefaults: {
    rotation: 0,
    offset: 25,
    className: 'rulez-text',
    centerText: {
        by: 'width',
        operation: 'sum' //'sum' or 'sub'
    } 
}
````
Possible values for 'by': 
* 'width' - calculations are made by accessing textElement.getBoundingClientRect().width property
* 'height' - calculations are made by accessing textElement.getBoundingClientRect().height property
Possible values for 'operation':
* 'sum' textElement.getBoundingClientRect()[by]/2 will be added to original position
* 'sub' textElement.getBoundingClientRect()[by]/2 will be subtracted  from original position

###Saving as image
Ruler can be saved as image(png base64)
````js
rulezH.saveAsImage(function(resultImg){
    var img = new Image();
    img.src = resultImg;
    document.body.appendChild(img);
});
````
[MIT License](http://opensource.org/licenses/mit-license.php).
