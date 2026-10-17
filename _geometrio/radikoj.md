---
layout: laborfolio
title: Diagonaloj kaj radikoj
js:
    - folio-0c
    - sekcio-0b
js-ext: mathjax3
css: 
    - kurbo-0a
---

## La rompita mezurilo
{: .sekcio}

Metiisto iam devis elmezuri ŝrankon. Li konstatis ke la ŝranko estis larĝa kaj profunda unu metron kaj alta du metrojn. En la mezo la ŝranko havis breton, kiu dividis ĝin en du fakojn. Kiam li volis ankoraŭ mezuri la diagonalojn, lia mezurilo rompiĝis.... Li pripensis iom kion fari kaj fine trovis elturnon. Li notis tion por la diagonaloj: $$\sqrt 2$$, $$\sqrt 3$$, $$\sqrt 5$$, $$\sqrt 6$$.

![mezurita ŝranko](../assets/bld/radikoj.png)

Kion li celis esprimi? Nu proksimume tion: "*mia mezurilo rompiĝis, sed la kvadrato de la malgranda diagonalo...*", (t.e la mezuro multiplikita per si mem) "*...devas esti 2, de la granda diagonalo en unu fako 3, tra la tuta ŝranko antaŭe 5 kaj de la malsupra antaŭa angulo al la supra malantaŭa eĉ 6*".

La simbolo √, kiu aspektas kiel rompita mezurilo fakte simbolas literon "r", kaj efektive ne signfas *rompita*, sed *radiko*.

## La kvadrato el la diagonalo
{: .sekcio}

Sed kiel li povas scii, ke la longo de la diagonalo ĉe tabulo $$1m \times 1m$$ havas la longon, kies kvadrato estas 2? Nu, ni
rigardu la sekvan desegnon: la blua kvadrato estas la tabulo kun flankoj longaj je 1m, kaj la ruĝa kvadrato havas
flankojn longaj laŭ ĝia diagonalo. Kiel oni vidas, eblas meti la triangulan duonon de la blua kvadrato kvarfoje en
la ruĝan kvadraton. Ni scias, ke la malgranda kvadrato havas areon $$1m \cdot 1m = 1m^2$$ kaj sekve la ruĝa kvadrato
devas havi la duoblan areon, tio estas $$2m^2$$. Kaj el tio ni scias, ke la longo de ĝia flanko multiplikita per si mem
rezultas en 2.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 204 204" width="50%" height="50%">
  <style>
    .tabulo { fill: rgba(52, 152, 219, 0.2); stroke: #2980b9; stroke-width: 2.5; }
    .diagonalo { stroke: #e74c3c; stroke-width: 2; stroke-dasharray: 6,6; fill: none}
    .blua_linio { stroke: #2980b9; stroke-width: 2; stroke-dasharray: 6,6; fill: none}
    .tabulo_teksto { font-family: sans-serif; font-size: 16px; fill: #2c3e50; font-weight: bold; }
    .diagonalo_teksto { font-family: sans-serif; font-size: 16px; fill: #c0392b; font-weight: bold; }
  </style>

  <!-- fono -->
  <!--rect width="100%" height="100%" fill="#ffffff" / -->

  <!-- kvadrato 100 x 100 cm -->
  <rect x="0" y="100" width="100" height="100" class="tabulo" />

  <!-- kvadrato kun unu flanko estanta la diagonalo de la kvadrato 100x100 -->
  <polygon points="0,100 100,200 200,100 100,0" class="diagonalo" />

  <polyline points="100,0 100,100 200,100" class="blua_linio" />

  <!-- tekstoj -->
  <text x="5" y="155" class="tabulo_teksto">areo = 1 m²</text>
  <text x="35" y="215" class="tabulo_teksto">1 m</text>

  <text x="55" y="88" class="diagonalo_teksto">areo = 2 m²</text>
  <text x="140" y="180" class="diagonalo_teksto" transform="rotate(-45, 140, 180)">√2 m</text>
</svg>
<br>

## La babilona metodo
{: .sekcio}

Nu, "*bele, bele*", vi certe diras, sed la ja mezurilo estas ankoraŭ rompita,
kaj ni ankoraŭ ne scias kiel longa estas la diagonalo. Sed feliĉe la sciencistoj de Babilono jam
antaŭ pli ol tri mil jaroj eltrovis metodon kiel *eltiri* la radikon el areo de kvadrato.

(Ĉar oni ne scias, kiu en Babilono inventis la metodon, sed la greko Herono iom post Kristo priskribis ĝin en
sia libro, oni nomas ĝin ankaŭ *metodo de Herono*.)

Ni komencas per rektangulo kun areo de $$A=1m \cdot 2m = 2m^2$$ kaj premas ĝin tiom longe ĝis ĝi estas
kvadrato:

<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 204 204" width="50%" height="50%">
  <style>
    .kvadrato { fill: rgba(152, 52, 52, 0.2); stroke: #e74c3c; stroke-width: 2; }
    .verda { stroke: #4ce73c; stroke-width: 2.5; stroke-dasharray: 6,6; fill: none}
    .verda_teksto { font-family: sans-serif; font-size: 16px; fill: green; font-weight: bold; }
    .ruĝa_teksto { font-family: sans-serif; font-size: 16px; fill: #c0392b; font-weight: bold; }
  </style>

  <!-- fono -->
  <!--rect width="100%" height="100%" fill="#ffffff" / -->

  <!-- kvadrato 141 x 141 cm -->
  <rect x="0" y="59" width="141" height="141" class="kvadrato" />

  <!-- rektangulo 100 x 200 -->
  <polygon points="0,200 100,200 100,0 0,0" class="verda" />

  <!-- tekstoj -->
  <text x="25" y="45" class="verda_teksto">A = 2 m²</text>
  <text x="20" y="195" class="verda_teksto">x₀ = 1 m</text>
  <text x="10" y="80" class="verda_teksto" transform="rotate(90, 10, 80)">y₀ = 2 m</text>

  <text x="55" y="155" class="ruĝa_teksto" transform="rotate(-45, 55, 155)">A = 2 m²</text>
</svg>

Por tio ni donas al unu flanko la mezvaloron inter longa kaj mallonga flankoj:

$${\displaystyle x_{1}={\frac {x_{0}+y_{0}}{2}}}$$

kaj per la areo elkalkulas la longon de la alia flanko:

$${\displaystyle y_{1}={\frac {A}{x_{1}}}}$$

Tion ni ripetas, ĝis ambaŭ flankoj estas pli malpli samlongaj kaj havas do la longon de
nia serĉata diagonalo.

<script>

lanĉe(() => {
    rekomencu();

    // post valorŝanĝoj rekomencu la kalkulo
    document.getElementById('areo').addEventListener('input', rekomencu);
    document.getElementById('eko').addEventListener('input', rekomencu);
});

butone((ago) => {
    console.log(ago);
    if (ago.startsWith("herono_pa")) sekva();
    if (ago.startsWith("herono_re")) rekomencu();
});

let historyData = [];
let autoInterval = null;
let isAutoRunning = false;

function preparo() {
    const A = parseFloat(document.getElementById('areo').value);
    const x0 = parseFloat(document.getElementById('eko').value);

    if (isNaN(A) || A < 0 || isNaN(x0) || x0 <= 0) {
        return;
    }

    historyData = [];
    // Schritt 0
    const y0 = A / x0;
    historyData.push({
        n: 0,
        x: x0,
        y: y0,
        diff: Math.abs(x0 - y0)
    });

    aktualigo();
}

function sekva() {
    const A = parseFloat(document.getElementById('areo').value);
    if (isNaN(A) || A < 0 || historyData.length === 0) return;

    const last = historyData[historyData.length - 1];
    const nextN = last.n + 1;
    
    // Heron Formeln:
    // x_{n+1} = (x_n + y_n) / 2
    const nextX = (last.x + last.y) / 2;
    const nextY = A / nextX;
    const diff = Math.abs(nextX - nextY);

    historyData.push({
        n: nextN,
        x: nextX,
        y: nextY,
        diff: diff
    });

    aktualigo();
}

function aktualigo() {
    if (historyData.length === 0) return;

    const current = historyData[historyData.length - 1];
    const A = parseFloat(document.getElementById('areo').value);
    const exact = Math.sqrt(A);

    // Hero results
    document.getElementById('x1').textContent = current.x; //.toFixed(10);
    document.getElementById('y1').textContent = current.y; //.toFixed(10);
    document.getElementById('pashoj').textContent = current.n;
    document.getElementById('eraro').textContent = current.diff.toExponential(4);

    // Formula box info
    /*
    document.getElementById('currentValuesDisplay').innerHTML = `
        <div>x<sub>${current.n}</sub> = ${current.x.toFixed(6)}</div>
        <div>y<sub>${current.n}</sub> = ${current.y.toFixed(6)}</div>
        <div>x<sub>${current.n+1}</sub> = (${current.x.toFixed(4)} + ${current.y.toFixed(4)}) / 2</div>
    `;*/

    // Table body
    const tbody = document.getElementById('historio');
    tbody.innerHTML = '';
    
    // Render from newest to oldest or vice versa? Oldest to newest is nice for history.
    historyData.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.className = index === historyData.length - 1 ? 'bg-indigo-50/50 font-medium' : 'hover:bg-slate-50';
        tr.innerHTML = `
            <td class="py-2.5 px-4 text-slate-500 font-mono">${row.n}</td>
            <td class="py-2.5 px-4 font-mono text-slate-900">${row.x.toFixed(9)}</td>
            <td class="py-2.5 px-4 font-mono text-slate-600">${row.y.toFixed(9)}</td>
            <td class="py-2.5 px-4 font-mono text-xs text-slate-500">${row.diff.toExponential(3)}</td>
        `;
        tbody.appendChild(tr);
    });

    //document.getElementById('linioj').textContent = `${historyData.length} paŝoj`;
}

function rekomencu() {
    preparo();
}


</script>

|areo A        | <input id="areo" type="text" value="2">  |
|longo $$x_0$$ | <input id="eko" type="text" value="1">   |

[paŝo➤] [rekomencu]
{: .butonoj #herono}

|paŝoj               |<span id="pashoj">0</span>|
|flanko 1 ($$x_ₙ$$)  |<span id="x1"></span>     |
|flanko 2 ($$A/x_ₙ$$)|<span id="y1"></span>     |
|eraro               |<span id="eraro">0</span> |

<table>
    <thead>
        <tr>
            <th>n</th>
            <th>xₙ (alproksimo)</th>
            <th>yₙ = A/xₙ</th>
            <th>diferenco (eraro)</th>
        </tr>
    </thead>
    <tbody id="historio">
        <!-- ni aldonos la paŝojn tie ĉi -->
    </tbody>
</table>



<!-- Pitagoro, Herono 


aldona demando:

kial oni ne povas trovi diagonalon r7:
($$a^2 + b^2 + c^2 = 7$$)? per unu-kuboj

teoremo de Legendre (https://de.wikipedia.org/wiki/Drei-Quadrate-Satz)
$$a^2 + b^2 + c^2 = n$$ por ĉiuj n, krom se: $$n = 4^k(8m + 7)$$
-->
