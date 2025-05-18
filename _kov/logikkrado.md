---
layout: laborfolio
title: Logik-krado
css:
  - logikkrado-0a
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
    SVG.ŝovu(NE.g,0,50);

    ID = new IDKrado("ID");
    SVG.ŝovu(ID.g,0,200);

    KAJ = new KAJKrado("KAJ");   
    SVG.ŝovu(KAJ.g,100,50);

    NKAJ = new NKAJKrado("NKAJ");   
    SVG.ŝovu(NKAJ.g,200,0);

    AŬ = new AŬKrado("AŬ");   
    SVG.ŝovu(AŬ.g,0,100);

    NEK = new NEKKrado("NEK");   
    SVG.ŝovu(NEK.g,100,150);

    XAŬ = new XAŬKrado("XAŬ");   
    SVG.ŝovu(XAŬ.g,200,100);

    EKV = new EKVKrado("EKV");   
    SVG.ŝovu(EKV.g,300,150);

    KXA = new KAJXAŬKrado("&/=1");
    SVG.ŝovu(KXA.g,300,50);

    SVG.svg.append(NE.g,ID.g,KAJ.g,NKAJ.g,AŬ.g,NEK.g,XAŬ.g,EKV.g,KXA.g);
});

</script>


<svg id="plato"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="900" height="600" viewBox="0 0 450 300">
    <rect width="450" height="300" stroke="black" fill="none"/>
</svg>
