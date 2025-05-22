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

    // kreu menuon por la diversaj logikplatoj
    menuo = new LkMenuo("MENU");
    menuo.menueroj("ID","NE","KAJ","NKAJ","AŬ","XAŬ","NEK","EKV");
    const platspecoj = {
      "ID":  IDPlato,
      "NE":  NEPlato,
      "KAJ":  KAJPlato,
      "NKAJ":  NKAJPlato,
      "AŬ":  AŬPlato,
      "XAŬ":  XAŬPlato,
      "NEK":  NEKPlato,
      "EKV": EKVPlato
    }
    menuo.reago((ero) => {
      const PS = platspecoj[ero];
      const plato = new PS();
      panelo.metu_ien(plato);
    });

    panelo.ŝovu(menuo.g,0,-20);
    panelo.svg.append(menuo.g);

    EN = new EnirPlato("EN");
    EN.kunigu(0);
    EN.kunigu(1);
    EN.kunigu(2);
    EN.kunigu(3);
    panelo.metu(EN,0,0);

/*
    NE = new NEPlato("NE");
    panelo.metu(NE,1,1);

    AŬ = new AŬPlato("AŬ");
    panelo.metu(AŬ,1,2);

    ID = new IDPlato("ID");
    panelo.metu(ID,1,4);

    KAJ = new KAJPlato("KAJ");
    panelo.metu(KAJ,3,1);

    NEK = new NEKPlato("NEK");
    panelo.metu(NEK,3,3);

    NKAJ = new NKAJPlato("NKAJ");
    panelo.metu(NKAJ,5,0);

    XAŬ = new XAŬPlato("XAŬ");
    panelo.metu(XAŬ,5,2);

    EKV = new EKVPlato("EKV");
    panelo.metu(EKV,5,4);
*/

/*
    KXA = new KAJXAŬPlato("&/=1");
    SVG.ŝovu(KXA.g,350,50);
*/

    EL = new ElirPlato("EL");
    panelo.metu(EL,7,0);
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
</svg>
