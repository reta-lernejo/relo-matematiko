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

    EN = new EnirKrado("EN");
    EL = new ElirKrado("EL");
    SVG.ŝovu(EL.g,350);

    NE = new NEKrado("NE");
    SVG.ŝovu(NE.g,50,50);

    ID = new IDKrado("ID");
    SVG.ŝovu(ID.g,50,200);

    KAJ = new KAJKrado("KAJ");   
    SVG.ŝovu(KAJ.g,150,50);

    NKAJ = new NKAJKrado("NKAJ");   
    SVG.ŝovu(NKAJ.g,250,0);

    AŬ = new AŬKrado("AŬ");   
    SVG.ŝovu(AŬ.g,50,100);

    NEK = new NEKKrado("NEK");   
    SVG.ŝovu(NEK.g,150,150);

    XAŬ = new XAŬKrado("XAŬ");   
    SVG.ŝovu(XAŬ.g,250,100);

    EKV = new EKVKrado("EKV");   
    SVG.ŝovu(EKV.g,250,200);
/*
    KXA = new KAJXAŬKrado("&/=1");
    SVG.ŝovu(KXA.g,350,50);
*/
    SVG.svg.append(EN.g,EL.g,NE.g,ID.g,KAJ.g,NKAJ.g,AŬ.g,NEK.g,XAŬ.g,EKV.g);
});

</script>


<svg id="plato"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="800" height="600" viewBox="0 0 400 300">
    <rect width="400" height="300" stroke="black" fill="none"/>
</svg>
