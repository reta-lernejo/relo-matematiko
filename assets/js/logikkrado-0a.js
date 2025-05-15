
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
    constructor(id, klaso="krado") {
        this.id = id;

        // SVG grupo-elemento, kiu entenas la grafikon de la ilo
        this.g = Lk.e("g",{
            id: id,
            class: klaso
        });        
    }

    relajso(x,y) {
        this.x = x;
        this.y = y;

        const r = Lk.e("rect",{
            x: x+30,
            y: y+10,
            width: 20,
            height: 15,
            fill: "none",
            stroke: "black"
        });
        const p = Lk.e("path",{
           d: "M5 3L40 3L40 10M40 25L40 35M36 35L44 35",
           fill: "none",
           stroke: "black",
           transform: `translate(${x} ${y})`
        }); 
        this.g.append(r,p);
    }

    vdrato(x,y,l) {
        const p = Lk.e("path",{
            fill: "none",
            stroke: "black",
            d: `M${x} ${y}l0 ${l}`
        });

        this.g.append(p);
    }

    hdrato(x,y,l) {
        const p = Lk.e("path",{
            fill: "none",
            stroke: "black",
            d: `M${x} ${y}l${l} 0`
        });
        this.g.append(p);
    }

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
    }

    poluso(x,y) {
        const c = Lk.e("circle",{
            class: "poluso",
            cx: x,
            cy: y,
            r: 4,
            stroke: "black",
            fill: "none"
        });
        const p = Lk.e("path",{
            fill: "none",
            stroke: "black",
            d: `M${x} ${y-3}L${x} ${y+3}M${x-3} ${y}L${x+3} ${y}`
        });
        this.g.append(c,p);
    }

    ponto(x,y,w,fermita) {
       // strekita
        const p = Lk.e("path",{
            fill: "none",
            stroke: "black",
            "stroke-dasharray": "5,2",
            d: `M${x+50} ${y+17.5}L${x+w-5*(1-fermita)} ${y+17.5}`
        });
        // klapo
        const p1 = Lk.e("path",{
            class: "klapo",
            fill: "none",
            stroke: "black",
            d: `M${x+w-5*(1-fermita)} ${y+10}L${x+w} ${y+25}`
        });
        this.g.append(p,p1);
    }
}


class NEKrado extends Krado {
    constructor(id) {
        super(id);

        // relajso
        this.relajso(0,20);
        this.kontakto('x',3,23);        
        this.ponto(0,20,80,true);

        this.poluso(80,5);
        this.vdrato(80,9,21);
        this.vdrato(80,45,51.5);

        this.hdrato(80,96,16);
        this.kontakto('',98,96);
    };
}


class KAJKrado extends Krado {
    constructor(id) {
        super(id);

        // relajso 1
        this.relajso(0,20);
        this.kontakto('x',3,23);        
        this.ponto(0,20,80,false);

        // relajso 2
        this.relajso(0,60);
        this.kontakto('y',3,63);        
        this.ponto(0,60,80,false);

        this.poluso(80,5);
        this.vdrato(80,9,19);
        this.vdrato(80,45,24);
        this.vdrato(80,85,11.5);

        this.hdrato(80,96,16);
        this.kontakto('',98,96);
    };
}



