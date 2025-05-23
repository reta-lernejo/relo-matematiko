

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

    static uuid() {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        } else {
            // randomUUID ne estas ĉiam uzebla, aparte ne se ni testas loke per HTTP
            const timestamp = new Date().getTime(); // Get current timestamp
            const randomPart = Math.random().toString(36).substring(2, 15); 
            const anotherRandomPart = Math.random().toString(36).substring(2, 15); 
            return `id-${timestamp}-${randomPart}-${anotherRandomPart}`;
        }
    }
}

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


    /**
     * Difinas reagon de ilo al klako
     * @param {*} ilo 
     * @param {function} reago 
     */
    klak_reago(ilo,reago) {
        const i = (typeof ilo === "object")? ilo : this.iloj[_ilo];
        i.g.addEventListener("click", (event) =>
        {
            reago(i,event);
        })
    }

    svg_koordinatoj(event) {
        let pt = this.svg.createSVGPoint();
        pt.x = event.clientX;
        pt.y = event.clientY;
        let CTM = this.svg.getScreenCTM();
        let inverseCTM = CTM.inverse();
        let svgPoint = pt.matrixTransform(inverseCTM);
        return svgPoint;
    }    

}

/**
 * Panelo estas la bazo sur kiu estas aranĝitaj la diversaj platoj kiel en puzlo
 * Ĝi ankaŭ zorgas pri metado, forigo kaj kunligo de apudaj kontaktoj
 */
class LkPanelo extends LkSVG {
    constructor(svg) {
        super(svg);
        // ni uzas aranĝon de kampoj kun grandeco 50x50
        const vb = svg.getAttribute("viewBox").split(" ");

        const r = Lk.e("rect", {
            class: "panelo",
            width: vb[2],
            height: vb[3],
            rx: 5
        });
        this.svg.append(r);

        r.addEventListener("click",(event) => {
            // se iu plato estas martkita, metu ĝin en la montritan lokon
            // const markita = this.markita_plato()
            // if (markita) {
            const pt = this.svg_koordinatoj(event);
            const v = Math.floor(pt.x/50);
            const h = Math.floor(pt.y/50);
            console.log("v"+v+" h"+h);
            // this.forigu(markita)
            // this.metu(markita,v,h)
            //}
        })

        this.vert = Math.ceil(vb[2]/50); //-vb[0])/50);
        this.horz = Math.ceil(vb[3]/50); //-vb[1])/50);
        // preparu aranĝon horz (horizontaloj) x vert (vertikaloj/kolumnoj);
        this.platoj = {};
        this.metoj = Array.from({ length: this.horz }, () => Array(this.vert).fill(undefined));
    }

    trovu_lokon(plato) {
        const formato = plato.formato();
        const dj = formato[0]/50; // larĝo
        const di = formato[1]/50; // alto

        for (let i = 0; i<this.horz; i++) {
            for (let j = 0; j<this.vert; j++) {
                if (!this.metoj[i][j] && i+di<=this.horz && j+dj<=this.vert) {
                    let spaco = true;
                    // ĉu tie estas dkestre kaj malsupre spaco por la cetero de la plato?
                    for (let _i=i; _i < i+di; _i++) {
                        for (let _j=j; _j<j+dj; _j++) {
                            // se okupita eliru
                            if (this.metoj[_i][_j]) {
                                spaco = false;
                                break;
                            }
                            if (!spaco) break;
                        }
                    }
                    // se spaco sufiĉas ni trovis taŭgan lokon
                    if (spaco) 
                        return [j,i];
                }
            }
        }
    }

    metu_ien(plato) {
        const loko = this.trovu_lokon(plato);
        if (loko) {
            this.metu(plato,...loko);
        } else {
            throw("Ne troviĝas konvena loko sur la panelo por "+plato.id);
        }
    }

    /**
     * 
     * @param {*} plato 
     * @param {*} j kolumno
     * @param {*} i linio
     */
    metu(plato,j,i) {
        plato.panelo = this;
        this.platoj[plato.id] = [plato,j,i];

        // KOREKTU: append nur se ne jam troviĝas        
        this.svg.append(plato.g);
        // ŝovu la platon al la ĝusta loko en SVG
        this.ŝovu(plato.g,50*j,50*i);

        const formato = plato.formato();
        const dj = formato[0]/50; // larĝo
        const di = formato[1]/50; // alto

        for (let _i = i; _i<i+di; _i++) {
            for (let _j = j; _j<j+dj; _j++) {
                // ni memoras sur kiu kampo [_i,_j] de la panelo
                // estas kiu kampo [_i-i,_j-j] de la plato
                // aparte la i-koordinaton ni bezonas por identigi apudajn
                // enirojn/eliroj por kunigo
                this.metoj[_i][_j] = [plato,_i-i,_j-j];
            }
            // kunigu kun apudaj platoj maldekstre 
            if (j>0) {
                const najbaro = this.metoj[_i][j-1];
                if (najbaro) {
                    const np = najbaro[0];
                    const ni = najbaro[1];
                    Plato.ligu(np,ni,plato,_i-i);
                };
            }
            // kaj dekstre
            if (j+dj<this.vert) {
                const najbaro = this.metoj[_i][j+dj];
                if (najbaro) {
                    const np = najbaro[0];
                    const ni = najbaro[1];
                    Plato.ligu(plato,_i-i,np,ni);
                }
            }
        }
    }

    forigu(plato) {
        //let imin, jmin;
        const pi = this.platoj[plato.id];
        const j = pi[1];
        const i = pi[2];

        const formato = plato.formato();
        const dj = formato[0]/50; // larĝo
        const di = formato[1]/50; // alto

        for (let _i = i; _i<i+di; _i++) {
            // forigu kunigojn maldekstrajn en la linio _i
            if (j>0) {
                const najbaro = this.metoj[_i][j-1];
                if (najbaro) {
                    const np = najbaro[0];
                    const ni = najbaro[1];
                    Plato.malligu(np,ni,plato,_i-i);
                };
            }
            // kaj dekstre
            if (j+dj<this.vert) {
                const najbaro = this.metoj[_i][j+dj];
                if (najbaro) {
                    const np = najbaro[0];
                    const ni = najbaro[1];
                    Plato.malligu(plato,_i-i,np,ni);
                }
            }

            // liberu la kampon en la panelo
            for (let _j = j; _j<j+dj; _j++) {
                this.metoj[_i][_j] = undefined;
            }
        }

        // forigu la pecon el svg
        plato.g.remove();
        delete this.platoj[plato.id];
    }

    marku(plato) {
        Object.values(this.platoj).forEach((p) => {
            if (p[0] === plato) p[0].marku(true);
            else p[0].marku(false);
        })
    }
}

class LkMenuo {
    constructor(id, klaso="menuo", w=400, h=20) {
        this.id = id;

        // SVG grupo-elemento, kiu entenas la grafikon de la ilo
        this.g = Lk.e("g",{
            id: id,
            class: klaso
        });    

        const r = Lk.e("rect",{
            width: w,
            height: h,
            rx: 5
        });

        this.g.append(r);
    }

    menueroj(...eroj) {
        const y0 = 2;
        const x0 = 5;
        const h = 16;
        const w = 32
        eroj.forEach((ero,n) => {
            const btn = Lk.e("rect",{
                id: ero,
                class: "butono",
                x: x0 + n*(w+2),
                y: y0,
                rx: 3,
                width: w,
                height: h
            });
            const t = Lk.e("text",{
                class: "butono",
                x: x0-1 + w/2 + n*(w+2), 
                y: y0+1.5 + h/2 // 1.5: iom pli sube pro supersignoj
            },ero);
            this.g.append(btn,t);
        })
    }

    reago(rg) {
        this.g.querySelectorAll(".butono").forEach((btn) => {
            btn.addEventListener("click",() => {
                const ero = btn.closest("rect.butono");
                if (ero)
                    {
                        const id = ero.getAttribute("id");
                        rg(id)
                    }
            });
        });
    }
}

class Plato {
    constructor(id, klaso="logikplato", w=100, h=100) {
        this.id = id || Lk.uuid();
        this.en = [];
        this.el = [];
        this.panelo = undefined;
        //this.markita = false;

        // SVG grupo-elemento, kiu entenas la grafikon de la ilo
        this.g = Lk.e("g",{
            id: id,
            class: klaso
        });    
        
        const r = Lk.e("rect",{
            class: "plato",
            height: h,
            width: w,
            rx: 5,
        });

        const x = Lk.e("text",{
            class: "for",
            x: w-9,
            y: 9
        },
        "\u274c");
        this.g.append(r,x);

        r.addEventListener("click",() => {
            this.panelo.marku(this);            
        })

        x.addEventListener("click",() => {
            const self = this;
            if (this.panelo) {            
                this.panelo.forigu(self);
            }
        });
    }

    formato() {
        const plato = this.g.querySelector(".plato");
        return([plato.getAttribute("width"),plato.getAttribute("height")]);
    }

    marku(mark) {
        const r = this.g.querySelector("rect.plato");
        if (r) {
            r.classList.toggle("markita",mark);
        }
    }

    markita() {
        thius.g.querySelector(".marktita");
    }

    /** aldonas pecojn al la plato */
    aldonu(...pecoj) {
        pecoj.forEach((p) => this.g.append(p.g));
    }

    /** aldonas pecojn al la plato registrante ilin kiel eniroj laŭ la donita ordo */
    eniroj(...pecoj) {
        pecoj.forEach((p,i) => {
            this.g.append(p.g);
            this.en.push(p);
        });
    }

    /** aldonas pecojn al la plato registrante ilin kiel eliroj laŭ la donita ordo */
    eliroj(...pecoj) {
        pecoj.forEach((p,i) => {
            this.g.append(p.g);
            this.el.push(p);
        });
    }

    /** ligas eliron de unu plato (plato) al eniro de apuda plato */
    static ligu(plato_el,i_el,plato_en,i_en) {
        // por kalkulado de aktiveco ni iras de eliroj (maldekstre) al eniroj (dekstren)
        const eliro = plato_el.el[i_el];
        const eniro = plato_en.en[i_en];
        eliro.ligoj.push(eniro);
        // ligu en ambaŭ direktoj? - tion ni bezonus nur se eniro havus
        // pluraj fontojn kaj devus evtl. kombini tiujn
        // plato_en.en[i_en].ligo = plato_el.el[i_el];

        // ĉu aktiva en momento de ligo?
        if (eliro.aktiva) eniro.ŝaltu(true);
    }

    /** malligas eliron de unu plato (plato) de eniro de apuda plato */
    static malligu(plato_el,i_el,plato_en,i_en) {
        // por kalkulado de aktiveco ni iras de eliroj (maldekstre) al eniroj (dekstren)
        const eliro = plato_el.el[i_el];
        const eniro = plato_en.en[i_en];


        const i = eliro.ligoj.indexOf(eniro);
        if (i > -1) { 
            // malŝaltu eniron antaŭ malligo
            if (eniro.aktiva) eniro.ŝaltu(false);

            eliro.ligoj.splice(i, 1);
        }
    }

    nomo(nom) {
        const t = Lk.e("text",{
            x: 10,
            y: 15,
        },nom);
        this.g.append(t);
    }

    poluso(x=75,y=6) {
        const c = Lk.e("circle",{
            class: "poluso",
            cx: x,
            cy: y,
            r: 3.5
        });
        const p = Lk.e("path",{
            d: `M${x} ${y-2}L${x} ${y+2}M${x-2} ${y}L${x+2} ${y}`
        });
        this.g.append(c,p);
    }
}

class LkPeco {
    constructor(aktiva, cls="peco") {
        this.aktiva = aktiva;        
        this.ligoj = [];

        if (aktiva) cls = cls + " aktiva"
        this.g = Lk.e("g",{
            class: cls
        });
    }

    kontakto(x=2,y=20,e) {
        const c = Lk.e("circle",{
            class: "kontakto",
            cx: x,
            cy: y,
            r: 2
        });   
        this.g.append(c);
        if (e) {
            const t = Lk.e("text",{
                x: x+.5,
                y: y+11
                //"font-size": 10
            },e);        
            this.g.append(t);
        }      
        return c;     
    }

    lumo(x,y,e) {
        const gl = Lk.e("g",{
            class: "lumo"
        });

        const c = Lk.e("circle",{
            class: "lumo",
            cx: x,
            cy: y,
            r: 3.5
        });   
        gl.append(c);
        if (e) {
            const t = Lk.e("text",{
                x: x,
                y: y,
                class: "lumo"
            },e);        
            gl.append(t);
        }   
        this.g.append(gl)   
        return gl;     
    }


    // aktiva = true ŝanĝu en staton, en kiu trafluas elektro
    // aktiva = false, ŝaltu en la senelektran staton
    ŝaltu(aktiva=true) {
        this.aktiva = aktiva; 

        if (aktiva) {
            this.g.classList.add("aktiva");
        } else {
            this.g.classList.remove("aktiva");
        }

        // se temas pri eliro ŝaltu ankaŭ la ligitan elementon
        if (this.ligoj) {            
            this.ligoj.forEach((p) => p.ŝaltu(aktiva));
        }
    }        
}

class LkEliro extends LkPeco {
    constructor(aktiva,x=90,y1=20,y2=70,yd=95,e="") {
        super(aktiva,"eliro");

        //this.kontakto(98,y1.e);
        let d = `M100 ${y1}L${x} ${y1}`;
        if (y2) {
            d += `L${x} ${y2}L100 ${y2}M${x} ${y2}`;
            //this.kontakto(98,y2);
        } ;
        d += `L${x} ${yd}`;
        
        const p = Lk.e("path",{
            d: d
        });

        this.g.append(p);
    }
}

/** drato horizontala */
class LkHDrato extends LkPeco {
    constructor(aktiva,y,e) {
        super(aktiva,"drato");

        const p = Lk.e("line",{
            x1: 4,
            y1: y,
            x2: 100,
            y2: y
        });
        // kontakto
        this.kontakto(2,y,e)
        //this.kontakto(98,y);        

        this.g.append(p);
    }
}

/** drato kiu kondukas de poluso tra pontoj de relajso ĝis eliro */
class LkDrato extends LkPeco {
    constructor(aktiva,xp,xe,...Y) {
        super(aktiva,"drato");

        // poluso
        const y0 = Y[0];
        const c = Lk.e("circle",{
            class: "poluso",
            cx: xp,
            cy: y0,
            r: 3.5
        });
        const p = Lk.e("path",{
            d: `M${xp} ${y0-2}L${xp} ${y0+2}M${xp-2} ${y0}L${xp+2} ${y0}`
        });

        this.g.append(c,p);

        // vertikalaj dratpecoj        
        for (let i=1; i < Y.length-1; i+=2) {
            const y1 = Y[i];
            const y2 = Y[i+1];
            const d = Lk.e("line", {
                x1: xp,
                y1: y1,
                x2: xp,
                y2: y2
            });
            this.g.append(d);
        }
        // horizontala linio
        const y = Y[Y.length-1];
        const h = Lk.e("line", {
            x1: xp,
            y1: y,
            x2: xe,
            y2: y
        });
        this.g.append(h);
    }
}

class LkRelajs extends LkPeco {
    /**
     * 
     * @param {*} x pozicio de la kontakto
     * @param {*} y pozicio de la kontakto
     * @param {*} e nomo de la kontakto
     */
    constructor(aktiva,x,y,e) {
        super(aktiva,"relajso");

        this.x = x;
        this.y = y;
        this.pontoj = [];
        this.aktiva = false;

        // kontakto
        this.kontakto(x+2,y,e);
        // bobeno
        const r = Lk.e("rect",{
            x: x+20,
            y: y+5,
            width: 20,
            height: 12,
        });
        // drato
        const p = Lk.e("path",{
           d: "M5 0L30 0L30 5M30 17L30 24",
           transform: `translate(${x} ${y})`
        }); 
        // maso
        const l = Lk.e("line",{
            class: "maso",
            x1: x+26,
            y1: y+24,
            x2: x+34,
            y2: y+24
        })
        this.g.append(r,p,l);
    }

    // ŝaltilo de la relajso
    ponto(w,fermita) {
        const x = this.x;
        const y = this.y;
        const ys = y+11;
        const xw = x+w;
        const fend = -1 + 6*(1-fermita);
        // strekita
        // KOREKTU: se ni havas u pontojn ni tamen bezonas
        // nur unu pli longan kernon
        const p = Lk.e("path",{
            class: "kerno",
            d: `M${x+40} ${ys}L${xw-fend} ${ys}`
        });
        // klapo
        const klap = Lk.e("path",{
             class: "klapo",
             d: `M${xw-fend} ${y+4}L${xw} ${y+18}`
        });
        const l = Lk.e("line",{
            x1: xw,
            x2: xw + (fermita?1.5:-1.5),
            y1: y+5,
            y2: y+5
        });
        const c = Lk.e("circle",{
            cx: xw,
            cy: y+18,
            r: 1
        });
        this.g.append(p,klap,l,c);

        const pt = {w: w, fermita0: fermita, fermita: fermita, klapo: klap};
        this.pontoj.push(pt);
    }    
    
    // aktiva = true ŝanĝu en staton kiam la relajso estas sub elektro
    // aktiva = false, ŝaltu en la senelektran (originan) staton
    ŝaltu(aktiva=true) {
        super.ŝaltu(aktiva);

        for (const pt of this.pontoj) {
            //const fermita = aktiva ^ pt.ostato;
            //const fend = 1 - 6*(1-fermita);
            const x = this.x;
            const y = this.y;
            const xw = x+pt.w;
            //Lk.a(klapo, {d: `M${xw-fend} ${y+9}L${xw} ${y+25}`});
            if (aktiva) {
                Lk.a(pt.klapo,{transform: `rotate(15 ${xw} ${y+18})`});
                pt.fermita = !pt.fermita0;
            } else {
                pt.klapo.removeAttribute("transform");
                pt.fermita = pt.fermita0;
            }
        }

        if (this.reago) this.reago();
    }
}


class IDPlato extends Plato {
    constructor(id) {
        super(id,undefined,100,50);
        this.nomo("ID");

        // relajso - ni uzas relajson por ke
        // havi konekton al la maso de la enira lumo
        // tiel por lumigi ni ne devas kotnroli tra ĉiuj sekvaj
        // konektoj ĉu ni havas maskonekton
        const rel = new LkRelajs(false,0,20);
        rel.ponto(75,false);
        const drat = new LkDrato(false,75,90,6,10,25,40,45);
        const eliro = new LkEliro(false,90,20,null,45);

        rel.reago = () => {
            //rel.ŝaltu(!rel.aktiva);
            drat.ŝaltu(rel.pontoj[0].fermita);
            eliro.ŝaltu(drat.aktiva);
        };        

        //const drat = new LkHDrato(false,20);
        this.eniroj(rel);
        this.eliroj(eliro);
        this.aldonu(drat);
    };
}

class NEPlato extends Plato {
    constructor(id) {
        super(id,undefined,100,50);
        this.nomo("NE");

        // relajso
        const rel = new LkRelajs(false,0,20);
        rel.ponto(75,true);
        const drat = new LkDrato(true,75,90,6,10,25,40,45);
        const eliro = new LkEliro(true,90,20,null,45);

        rel.reago = () => {
            //rel.ŝaltu(!rel.aktiva);
            drat.ŝaltu(rel.pontoj[0].fermita);
            eliro.ŝaltu(drat.aktiva);
        };

        this.eniroj(rel);
        this.eliroj(eliro);
        this.aldonu(drat);
    };
}


class KAJPlato extends Plato {
    constructor(id) {
        super(id);
        this.nomo("KAJ");

        // relajso 1
        const rel1 = new LkRelajs(false,0,20);
        rel1.ponto(75,false);
        // relajso 2
        const rel2 = new LkRelajs(false,0,70);
        rel2.ponto(75,false);

        const drat = new LkDrato(false,75,90,6,10,25,40,75,90,95);
        const eliro = new LkEliro(false);

        rel1.reago = () => {
            //rel1.ŝaltu(!rel1.aktiva);
            drat.ŝaltu(rel1.pontoj[0].fermita && rel2.pontoj[0].fermita);
            eliro.ŝaltu(drat.aktiva);
        };
        
        rel2.reago = () => {
            //rel2.ŝaltu(!rel2.aktiva);
            drat.ŝaltu(rel1.pontoj[0].fermita && rel2.pontoj[0].fermita);
            eliro.ŝaltu(drat.aktiva);
        };

        this.eniroj(rel1,rel2);
        this.eliroj(eliro,eliro);
        this.aldonu(drat);
    };
}


class NKAJPlato extends Plato {
    constructor(id) {
        super(id);
        this.nomo("NKAJ");

        // relajso 1
        const rel1 = new LkRelajs(false,0,20);
        rel1.ponto(60,true);
        // relajso 2
        const rel2 = new LkRelajs(false,0,70);
        rel2.ponto(75,true);

        const drat1 = new LkDrato(true,60,90,6,10,25,40,95);
        const drat2 = new LkDrato(true,75,90,6,10,75,90,95);
        const eliro = new LkEliro(true);

        rel1.reago = () => {
            //rel1.ŝaltu(!rel1.aktiva);
            drat1.ŝaltu(rel1.pontoj[0].fermita);
            eliro.ŝaltu(drat1.aktiva || drat2.aktiva);
        };

        rel2.reago = () => {
            //rel2.ŝaltu(!rel2.aktiva);
            drat2.ŝaltu(rel2.pontoj[0].fermita);
            eliro.ŝaltu(drat1.aktiva || drat2.aktiva);
        };

        this.eniroj(rel1,rel2);
        this.eliroj(eliro,eliro);
        this.aldonu(drat1,drat2);
    }
}

class AŬPlato extends Plato {
    constructor(id) {
        super(id);
        this.nomo("AŬ");

        // relajso 1
        const rel1 = new LkRelajs(false,0,20);
        rel1.ponto(60,false);

        // relajso 2
        const rel2 = new LkRelajs(false,0,70);
        rel2.ponto(75,false);

        const drat1 = new LkDrato(false,60,90,6,10,25,40,95);
        const drat2 = new LkDrato(false,75,90,6,10,75,90,95);
        const eliro = new LkEliro(false);

        rel1.reago = () => {
            // rel1.ŝaltu(!rel1.aktiva);
            drat1.ŝaltu(rel1.pontoj[0].fermita);
            eliro.ŝaltu(drat1.aktiva || drat2.aktiva);
        };

        rel2.reago = () => {
            // rel2.ŝaltu(!rel2.aktiva);
            drat2.ŝaltu(rel2.pontoj[0].fermita);
            eliro.ŝaltu(drat1.aktiva || drat2.aktiva);
        };

        this.eniroj(rel1,rel2);
        this.eliroj(eliro,eliro);
        this.aldonu(drat1,drat2);
    }
}


class NEKPlato extends Plato {
    constructor(id) {
        super(id);
        this.nomo("NEK");

        // relajso 1
        const rel1 = new LkRelajs(false,0,20);
        rel1.ponto(75,true);

        // relajso 2
        const rel2 = new LkRelajs(false,0,70);
        rel2.ponto(75,true);

        const drat = new LkDrato(false,75,90,6,10,25,40,75,90,95);
        const eliro = new LkEliro(true);

        rel1.reago = () => {
            //rel1.ŝaltu(!rel1.aktiva);
            drat.ŝaltu(rel1.pontoj[0].fermita && rel2.pontoj[0].fermita);
            eliro.ŝaltu(drat.aktiva);
        };

        rel2.reago = () => {
            //rel2.ŝaltu(!rel2.aktiva);
            drat.ŝaltu(rel1.pontoj[0].fermita && rel2.pontoj[0].fermita);
            eliro.ŝaltu(drat.aktiva);
        };

        this.eniroj(rel1,rel2);
        this.eliroj(eliro,eliro);
        this.aldonu(drat);
    };
}


class EKVPlato extends Plato {
    constructor(id) {
        super(id);
        this.nomo("EKV");

        // relajso 1
        const rel1 = new LkRelajs(false,0,20);
        rel1.ponto(60,true);
        rel1.ponto(75,false);

        // relajso 2
        const rel2 = new LkRelajs(false,0,70);
        rel2.ponto(60,true);
        rel2.ponto(75,false);

        const drat1 = new LkDrato(true,60,90,6,10,25,40,75,90,95);
        const drat2 = new LkDrato(false,75,90,6,10,25,40,75,90,95);
        const eliro = new LkEliro(true);

        rel1.reago = () => {
            //rel1.ŝaltu(!rel1.aktiva);
            drat1.ŝaltu(rel1.pontoj[0].fermita && rel2.pontoj[0].fermita);
            drat2.ŝaltu(rel1.pontoj[1].fermita && rel2.pontoj[1].fermita);
            eliro.ŝaltu(drat1.aktiva || drat2.aktiva);
        };

        rel2.reago = () => {
            //rel2.ŝaltu(!rel2.aktiva);
            drat1.ŝaltu(rel1.pontoj[0].fermita && rel2.pontoj[0].fermita);
            drat2.ŝaltu(rel1.pontoj[1].fermita && rel2.pontoj[1].fermita);
            eliro.ŝaltu(drat1.aktiva || drat2.aktiva);
        };

        this.eniroj(rel1,rel2);
        this.eliroj(eliro,eliro);
        this.aldonu(drat1,drat2);
    }
}

class XAŬPlato extends Plato {
    constructor(id) {
        super(id);
        this.nomo("XAŬ");

        // relajso 1
        const rel1 = new LkRelajs(false,0,20);
        rel1.ponto(60,true);
        rel1.ponto(75,false);

        // relajso 2
        const rel2 = new LkRelajs(false,0,70);
        rel2.ponto(60,false);
        rel2.ponto(75,true);

        const drat1 = new LkDrato(false,60,90,6,10,25,40,75,90,95);
        const drat2 = new LkDrato(false,75,90,6,10,25,40,75,90,95);
        const eliro = new LkEliro(false);

        rel1.reago = () => {
            // rel1.ŝaltu(!rel1.aktiva);
            drat1.ŝaltu(rel1.pontoj[0].fermita && rel2.pontoj[0].fermita);
            drat2.ŝaltu(rel1.pontoj[1].fermita && rel2.pontoj[1].fermita);
            eliro.ŝaltu(drat1.aktiva || drat2.aktiva);
        };

        rel2.reago = () => {
            // rel2.ŝaltu(!rel2.aktiva);
            drat1.ŝaltu(rel1.pontoj[0].fermita && rel2.pontoj[0].fermita);
            drat2.ŝaltu(rel1.pontoj[1].fermita && rel2.pontoj[1].fermita);
            eliro.ŝaltu(drat1.aktiva || drat2.aktiva);
        };

        this.eniroj(rel1,rel2);
        this.eliroj(eliro,eliro);
        this.aldonu(drat1,drat2);
    }
}

// duonadiciilo el KAJ kaj XAŬ
class KAJXAŬPlato extends Plato {
    constructor(id) {
        super(id);
        this.nomo("&/=1");

        // relajso 1
        const rel1 = new LkRelajs(false,0,20);
        rel1.ponto(50,false);
        rel1.ponto(65,true);
        rel1.ponto(80,false);

        // relajso 2
        const rel2 = new LkRelajs(false,0,70);
        rel2.ponto(50,false);
        rel2.ponto(65,false);
        rel2.ponto(80,true);

        // kaj
        const drat1 = new LkDrato(false,50,92,6,10,25,40,75,90,96);
        const eliro1 = new LkEliro(false,92,70,null,96,"&");
        // xaŭ
        const drat2 = new LkDrato(false,65,88,6,10,25,40,75,90,92);
        const drat3 = new LkDrato(false,80,88,6,10,25,40,75,90,92);
        const eliro2 = new LkEliro(false,88,10,null,92,"=1");

        rel1.reago = () => {
            // rel1.ŝaltu(!rel1.aktiva);
            drat1.ŝaltu(rel1.pontoj[0].fermita && rel2.pontoj[0].fermita);
            drat2.ŝaltu(rel1.pontoj[1].fermita && rel2.pontoj[1].fermita);
            drat3.ŝaltu(rel1.pontoj[2].fermita && rel2.pontoj[2].fermita);
            eliro1.ŝaltu(drat1.aktiva);
            eliro2.ŝaltu(drat2.aktiva || drat3.aktiva);
        };

        rel2.reago = () => {
            // rel2.ŝaltu(!rel2.aktiva);
            drat1.ŝaltu(rel1.pontoj[0].fermita && rel2.pontoj[0].fermita);
            drat2.ŝaltu(rel1.pontoj[1].fermita && rel2.pontoj[1].fermita);
            drat3.ŝaltu(rel1.pontoj[2].fermita && rel2.pontoj[2].fermita);
            eliro1.ŝaltu(drat1.aktiva);
            eliro2.ŝaltu(drat2.aktiva || drat3.aktiva);
        };

        this.eniroj(rel1,rel2);
        this.eliroj(eliro1,eliro2);
        this.aldonu(drat1,drat2,drat3);
    }
}

class EnirPlato extends Plato {
    constructor(id) {
        super(id,"logikplato eniroj",50,300);
        this.kunigoj = [];

        const tx = Lk.e("text",{
            x: 2,
            y: 11
        },"x");
        const ty = Lk.e("text",{
            x: 41,
            y: 61
        },"y");
        this.g.append(tx,ty);

        for (let i=5; i>=0; i--) {
            const drat = new LkPeco(false);
            const x = 7+i*7;
            const y0 = 10+(i+1)%2*50;
            const y = 270-i*50;
            const lum = drat.lumo(x,y0-2,3-Math.floor((i)/2));
            //dratoj.kontakto(48,y);
            const d = Lk.e("path",{
                d: `M${x} ${y0+2}L${x} ${y}L50 ${y}`
            });
            drat.g.append(d);

            lum.addEventListener("click",() => {
                console.log((drat.aktiva?"mal":"")+"ŝalti eniron "+(6-i));

                const aktiva = !drat.aktiva;
                drat.ŝaltu(aktiva);
                this.kunigoj.forEach((k) => {
                    if (k.has(drat.index)) {
                        // ŝaltu ankaŭ ĉiujn kunigitajn dratojn (troveblaj per indekso en this.el)
                        k.forEach((d) => {
                            if (d != drat.index) this.el[d].ŝaltu(aktiva);
                        })
                    }
                });

            });

            // por trakti kunigojn ni devas scii 
            // la eliro-numerojn de la dratoj
            drat.index = 5-i; 
            this.eliroj(drat);
        }
    }

    kunigu(i,j=i+2) {
        // se unu el la du jam estas kunigita kun alia,
        // aldonu tie
        let added = false;
        for (const k of this.kunigoj) {
            if (k.has(i)) {
                k.add(j);
                added = true;
                break;
            } else if (k.has(j)) {
                k.add(i);
                added = true;
                break;
            }
        }
        // se ne, kreu novan kunigon kiel Set-objekto
        if (!added) this.kunigoj.push(new Set([i,j]));

        // tio kondukus al senfina ciklo:
        // this.el[i].ligoj.push(this.el[j]);
        // this.el[j].ligoj.push(this.el[i]);

        const xi = 7+i*7;
        const y = 16+(i+1)%2*50;
        const xj = 7+j*7;
        const c1 = Lk.e("circle",{
            cx: xi,
            cy: y,
            r: 1
        });
        const c2 = Lk.e("circle",{
            cx: xj,
            cy: y,
            r: 1
        });
        const l = Lk.e("path",{
            d: `M${xi} ${y}Q${(xi+xj)/2} ${y+3} ${xj} ${y}`
        });
        this.g.append(c1,c2,l);
    }
}

class ElirPlato extends Plato {
    constructor(id) {
        super(id,"logikplato eliroj",50,300);
        for (let i=5; i>=0; i--) {
            const drat = new LkPeco(false);
            const x = 10 + (i+1)%2*10
            const y = 270-i*50;
            // de maldekstre al la maso
            const d = Lk.e("path",{
                d: `M0 ${y}L30 ${y}L30 290`
            });
            drat.g.append(d);
            drat.lumo(x,y);

            this.eniroj(drat);
        }
        // maso
        const m = Lk.e("line",{
            class: "maso",
            x1: 30-4,
            y1: 290,
            x2: 30+4,
            y2: 290
        });
        this.g.append(m)
    }
}