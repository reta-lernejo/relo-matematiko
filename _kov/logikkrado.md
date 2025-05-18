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
    EN.kunigu(0);
    EN.kunigu(1);
    EN.kunigu(2);
    EN.kunigu(3);

    NE = new NEKrado("NE");
    Krado.ligu(EN,1,NE,0);
    SVG.ŝovu(NE.g,50,50);

    AŬ = new AŬKrado("AŬ");
    Krado.ligu(EN,2,AŬ,0);
    Krado.ligu(EN,3,AŬ,1);
    SVG.ŝovu(AŬ.g,50,100);

    ID = new IDKrado("ID");
    Krado.ligu(EN,4,ID,0);
    SVG.ŝovu(ID.g,50,200);

    KAJ = new KAJKrado("KAJ");
    Krado.ligu(NE,0,KAJ,0);
    Krado.ligu(AŬ,0,KAJ,1);
    SVG.ŝovu(KAJ.g,150,50);

    NEK = new NEKKrado("NEK");
    Krado.ligu(AŬ,0,NEK,0);
    Krado.ligu(ID,0,NEK,1);
    SVG.ŝovu(NEK.g,150,150);

    NKAJ = new NKAJKrado("NKAJ");
    Krado.ligu(KAJ,0,NKAJ,1);
    SVG.ŝovu(NKAJ.g,250,0);

    XAŬ = new XAŬKrado("XAŬ");
    Krado.ligu(KAJ,0,XAŬ,0);
    Krado.ligu(NEK,0,XAŬ,1);
    SVG.ŝovu(XAŬ.g,250,100);

    EKV = new EKVKrado("EKV");
    Krado.ligu(NEK,0,EKV,0);
    Lk.a(EKV.g,{transform: 'scale(.5)'});
    SVG.ŝovu(EKV.g,250,200);
/*
    KXA = new KAJXAŬKrado("&/=1");
    SVG.ŝovu(KXA.g,350,50);
*/

    EL = new ElirKrado("EL");
    Krado.ligu(NKAJ,0,EL,0);
    Krado.ligu(NKAJ,0,EL,1);
    Krado.ligu(XAŬ,0,EL,2);
    Krado.ligu(XAŬ,0,EL,3);
    Krado.ligu(EKV,0,EL,4);
    Krado.ligu(EKV,0,EL,5);
    SVG.ŝovu(EL.g,350);

    SVG.svg.append(EN.g,EL.g,NE.g,ID.g,KAJ.g,NKAJ.g,AŬ.g,NEK.g,XAŬ.g,EKV.g);
});

</script>


<svg id="plato"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="800" height="600" viewBox="0 0 400 300">
    <defs>
    <!--
      <linearGradient id="helrugho" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#DD0000;stop-opacity:1" />
        <stop offset="20%" style="stop-color:#FF4511;stop-opacity:1" />
        <stop offset="55%" style="stop-color:#FFBBDD;stop-opacity:1" />
        <stop offset="80%" style="stop-color:#FF4511;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#DD0000;stop-opacity:1" />
      </linearGradient> -->
      <radialGradient id="helrugho">
        <stop offset="0%" style="stop-color:#FFFACD;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#FF4500;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#FF2222;stop-opacity:1" />
      </radialGradient>      
    </defs>
    <rect width="400" height="300" stroke="none" rx="5" fill="silver"/>
</svg>
