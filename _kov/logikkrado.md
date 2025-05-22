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
    panelo = new LkPanelo(ĝi("#plato"));
    menuo = new LkMenuo("MENU");
    menuo.menueroj("ID","NE","KAJ","NKAJ","AŬ","XAŬ","NEK","EKV");
    panelo.ŝovu(menuo.g,0,-20);
    panelo.svg.append(menuo.g);

    EN = new EnirPlato("EN");
    EN.kunigu(0);
    EN.kunigu(1);
    EN.kunigu(2);
    EN.kunigu(3);
    panelo.metu(EN,0,0);

    NE = new NEPlato("NE");
    //Plato.ligu(EN,1,NE,0);
    //SVG.ŝovu(NE.g,50,50);
    panelo.metu(NE,1,1);

    AŬ = new AŬPlato("AŬ");
    //Plato.ligu(EN,2,AŬ,0);
    //Plato.ligu(EN,3,AŬ,1);
    //SVG.ŝovu(AŬ.g,50,100);
    panelo.metu(AŬ,1,2);

    ID = new IDPlato("ID");
    // Plato.ligu(EN,4,ID,0);
    // SVG.ŝovu(ID.g,50,200);
    panelo.metu(ID,1,4);

    KAJ = new KAJPlato("KAJ");
    //Plato.ligu(NE,0,KAJ,0);
    //Plato.ligu(AŬ,0,KAJ,1);
    //SVG.ŝovu(KAJ.g,150,50);
    panelo.metu(KAJ,3,1);

    NEK = new NEKPlato("NEK");
    //Plato.ligu(AŬ,0,NEK,0);
    //Plato.ligu(ID,0,NEK,1);
    //SVG.ŝovu(NEK.g,150,150);
    panelo.metu(NEK,3,3);

    NKAJ = new NKAJPlato("NKAJ");
    //Plato.ligu(KAJ,0,NKAJ,1);
    //SVG.ŝovu(NKAJ.g,250,0);
    panelo.metu(NKAJ,5,0);

    XAŬ = new XAŬPlato("XAŬ");
    //Plato.ligu(KAJ,0,XAŬ,0);
    //Plato.ligu(NEK,0,XAŬ,1);
    //SVG.ŝovu(XAŬ.g,250,100);
    panelo.metu(XAŬ,5,2);

    EKV = new EKVPlato("EKV");
    //Plato.ligu(NEK,0,EKV,0);
    //SVG.ŝovu(EKV.g,250,200);
    panelo.metu(EKV,5,4);

/*
    KXA = new KAJXAŬPlato("&/=1");
    SVG.ŝovu(KXA.g,350,50);
*/

    EL = new ElirPlato("EL");
    //Plato.ligu(NKAJ,0,EL,0);
    //Plato.ligu(NKAJ,0,EL,1);
    //Plato.ligu(XAŬ,0,EL,2);
    //Plato.ligu(XAŬ,0,EL,3);
    //Plato.ligu(EKV,0,EL,4);
    //Plato.ligu(EKV,0,EL,5);
    //SVG.ŝovu(EL.g,350);
    panelo.metu(EL,7,0);

    //SVG.svg.append(EN.g,EL.g,NE.g,ID.g,KAJ.g,NKAJ.g,AŬ.g,NEK.g,XAŬ.g,EKV.g);
});

</script>


<svg id="plato"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="800" height="640" viewBox="0 -10 400 300">
    <defs>
      <radialGradient id="helrugho">
        <stop offset="10%" stop-color="gold" />
        <stop offset="95%" stop-color="red" />
      </radialGradient>
    </defs>
    <rect width="400" height="300" stroke="none" rx="5" fill="silver"/>
</svg>
