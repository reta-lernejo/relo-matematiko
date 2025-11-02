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

(en preparo)

La ordinaraj reelaj nombroj havas mankon: oni ne povas esprimi radikon el negativaj nombroj. Aparte tio ĝenis en la solvado de kubaj ekvacioj. Tial la matematikisto *Carl Friedrich Gauß* enkondukis *imaginaran* nombron $$i = \sqrt{-1}$$ kiel bazon de la *kompleksaj* nombroj. La kompleksaj nombroj (aŭ *kompleksoj*) formas dudimensian ebenon, la *kompleksan ebenon*:


<style>
    canvas, svg {
        border: 2px solid cornflowerblue;
    }
</style>    

<svg id="kompleksoj"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="640" height="640" viewBox="-320 -320 640 640">
</svg>
<canvas id="kurbo" width="640" height="128"></canvas>

<script>
    const svg = ĝi("#kompleksoj");
    const diag = new KDiag(svg,6,50,musreago);

    // aldonu nombron
    const k1 = diag.nombraĵo("k1",{re: 2, im: 3});

    // montru spure, la ŝanĝojn de la kompleksoj per la muso/fingro
    const canvas = document.getElementById("kurbo");
    const ctx = canvas.getContext("2d");
    const cunuo = 10;
    const r_punkto = 1; // radiuso de punkto
    const re_koloro = "#0095DD"; // koloro de reela parto;
    const im_koloro = "#DD0000"; // koloro de imaginara parto;
    let tempo = 0; // tempo progresas de 0 .. canvas.width

    function musreago(svg_elemento,k) {
        console.log(`punkto: ${k.re}+${k.im}i`);
        punkto(k,ctx);
    }

    // desegnu eron en la kanvaso
    function punkto(k,ctx) {
        // unu ero tipo -1 aŭ 1
        const re = canvas.height/2-k.re*cunuo;
        const im = canvas.height/2-k.im*cunuo;
        if (tempo < canvas.width-r_punkto) {
            tempo += r_punkto;
        } else {
            shiftCanvasContent(ctx,-r_punkto);
        };
        // akso
        ctx.beginPath();
        ctx.arc(tempo, canvas.height/2, r_punkto, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
        // reela parto
        ctx.beginPath();
        ctx.arc(tempo, re, r_punkto, 0, Math.PI * 2);
        ctx.fillStyle = re_koloro;
        ctx.fill();
        // imaginara parto
        ctx.beginPath();
        ctx.arc(tempo, im, r_punkto, 0, Math.PI * 2);
        ctx.fillStyle = im_koloro;
        ctx.fill();
    }

    function shiftCanvasContent(ctx, dx) {
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
        const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.putImageData(imageData, dx, 0); 
    }


</script>

Kompleksan nobron oni povas doni per ortangulaj koordinatoj $$a, b$$ aŭ per polusaj koordinatoj $$r, \phi$$: $$ k = a+b i = r (\cos{\phi} + i \sin{\phi})$$. Ĉe tio la $$r$$ estas la absoluta valoro de la komplekso: $$r = \sqrt{a^2+b^2}$$.

En 1748, la matematikisto *Leonhard Euler*, montris rilaton inter la ekponencialaj kaj la trigonometriaj funkcioj je la konstanto $$e=2,718281828459...$$, kiun por kompleksaj nombroj oni povas esprimi per la eŭlera formulo: $$ r e^{i \phi} = r (\cos{\phi} + i \sin{\phi})$$, el kio sekvas ankaŭ la bela formulo kombinanta tri bazajn matematikajn konstantojn: $$e^{i \pi} = -1$$.

<!--
En fiziko, kompleksaj nombroj estas tre utilaj por priskribi ondojn: la absoluta voloro (la radiuso) esprimas la magnitudon, t.e. la absolutan valoron de la amplitudo, dum la angulo $$\phi$$ esprimas la fazon de la ondo.
-->