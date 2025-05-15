---
layout: laborfolio
title: Logik-krado
js:
  - folio-0c
  - logikkrado-0a
---

<!-- 
https://de.wikipedia.org/wiki/Logikgatter

-->

<script>

lanĉe(() => {
    SVG = new LkSVG(ĝi("#plato"));

    NE = new NEKrado("NE");
    KAJ = new KAJKrado("KAJ");
    
    SVG.ŝovu(KAJ.g,100);
    SVG.svg.append(NE.g,KAJ.g);
});

</script>


<svg id="plato"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="900" height="600" viewBox="0 0 300 200">
    <rect width="300" height="200" stroke="black" fill="none"/>
</svg>
