#Rulez.js

Rulez.js is a javascript library for showing svg based customizable rulers. 

##Bower package

````sh
bower install rulez.js
````

##Usage

###Necessary files

Download the [minified library](https://raw.githubusercontent.com/ShyykoSerhiy/rulez.js/master/dist/js/rulez.min.js) and include it in your html. Alternatively use bower to install it.
````html
<script type="text/javascript" src="bower_components/rulez.js/dist/js/rulez.min.js"></script>
````

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
###Customizing rulers
Internally rulez.js use default config, but you can override it by passing more parameters in constructor.
There is only one limitation to remember : all maximum pixelGap used for divisions must be dividable by all other 
pixelGaps used (pixelGaps of texts are included also).  

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
The code above means, that will be created with two different division types:
 1. Long ones(20px) with big gap between them(100px).
 2. Short ones(10px) with small gap between them(25px)

Other parameters that can be changed are 
````js
    strokeWidth : 1,// width of division
    className: 'someClassName',// css class applied to every division
    type: 'rect'// 'rect' or 'line': type of svg element used to render division
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

The code above means, that will be created with two different texts types:
 1. Texts with big gap between them(100px).
 2. Texts with smaller gap between them(50px)

Other parameters that can be changed are 
````js
    className: 'someClassName'// css class applied to every text
    offset: 20,//offsets of texts in pixels
    rotation:90//rotation in degrees of texts
````  

####Default configs
It's possible to use default configs that will used for all texts and divisions if they not specify parameters on their own. Any parameters that can be used for divisions or texts are also applicable for default configs.
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
Every ruller can be scrolled to a speciffig postion using
````js
ruler.scrollTo(<left (top for vertical rulers) position in pixels>);
/* example */
ruler.scrollTo(100);
````

[MIT License](http://opensource.org/licenses/mit-license.php).
