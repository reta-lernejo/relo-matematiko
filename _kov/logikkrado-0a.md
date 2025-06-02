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
    const aranĝo = {
      menuo: ["ID","NE","KAJ","NKAJ","AŬ","XAŬ","NEK","EKV"],
      platoj: [
        ["EN", 0,0],
        ["EL", 7,0],
        ["KAJ", 1,0]
      ]
    }

    panelo = new LkPanelo(ĝi("#plato"), aranĝo);
});

</script>


<svg id="plato"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="800" height="640" viewBox="0 -20 400 320">
    <defs>
      <radialGradient id="helrugho">
        <stop offset="10%" stop-color="gold" />
        <stop offset="95%" stop-color="red" />
      </radialGradient>
    </defs>
</svg>
