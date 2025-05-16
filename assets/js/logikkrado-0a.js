
/**
 * Klaso kiu tenas la elementon <svg> de vektordesegnaĵo kaj ofertas kelkajn aldonajn utilfunkciojn.
 */
class LkSVG {
    
    constructor(svg) {
        this.svg = svg;
    }

    /**
     * Trovas SVG-elementon per CSS-elektilo
     */
    trovu(elektilo) {
        return this.svg.querySelector(elektilo)
    }

    /** 
     * Ŝovas elementon uzante atributon transform al nova pozicio (dx,dy)
     * KOREKTU: tiu ĉi kaj kelkaj malsupraj ne temas pri la SVGElemento, do eble metu en klason "Lab"
     * kiel "static". Aŭ eble eĉ kunigu ambaŭ klasojn...?
     */
    ŝovu(elm, x, y=0) {
        if (x || y)
            Lk.a(elm, {transform: `translate(${x} ${y})`});
    }

    /**
     * desegnu simbolon id ĉe (x,y) 
     */
    /*
    simbol_uzo(id,x,y) {
        const use = this.kreu("use", {
            href: "#"+id,
            x: x,
            y: y
        });
        this.svg.append(use);
    } */   

    /**
     * redonas elementon defs (kreante ĝins se ankoraŭ mankas)
     */
    difinoj() {
        let defs = this.svg.querySelector("defs");
        if (!defs) {
            defs = Lab.e("defs");
            this.svg.prepend(defs);
        }
        return defs;
    }


    /**
     * Kunigas padon el du koordinalistoj xj kaj yj
     * Oni povas ŝovi ĉiun koordinaton je konstanta xp,yp
     * Oni povas doni la opearcion por atingi la unua koordinaton per op (L,M...)
     */
    static xy_pado(xj,yj,op='M',xp=0,yp=0) {
        if (xj.length != yj.length) throw "Nombro de koordinatoj diferencas!";
        let kun = `${op}${xj[0]+xp},${yj[0]+yp}`;
        for (let i=1; i<xj.length; i++) {
            kun += `L${xj[i]+xp},${yj[i]+yp}`
        }
        return kun;
    }

    /**
     * Speguligas la koordinatojn ĉe donita koordinato
     */
    static kspegul(kj,k0) {
        return kj.map(k => k0-(k-k0))
    }
}


class Lk {

    /** Kreas SVG-elementon kun atributoj
     * @param nomo elementnomo, ekz-e 'div'
     * @param atributoj objekto kies kampoj estas la atributnomoj kaj ties valoroj
     */
    static e(nomo, atributoj, teksto) {
        const ns = "http://www.w3.org/2000/svg";
        const el = document.createElementNS(ns, nomo);
        if (atributoj) {
            for (const [atr,val] of Object.entries(atributoj)) {
                el.setAttribute(atr,val);
            }
        };
        if (teksto) el.textContent = teksto;
        return el;
    }


    /**
     * Aldonas aŭ ŝanĝas atributojn de SVG-DOM-elemento
     * 
     * @param elemento la DOM-elemento 
     * @param atributoj objekto kies kampoj estas la atributnomoj kaj ties valoroj
     * @returns 
     */
    static a(elemento, atributoj) {
        if (atributoj) {
            for (const [atr,val] of Object.entries(atributoj)) {
                elemento.setAttribute(atr,val);
            }
        };
        return elemento;
    }


    /**
     * Aldonas idon al SVG-elemento. Se jam ekzistas tia kun
     * la donita nomo, tion ni forigos unue
     * @param {*} elm 
     * @param {*} id 
     * @param {*} nom 
     */
    static ido(elm, id, nom) {
        const malnov = document.getElementById(nom);
        if (malnov) malnov.remove();

        id.setAttribute("id",nom);
        elm.append(id);
    }
}

class Krado {
    constructor(id, klaso="logikkrado") {
        this.id = id;

        // SVG grupo-elemento, kiu entenas la grafikon de la ilo
        this.g = Lk.e("g",{
            id: id,
            class: klaso
        });    
        
        const r = Lk.e("rect",{
            class: "plato",
            height: 100,
            width: 100,
            rx: 6,
        });
        this.g.append(r)
    }

    aldonu(...pecoj) {
        pecoj.forEach((p) => this.g.append(p.g));
    }

    nomo(nom) {
        const t = Lk.e("text",{
            x: 10,
            y: 15,
        },nom);
        this.g.append(t);
    }


    eliro(x=90,y1=10,y2=70) {
        const p = Lk.e("path",{
            d: `M96 ${y1}L${x} ${y1}L${x} ${y2}L96 ${y2}M${x} ${y2}L${x} 95`
        });
        const c1 = Lk.e("circle",{
            class: "kontakto",
            cx: 98,
            cy: y1,
            r: 2
        });        
        const c2 = Lk.e("circle",{
            class: "kontakto",
            cx: 98,
            cy: y2,
            r: 2
        });        
        this.g.append(p,c1,c2);
    }

    vdrato(x,y,l) {
        const p = Lk.e("path",{
            d: `M${x} ${y}l0 ${l}`
        });

        this.g.append(p);
    }

    hdrato(x,y,l) {
        const p = Lk.e("path",{
            d: `M${x} ${y}l${l} 0`
        });
        this.g.append(p);
    }

    /*
    kontakto(N,x,y) {
        const t = Lk.e("text",{
            x: x+3,
            y: y+15
        },N);
        const c = Lk.e("circle",{
            class: "kontakto",
            cx: x,
            cy: y,
            r: 2,
            fill: "none",
            stroke:"black"
        });
        this.g.append(c,t);
    }*/

    poluso(x,y) {
        const c = Lk.e("circle",{
            class: "poluso",
            cx: x,
            cy: y,
            r: 4
        });
        const p = Lk.e("path",{
            d: `M${x} ${y-3}L${x} ${y+3}M${x-3} ${y}L${x+3} ${y}`
        });
        this.g.append(c,p);
    }
}

class LkPeco {
    constructor() {
        this.g = Lk.e("g");
    }
}

class LkRelajs extends LkPeco {
    /**
     * 
     * @param {*} x pozicio de la kontakto
     * @param {*} y pozicio de la kontakto
     * @param {*} e nomo de la kontakto
     */
    constructor(x,y,e) {
        super();

        this.x = x;
        this.y = y;

        // kontakto
        const t = Lk.e("text",{
            x: x+3,
            y: y+10,
            "font-size": 10
        },e);
        const c = Lk.e("circle",{
            class: "kontakto",
            cx: x+3,
            cy: y,
            r: 2,
        });
        // bobeno
        const r = Lk.e("rect",{
            x: x+20,
            y: y+10,
            width: 20,
            height: 15,
        });
        // drato
        const p = Lk.e("path",{
           d: "M5 0L30 0L30 10M30 25L30 35M26 35L34 35",
           transform: `translate(${x} ${y})`
        }); 
        this.g.append(t,c,r,p);
    }

    // ŝaltilo de la relajso
    ponto(x,y,w,fermita) {
        const ys = y+17.5;
        const xw = x+w;
        const fend = 1+5*(1-fermita);
        // strekita
         const p = Lk.e("path",{
             fill: "none",
             stroke: "black",
             "stroke-dasharray": "5,2",
             d: `M${x+40} ${ys}L${xw-fend} ${ys}`
         });
         // klapo
         const p1 = Lk.e("path",{
             class: "klapo",
             d: `M${xw-fend} ${y+9}L${xw} ${y+25}`
         });
         const l = Lk.e("line",{
            x1: xw+.5,
            x2: xw-2,
            y1: y+10,
            y2: y+10
        });
         const c = Lk.e("circle",{
            cx: xw,
            cy: y+25,
            r: 1
         });
         this.g.append(p,p1,l,c);
    }        
}


class NEKrado extends Krado {
    constructor(id) {
        super(id);
        this.nomo("NE");
        this.eliro();

        // relajso
        const rel = new LkRelajs(0,20,'x');
        rel.ponto(0,20,75,true);
        this.aldonu(rel);

        this.poluso(75,7);
        this.vdrato(75,11,19);
        this.vdrato(75,45,50);

        this.hdrato(75,95,15);
        //this.vdrato(90,10,90);
        //this.kontakto('',98,96);
    };
}


class KAJKrado extends Krado {
    constructor(id) {
        super(id);
        this.nomo("KAJ");
        this.eliro();

        // relajso 1
        const rel1 = new LkRelajs(0,20,'x');
        rel1.ponto(0,20,75,false);
        // relajso 2
        const rel2 = new LkRelajs(0,60,'y');
        rel2.ponto(0,60,75,false);

        this.aldonu(rel1,rel2);

        this.poluso(75,7);
        this.vdrato(75,11,19);
        this.vdrato(75,45,25);
        this.vdrato(75,85,10);

        this.hdrato(75,95,15);
        //this.kontakto('',98,96);
    };
}


class NKAJKrado extends Krado {
    constructor(id) {
        super(id);
        this.nomo("NKAJ");
        this.eliro();

        // relajso 1
        const rel1 = new LkRelajs(0,20,'x');
        rel1.ponto(0,20,60,true);
        // relajso 2
        const rel2 = new LkRelajs(0,60,'y');
        rel2.ponto(0,60,75,true);

        this.aldonu(rel1,rel2);

        this.poluso(60,7);
        this.vdrato(60,11,19);
        this.vdrato(60,45,50);

        this.poluso(75,7);
        this.vdrato(75,11,59);
        this.vdrato(75,85,10);

        this.hdrato(60,95,30);
        //this.kontakto('',98,96);
    }
}

class AŬKrado extends Krado {
    constructor(id) {
        super(id);
        this.nomo("AŬ");
        this.eliro();

        // relajso 1
        const rel1 = new LkRelajs(0,20,'x');
        rel1.ponto(0,20,60,false);

        // relajso 2
        const rel2 = new LkRelajs(0,60,'y');
        rel2.ponto(0,60,75,false);

        this.aldonu(rel1,rel2);

        this.poluso(60,7);
        this.vdrato(60,11,19);
        this.vdrato(60,45,50);

        this.poluso(75,7);
        this.vdrato(75,11,59);
        this.vdrato(75,85,10);

        this.hdrato(60,95,30);
        //this.kontakto('',98,96);
    }
}


class NEKKrado extends Krado {
    constructor(id) {
        super(id);
        this.nomo("NEK");
        this.eliro();

        // relajso 1
        const rel1 = new LkRelajs(0,20,'x');
        rel1.ponto(0,20,75,true);

        // relajso 2
        const rel2 = new LkRelajs(0,60,'y');
        rel2.ponto(0,60,75,true);

        this.aldonu(rel1,rel2);

        this.poluso(75,7);
        this.vdrato(75,11,19);
        this.vdrato(75,45,25);
        this.vdrato(75,85,10);

        this.hdrato(75,95,15);
        //this.kontakto('',98,96);
    };
}


class EKVKrado extends Krado {
    constructor(id) {
        super(id);
        this.nomo("EKV");
        this.eliro();

        // relajso 1
        const rel1 = new LkRelajs(0,20,'x');
        rel1.ponto(0,20,60,false);
        rel1.ponto(0,20,75,true);

        // relajso 2
        const rel2 = new LkRelajs(0,60,'y');
        rel2.ponto(0,60,60,true);
        rel2.ponto(0,60,75,false);

        this.aldonu(rel1,rel2);

        this.poluso(60,7);
        this.vdrato(60,11,19);
        this.vdrato(60,45,25);
        this.vdrato(60,85,10);

        this.poluso(75,7);
        this.vdrato(75,11,19);
        this.vdrato(75,45,25);
        this.vdrato(75,85,10);

        this.hdrato(60,95,30);
        //this.kontakto('',98,96);
    }
}

class XAŬKrado extends Krado {
    constructor(id) {
        super(id);
        this.nomo("XAŬ");
        this.eliro();

        // relajso 1
        const rel1 = new LkRelajs(0,20,'x');
        rel1.ponto(0,20,60,true);
        rel1.ponto(0,20,75,false);

        // relajso 2
        const rel2 = new LkRelajs(0,60,'y');
        rel2.ponto(0,60,60,false);
        rel2.ponto(0,60,75,true);

        this.aldonu(rel1,rel2);

        this.poluso(60,7);
        this.vdrato(60,11,19);
        this.vdrato(60,45,25);
        this.vdrato(60,85,10);

        this.poluso(75,7);
        this.vdrato(75,11,19);
        this.vdrato(75,45,25);
        this.vdrato(75,85,10);

        this.hdrato(60,95,30);
        //this.kontakto('',98,96);
    }
}

