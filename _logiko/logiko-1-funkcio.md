---
layout: laborfolio
title: 1 - Logikaj funkcioj
next_ch: logiko-2-algebro
css:
  - logikkrado-0c
js:
  - folio-0c
  - logikkrado-0c
js-ext: mathjax3
---

<!-- helpopaĝoj:
https://de.wikipedia.org/wiki/Boolesche_Funktion
https://en.wikipedia.org/wiki/List_of_logic_symbols
https://de.wikipedia.org/wiki/Logische_Verkn%C3%BCpfung
https://de.wikipedia.org/wiki/Logikgatter
-->

<style>
  dt {
    font-size: 120%;
    background-color: cornflowerblue;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    padding-left: 0.2em;
    margin-top: 0.5em;
  }
  dd {
    border: 2px solid cornflowerblue;
    border-top: none;
    padding: .2em;
  }
  dt, dd {
    display: none;
  }
  dt.malkashita, dd.malkashita {
    display: block;
  }
</style>

<script>

// unuargumentaj logikaj funkcioj
const lf1 = {
  NUL: () => 0,
  UNU: () => 1,
  ID:  (x) => x,
  NE:  (x) => Number(!x)
};
const lf1_dok = {
  NUL: 'f1_nul_unu',
  UNU: 'f1_nul_unu',
  ID:  'f1_id',
  NE:  'f1_ne'
};

// duargumentaj logikaj funkcioj
const lf2 = {
  NUL: () => 0,
  UNU: () => 1, // T (taŭtologio)
  IDx: (x) => x, // x
  IDy: (x,y) => y, // y
  NEx: (x) => Number(!x), // NOTx
  NEy: (x,y) => Number(!y), //NOTy
  SPx: (x,y) => Number(x&&!y), // y subpremas x
  SPy: (x,y) => Number(!x&&y), // x subpremas y
  KAJ: (x,y) => x&&y, // AND
  AŬ: (x,y) => x||y, // OR
  XAŬ: (x,y) => x^y, // XOR x!= y
  IMPL: (x,y) => Number(!(y==0&&x==1)),
  REPL: (x,y) => Number(!(y==1&&x==0)),
  EKV: (x,y) => Number(x==y), //XNOR | NXOR
  NEK: (x,y) => Number(!(x||y)), // NOR
  NKAJ: (x,y) => Number(!(x&&y)) // NAND
}

const lf2_dok = {
  NUL: 'f2_nul_unu',
  UNU: 'f2_nul_unu',
  IDx: 'f2_idx_idy',
  IDy: 'f2_idx_idy',
  NEx: 'f2_nex_ney',
  NEy: 'f2_nex_ney',
  SPx: 'f2_spx_spy',
  SPy: 'f2_spx_spy',
  KAJ: 'f2_kaj_malkaj',
  AŬ: 'f2_au_nek',
  XAŬ: 'f2_ekv_disau',
  IMPL: 'f2_impl_repl',
  REPL: 'f2_impl_repl',
  EKV: 'f2_ekv_disau',
  NEK: 'f2_au_nek',
  NKAJ: 'f2_kaj_malkaj',
}

butone((ago) => {
  console.log(ago);

  dl_kaŝu = () => {
    ĉiuj('dt,dd').forEach((d_) => {
      d_.classList.remove('malkashita');
    });
  };
  dl_malkaŝu = (id) => {
    dt = ĝi('#'+id);
    if (dt) {
      dt.classList.add('malkashita');
      let dd = dt.nextElementSibling;
      while (dd && dd.tagName == 'DD') {
        dd.classList.add('malkashita');
        dd = dd.nextElementSibling;
      }
    }
  }

  [f_aro,f] = ago.split('_');

  // unuargumentaj funkcioj
  if (f_aro == 'lf1') {
    // montru priskribon
    dl_kaŝu();
    dl_malkaŝu(lf1_dok[f]);

    const th = ĝi("#tabelo1 thead tr");
    // nomo de la funkcio
    th.children[1].textContent = f;
    // valoroj de la funkcio en la dua kolumno
    ĉiuj("#tabelo1 tbody tr").forEach((tr) => {
      const x = parseInt(tr.children[0].textContent)
      const td2 = tr.children[1];
      td2.textContent = lf1[f](x)
    });

  // duargumentaj funkcioj
  } else if (f_aro == 'lf2') {
    // montru priskribon
    dl_kaŝu();
    dl_malkaŝu(lf2_dok[f]);

    const th = ĝi("#tabelo2 thead tr");
    // nomo de la funkcio
    th.children[2].textContent = f;
    // valoroj de la funkcio en la dua kolumno
    ĉiuj("#tabelo2 tbody tr").forEach((tr) => {
      const x = parseInt(tr.children[0].textContent)
      const y = parseInt(tr.children[1].textContent)
      const td2 = tr.children[2];
      td2.textContent = lf2[f](x,y)
    });
  }
})
</script>

Tio ĉi estas epitoma laborfolio, ne lernolibro, nek deviga terminaro aŭ kompleta kompendio.
Mi tie ĉi notis informojn pri nocioj, kiujn mi iam devis lerni por ekzameno.

## Logikaj funkcioj

En la klasika logiko oni laboras nur per du diversaj valoroj: *vera* kaj *malvera*, aŭ 0 kaj 1.
Logikaj funkcioj bildigas variablojn, kiuj havas unu el du valoroj, al tiuj du valoroj denove.
Ekzemple `NE` estas unuargumenta logika funkcio, kiu bildigas 0 al 1 kaj 1 al 0,
oni ĝin signas per superstreketo: $$ \overline{0}=1 $$. Duargumentaj, logikaj
funkcioj estas `KAJ` kaj `AŬ`.

Ekzistas kvar unu-argumentaj logikaj funkcioj:

[NUL] [UNU] [ID] [NE]
{: .butonoj #lf1}

{: #f1_nul_unu}`NUL` kaj `UNU`
: La funkcioj `NUL` kaj `UNU` ignoras la argumenton kaj ĉiam rezultas en 0 (malvera) respektive 1 (vera). Do efektive ili povas esti konsiderataj kiel senargumentaj funkcioj. Cetere oni nomas esprimon, kiu ĉiam estas malvera *kontraŭdiro* ($$\bot$$). Esprimon ĉiam veran oni ankaŭ nomas *taŭtologio* ($$\top$$).

{: #f1_id}`ID`
: La funkcio `ID` (idento) ĉiam redonas la argumenton senŝanĝe.

{: #f1_ne}`NE`
: La funkcio `NE` - neg(aci)o, ĉiam redonas la kontraŭon de la argumento. Oni povas signi ĝin per $$\lnot$$, sed ni ĉi tie uzas alternative la superstrekon, kiu koncizigas esprimon kun pluraj aplikaj de funkcio `NE`. En programlingvo oni povas realigi ĝin per `(x) => !x ` aŭ per `(x) => 1-x`.

|x|f(x)|
|-|-|
|0||
|1||
{: #tabelo1 style="width:min-content"}


Entute ekzistas 16 diversaj du-argumentaj logikaj funkcioj, jen elekto:

[NUL] [UNU] [IDx] [NEx] [IDy] [NEy] [SPx] [SPy] [KAJ] [NKAJ] [AŬ] [NEK] [IMPL] [REPL] [EKV] [XAŬ]
{: .butonoj #lf2}

{: #f2_nul_unu}`NUL` kaj `UNU`
: La duargumentaj funkcioj `NUL` (kontraŭdiro) kaj `UNU` (taŭtologio) ne dependas de siaj argumentoj. Ni jam pritraktis ilin sub la unuargumentaj. Ili aperas tie ĉi pro kompleteco.

{: #f2_idx_idy}`IDx` kaj `IDy`
: La idento-funkcioj `IDx` kaj `IDy` ignoras unu el siaj argumentoj kaj funkcias kiel unuargumenta idento sur la argumento x respektive y.

{: #f2_nex_ney}`NEx` kaj `NEy`
: La neaj funkcioj `NEx` ($$\overline{x}$$) kaj `NEy` ($$\overline{y}$$) ignoras unu el siaj argumentoj kaj funkcias kiel unuargumenta negacio sur la argumento x respektive y.

{: #f2_spx_spy}`SPx` kaj `SPy`
: Ĉe la funkcio `SPx` (subpremo de x, alinome inhib(ici)o de x), la argumento y, se vera, subpremas, t.e. nuligas, malverigas, la valoron de x. La funkcio `SPy` (subpremo de y) inversigas la rolon de ambaŭ argumentoj. En programlingvo oni povas realigi `SPx` per `(x,y) => x && !y` aŭ per `(x,y) => x > y`.

{: #f2_kaj_malkaj}`KAJ` kaj `NKAJ`
: La funkcio `KAJ` (konjunkcio, AND) estas vera nur, se ambaŭ argumentoj estas veraj. Ni simboligas ĝin per la kutima signo $$\land$$. En programlingvo oni povas realigi ĝin per `(x,y) => x && y` aŭ per `(x,y) =>  x*y`. 
: La funkcio `NKAJ` (ekskludo, malkaj, ankaŭ NAND aŭ Ŝeferfunkcio laŭ *Henry Maurice Sheffer*) estas ĉiam vera, krom se ambaŭ argumentoj estas veraj. Alivorte ĝi estas la negacio de `KAJ`. Oni povas simboligi ĝin per $$x\mid y$$ aŭ $$x\barwedge y$$. En programlingvo oni povas realigi ĝin per `(x,y) => ! (x && y)` aŭ `(x,y) =>  1 - x*y`.

{: #f2_au_nek}`AŬ` kaj `NEK`
: La funkcio `AŬ` (inkluziva disjunkcio, OR) estas vera, se alemanŭ unu el ĝiaj argumentoj estas vera. Ni simboligas ĝin per la kutima signo $$\lor$$. En programlingvo oni povas realigi ĝin per `(x,y) => x || y`, `(x,y) => x+y > 0` aŭ per `(x,y) => x + y - x*y`.
: La funkcio `NEK` (NOR, nihilo, funkcio de Peirce) estas vera nur, se nek x nek y estas veraj. Ĝia simbolo estas $$⊽$$ kaj oni povas programlingve realigi ĝin per `(x,y) => !(x||y)` aŭ `(x,y) => x+y == 0`.

{: #f2_impl_repl}`IMPL` kaj `REPL`
: La funkcio `IMPL` (implico) estas malvera nur, se x estas vera, sed y estas malvera: *Se pluvas, mi ĉiam restas hejme*. Oni simboligas ĝin per $$\implies$$ kaj programlingve povas esprimi ĝin per `(x,y) => x<=y`. 
: La funkcio `REPL` (inversa implico, reimplico, replikacio) estas malvera, se y estas vera, sed ne x: *Nur se estas bela vetero (x), foje mi promenas (y)*. Do x esprimas necesan kondiĉon, por ke y estu vera. Oni uzas la simbolon $$\Leftarrow$$ kaj realigas ĝin en programo ekzemple per `(x,y) => x>=y`.

{: #f2_ekv_disau}`EKV` kaj `XAŬ`
: La funkcio `EKV` (XNOR, NXOR, XAND, ekvivalento, duobla implico) estas vera nur, se ambaŭ x kaj y havas la saman valoron. Oni uzas la simbolon $$\iff$$ 
aŭ $$\odot$$ kaj programlingve esprimas ĝin per `(x,y) => x==y`.
: La funkcio `XAŬ` (ekskluziva disjunkcio, XOR) estas vera, se nur unu el ambaŭ argumento estas vera. Ĝia simbolo estas $$\oplus$$ aŭ $$\veebar$$ kaj oni povas programlingve realigi ĝin per `(x,y) => x^y` aŭ per `(x,y) => x != y`.



|x|y|f(x,y)|
|-|-|-|
|0|0||
|0|1||
|1|0||
|1|1||
{: #tabelo2 style="width:min-content"}

## Supermetado de funkcioj

Oni per supermetado de logikaj funkcioj povas ricevi novajn. Ekzemple oni povas ricevi la logikan funkcion 
`KAJ` per supermetado de la du funkcioj `NE` kaj `AŬ`: $$ x \lor y = \overline{\overline{x} \land \overline{y}} $$.

<!-- klarigu skribmanierojn \land - similas majusklan A, \lor similas la "u" resp. la hoketon super "ŭ",
oni povas forlasi \land kaj skribi "ab"; \overline oni povas ankaŭ skribi \lnot, sed tio estas malpli konciza -->

<script>


lanĉe(() => {
    const aranĝo = {
      menuo: ["NE","KAJ","AŬ"],
      platoj: [
        ["EN",  0,0],
        ["EL",  7,0],
        ["KAJ", 1,0],
        ["NE",  1,2],
        ["NE",  1,3],
        ["AŬ",  3,2],
        ["NE",  5,2],
        ["NE",  5,3],
      ]
    }

    panelo = new LPanelo(ĝi("#plato"), aranĝo);
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
