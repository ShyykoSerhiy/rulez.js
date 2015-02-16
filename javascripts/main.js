window.addEventListener('load', function () {
  var rulezH = new Rulez({
    element: document.getElementById('svgH'),
    layout: 'horizontal',
    divisionDefaults: {
      className: 'rulez-rect rulez-grey'
    },
    texts: [
      {
        offset: 30,
        pixelGap: 100,
        className: 'rulez-text rulez-grey'
      }
    ]
  });
  rulezH.render();
  var rulezV = new Rulez({
    element: document.getElementById('svgV'),
    layout: 'vertical',
    divisionDefaults: {
      className: 'rulez-rect rulez-grey'
    },
    texts: [
      {
        pixelGap: 100,
        rotation: 90,
        offset: 25,
        className: 'rulez-text rulez-grey'
      }
    ]
  });
  rulezV.render();
  var scroll = window;
  scroll.addEventListener('scroll', function () {
    rulezH.scrollTo(scroll.scrollX);
    rulezV.scrollTo(scroll.scrollY);
  });

});