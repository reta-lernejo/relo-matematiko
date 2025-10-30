---
layout: laborfolio
title: Kompleksaj nombroj
js:
    - folio-0c
    - kompleks-0a
js-ext: mathjax3
css: 
    - kompleks-0a
---

La ordinaraj reelaj nombroj havas mankon: oni ne povas esprimi radikon el negativaj nombroj. Aparte tio ĝenis en la solvado de kubaj ekvacioj. Tial la matematikisto *Carl Friedrich Gauß* enkondukis *imaginaran* nombron $$i = \sqrt{-1}$$ kiel bazon de la *kompleksaj* nombroj. La kompleksaj nombroj (aŭ *kompleksoj*) formas dudimensian ebenon, la *kompleksan ebenon*:

<svg id="kompleksoj"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="640" height="640" viewBox="-320 -320 640 640">
</svg>

<script>
    const svg = ĝi("#kompleksoj");
    const diag = new KDiag(svg,6,50);

    // aldonu nombron
    const k1 = diag.nombraĵo("k1",{re: 2, im: 3});
</script>

En fiziko, kompleksaj nombroj estas tre utilaj por priskribi ondojn: la absoluta vaoloro (la radiuso) esprimas la magnitudon, t.e. la absolutan valoron de la amplitudo, dum la angulo phi esprimas la fazon de la ondo.