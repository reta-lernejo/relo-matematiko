---
layout: laborfolio
title: Logik-krado
css:
  - logikkrado-0d
js:
  - folio-0c
  - logikkrado-0d
---

<!-- 
https://de.wikipedia.org/wiki/Logikgatter

-->

<script>

lanĉe(() => {

  const aranĝo = {
    menuo: ["xy","xyz","ID0","ID1","NE","KAJ","NKAJ","AŬ","XAŬ","NEK","EKV"],
    platoj: [
      ["xyz", 0,0],
      ["EL", 7,0],
      ["KAJ", 1,0],
      ["KAJXAŬ",3,3]
    ]
  }  
  const panelo = new LPanelo(ĝi("#panelo"),aranĝo);

/*
  const en = new LEnirPlato("EN");
  //EN.markebla = false;
  // PLIBONIGU:
  // kiel agordi tion per la aranĝo?
  en.kunigu(0);
  en.kunigu(1);
  en.kunigu(2);
  en.kunigu(3);
  panelo.metu(en,0,0);

  const ne = new LPordPlato("NE",NE); // | for_mov<<16);
  panelo.metu(ne,3,0);    

  const kaj = new LPordPlato("KAJ",KAJ); // | for_mov<<16);
  panelo.metu(kaj,3,1);    

  const nek = new LPordPlato("NEK",NEK); // | for_mov<<16);
  panelo.metu(nek,3,3);    

  const nkaj = new LPordPlato("NKAJ",NKAJ); // | for_mov<<16);
  panelo.metu(nkaj,5,0);    

  const aŭ = new LPordPlato("AŬ",AŬ); // | for_mov<<16);
  panelo.metu(aŭ,5,2);    

  const xaŭ = new LPordPlato("XAŬ",XAŬ); // | for_mov<<16);
  panelo.metu(xaŭ,5,4);    

  const ekv = new LPordPlato("EKV",EKV); // | for_mov<<16);
  panelo.metu(ekv,1,0);    

  const idx = new LIDPlato("IDx",0); // | for_mov<<16);
  panelo.metu(idx,1,2);    

  const idy = new LIDPlato("IDy",1); // | for_mov<<16);
  panelo.metu(idy,1,4);    

  const da = new LPordPlato("KAJXAŬ",KAJXAŬ,"&/=1"); // | for_mov<<16);
  panelo.metu(da,1,4);    

  const el = new LElirPlato("EL");
  panelo.metu(el,7,0);    
*/
});

</script>


<svg id="panelo"
    version="1.1" xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="800" height="640" viewBox="0 -20 400 320">
    <defs>
      <radialGradient id="helrugho">
        <stop offset="10%" stop-color="gold" />
        <stop offset="95%" stop-color="red" />
      </radialGradient>
    </defs>
</svg>
