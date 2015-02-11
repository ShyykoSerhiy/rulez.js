window.addEventListener('load', function () {
  var rulezH = new Rulez({
    element: document.getElementById('svgH'),
    layout: 'horizontal'
  });
  rulezH.render();
  var rulezV = new Rulez({
    element: document.getElementById('svgV'),
    layout: 'vertical',
    texts: [
      {
        pixelGap: 100,
        rotation: 90,
        offset: 20,
        className: 'rulez-text',
        type: 'text'
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