/**
 * Noto: ni uzas bitmaskojn kaj densan kodigon ne pro ŝparemo, sed pro la temo!
 * 
 * Ni uzas entute dek ses bitojn por la aranĝo kaj stato
 * de logikpordo: 
 * - po 4 bitoj por relajso: 0/1 ĝi ekzistas kun 1..3 ŝaltiloj en neaktiva stato 0=malfermita, 1=fermita
 * - po 4 por stato de eniroj kaj bildigo de relajsostatoj al eliroj 0b000 = eliro mankas, 
 *      bitoj de du eliroj egalas: ambaŭ eliroj estas kunigitaj
 * 
 * La bitmaskoj estas uzataj por legi la bitojn (per &BM) 
 * aŭ purigi (& ~BM) kaj skribi la bitoj per (| val&BM)
 * al la 32-bita nombro per kiu ni reprezentas logikpordon
 */
// bitmaskoj relajsostatoj 0 - malfermita ŝaltilo, 1 - fermita ŝaltilo
const BM_RE0 = 0b0111;
const BM_RE1 = 0b0111<<4;
// bitmaskoj enirstatoj 0,1 - 1 la eniro kaj koncerna relajso estas aktiva
const BM_EN0 = 0b1000; //<<8;
const BM_EN1 = 0b1000<<4; //<<12;

// agordo de relajso kaj konektoj
// bitoj 1..3: 1 - la relajso estas konektita al la koncerna drato
// 4a bito: relajso ekzistas
const BM_RK0 = 0b1111<<8
const BM_RK1 = 0b1111<<12;
// bitmaskoj bildigo relajsaj ŝaltaj kolumnoj -> eliroj 0 kaj 1
// eliro estas aktiva (elkondukas elektron) se ĉiuj relajsoŝaltiloj
// en la koncerna kolumno estas fermitaj 
// (=1 - la eliro estas konektita al la koncerna drato)
const BM_EL0 = 0b111<<16;
const BM_EL1 = 0b111<<20;

// restas 8 pli altaj bitoj por aliaj ecoj

// diversa agordo de relajsoj kaj eliroj
const RE0 = 0b0000;
const RE1 = 0b0001;
const RE2 = 0b0010;
const RE3 = 0b0011;
const RE4 = 0b0100;

const RK1 = 0b1001;
const RK2 = 0b1010;
const RK3 = 0b1011;
const RK7 = 0b1111;

// el0 = el1
const EL1 = 0b0001;
const EL3 = 0b0011;
const EL4 = 0b0100;
//const for_mov = 0b0011;

const NE  = RE1 | RK1<<8 | EL1<<16;
const KAJ = RE0 | RE0<<4 | RK1<<8 | RK1<<12 | EL1<<16 | EL1<<20;
const NEK = RE1 | RE1<<4 | RK1<<8 | RK1<<12 | EL1<<16 | EL1<<20;
const NKAJ= RE3 | RE3<<4 | RK2<<8 | RK1<<12 | EL3<<16 | EL3<<20;
const AŬ  = RE1 | RE2<<4 | RK2<<8 | RK1<<12 | EL3<<16 | EL3<<20;
const XAŬ = RE2 | RE1<<4 | RK3<<8 | RK3<<12 | EL3<<16 | EL3<<20;
const EKV = RE2 | RE2<<4 | RK3<<8 | RK3<<12 | EL3<<16 | EL3<<20;
const KAJXAŬ = RE2 | RE1<<4 | RK7<<8 | RK7<<12 | EL3<<16 | EL4<<20;

const UNUO = 50; // kampoj de platoj kaj panelo estas 50x50 punktoj, 
                 // plato kun unu relajso estas 100x50, kun du relajsoj estas 100x100

class LPordo {

    /**
     * ĉiu logikpordo povas havi unu aŭ du enirojn kun relajsoj
     * ĉiu relajso povas havi 1..3 ŝaltiloj en fermita aŭ malfermita stato
     * ĉiu kolumno da ŝaltiloj difinas la staton de elira drato, unu aŭ pluraj dratoj povas
     * konduki al unu aŭ du eliroj. La difino de tia aranĝo per bitmaskoj vd. supre
     * 
     * // ekz-e XAŬ-pordo:
     * b00..03: 0b1010 // supra relajso havas fermitan kaj malfermitan klapon
     * b04..07: 0b1001 // malsupra relajso havas malfermitan kaj fermitan klapon
     * b08..11: 0b0011 // ambaŭ kolumnoj de klapoj difinas la staton de sola eliro
     * b12..15: 0b0011 // dua eliro estas kunigita kun la unua
     * b16+b17: forigebla / movebla sur panelo
     * @param {uint32} aranĝo 
     */
    constructor(aranĝo) {
        this.aranĝo = aranĝo;
    }

    /**
     * Redonas araeon de du nombroj: nombro da kolumnoj (2)
     * kaj nombron da vicoj (1..2)
     * @returns 
     */
    /*
    formato() {
        return [2, (this.aranĝo & BM_RE1)? 2 : 1]
    }*/

    /**
     * bitoj pri relajso 0 resp. 1
     */
    re(n) {
        if (n == 0) return (this.aranĝo & BM_RE0);
        if (n == 1) return (this.aranĝo & BM_RE1) >> 4;
    }

    rk(n) {
        if (n == 0) return (this.aranĝo & BM_RK0) >> 8;
        if (n == 1) return (this.aranĝo & BM_RK1) >> 12;
    }

    el_(n) {
        if (n == 0) return (this.aranĝo & BM_EL0) >> 16;
        if (n == 1) return (this.aranĝo & BM_EL1) >> 20;
    }

    /** kiom da ŝaltilovicoj ni havas. Ni kalkulas tion el la eliroj */
    ŝlt() {
        // kiom da ŝaltilokolumnoj difinas elirojn
        let el = ((this.aranĝo & BM_EL0) >> 16) | ((this.aranĝo & BM_EL1) >> 20);
        if (!el) throw("Neniu eliro difinita!");
        // kio estas la plej alta bito
        let ab = 0;
        while (el >>= 1) { 
            ab++;
        }
        return ab+1;
    }

    /**
     * skribas la staton de eniroj en la koncernajn bitojn
     * @param {int} eniro numero de la eniro (0,1) 
     * @param {bool} aktiva stato de la eniro (True: aktiva, False: neaktiva)
     * @returns 
     */
    ŝaltu(eniro, aktiva) {
        // ni skribu la aktualajn enirostatojn
        // ni uzas -aktiva, ĉar ĉe -1 ĉiuj bitoj estas 1, do ankaŭ la maskita bito
        // dum ĉe -0 senŝanĝe ĉiuj bitoj restas 0
        const bm = eniro? BM_EN1 : BM_EN0;
        // purigu la eniro-biton
        this.aranĝo &= ~bm;
        // metu la novan valoron
        this.aranĝo |= (-aktiva & bm);
    }

    /**
     * Redonas la enirstaton de la logikpordo, legante la du
     * koncernajn bitojn
     */
    en() {
       return [
            ((this.aranĝo & BM_EN0) >> 3),
            ((this.aranĝo & BM_EN1) >> 7)
       ];
    }

    /**
     * kalkulas la elirstaton de la logikpordo depende de la
     * aktuala stato de eniroj;
     * se ni havas nur unu relajson, ni ignoras la dua eniron
     */
    el(nro) {
        // ni legu la aktualajn enirostatojn
        // poste ni uzas -e0, -e1, ĉar ĉe -1 ĉiuj bitoj estas 1, do ankaŭ la maskita bito
        // dum ĉe -0 senŝanĝe ĉiuj bitoj restas 0
        const e0 = ((this.aranĝo & BM_EN0) >> 3) 
        const e1 = ((this.aranĝo & BM_EN1) >> 7);

        // ĉiuokaze ni bezonas la konektojn de la eliroj
        const el = nro? (this.aranĝo & BM_EL1) >> 20 : (this.aranĝo & BM_EL0) >> 16;

        // variablo por elirostatoj
        let s_el;

        // se ni havas unuan relajson (normale ni havas almenaŭ tiun) ni kalkulas ĝian staton
        // depende de unua eniro, ni supozas ke ĉiuj kvar bitoj
        // estas 0, se ĝi ne ekzistas (alikaze oni devus aldoni >> 3 por havi nur
        // la ekzistobiton sole)
        const rk0 = (this.aranĝo & BM_RK0) >> 8;
        if (rk0) {
            // relajsostato depende de e0
            const re0 = this.aranĝo & BM_RE0;
            //const rs0 = (-e0 ^ re0) & rk0;
            const rs0 = (-e0 & rk0) ^ re0;
            // elirostato el stato de relajso 0
            s_el = rs0 & el;    
        }

        // se ekzistas dua relajso ni alkalkulu ĝin
        const rk1 = (this.aranĝo & BM_RK1) >> 12;
        if (rk1) {
            // relajsostato depende de e1
            const re1 = (this.aranĝo & BM_RE1) >> 4;
            // const rs1 = (-e1 ^ re1) & rk1;
            const rs1 = (-e1 & rk1) ^ re1;

            // kombinita elirostato el relajso 0 kaj 1
            s_el &= rs1 & el;    
        }

        // s0 kaj s1 povas havi iujn valorojn inter 0 = eliro senelektra aŭ
        // 1..7 unu ĝis tri dratoj kondukas elektron
        // se ni interesiĝas nur ĉu eliras elektro ni povus ankoraŭ transformi tion al bulea valoro
        // aŭ testi !== 0
        return s_el;
    }

    /**
     * protokolu la nunan staton
     */
    skribu_staton() {
        console.log(
               "EN0:" + ((this.aranĝo & BM_EN0) >> 3).toString(2) 
            + " EN1:" + ((this.aranĝo & BM_EN1) >> 7).toString(2));
        console.log(
               "RE0:" + (this.aranĝo & BM_RE0).toString(2)
            + " RK0:" + ((this.aranĝo & BM_RK0) >> 8).toString(2));
        console.log(
               "RE1:" + ((this.aranĝo & BM_RE1) >> 4).toString(2)
            + " RK1:" + ((this.aranĝo & BM_RK1) >> 12).toString(2));
        console.log(
               "EL0:" + ((this.aranĝo & BM_EL0) >> 16).toString(2)
            + " s: " + this.el(0));
        console.log(
               "EL1:" + ((this.aranĝo & BM_EL1) >> 20).toString(2)
            + " s: " + this.el(1));
                //        console.log(
//            "FOR:" + ((this.aranĝo & BM_FOR) >> 16).toString(2) 
//          + " MOV:" + ((this.aranĝo & BM_MOV) >> 17).toString(2));
  }
}


/**
 * Platoj, kiujn nie aranĝas sur panelo, havas certan nombron de eniroj sur la maldekstra flanko 
 * - po unu meze de ĉiu altecunuo, kaj nombron da elrioj. Ĉi tiuj estas konektitaj al eniroj 
 * de iu dekstre najbara plato. Ni ĉi tie regas la konektojn de la eliroj al najbaraj eniroj, 
 * supozante ke elektro kaj statoŝanĝoj ĉiam iras nur de maldekstre dekstren. Tiucele po ĉiu eliro 
 * ni povas havi paron [najbaro,eniro]
 */
class LPlato {
    /**
     *  
     * @param {int} eniroj - nombro da eniroj
     * @param {int} eliroj - nombro da eliroj
     */
    constructor(id, eniroj, eliroj) {
        this.id = id || LSVG.uuid();

        // nombro da eniroj
        this.eniroj = eniroj;
        // al eliroj ni ligos enirojn de najbaraj platoj
        // por tiuj rilatoj ni kreas areon (vd. ligu/malligu)
        if (eliroj) this.eliroj = new Array(eliroj);        
    }

    ligu(el,najbaro,en) {
        this.eliroj[el] = [najbaro,en];
    }

    malligu(el) {
        this.eliroj[el] = undefined
    }


    /**
     * Abstrakta funkcio redonanta la elirostaton 
     * @param {*} nro numero de la eliro
     */
    el(nro) {
        throw("Abstrakta funkcio devas esti realigita en la aparta subklaso de Plato!")
    }

    /**
     * ŝaltu eniron al aktiva aŭ malaktiva stato
     * la logiko dependas la platospeco, do tie ĉi
     * estas nur abstrakta funkcio
     * @param {int} nro 
     * @param {bool} aktiva 
     */
    ŝaltu(eniro, aktiva) {
        throw("Abstrakta funkcio devas esti realigita en la aparta subklaso de Plato!")
    }

    ŝaltu_najbarojn() {
        // ŝanĝu enirostatojn de najbaraj platoj laŭ propra elirostatoj
        for (let nro=0; nro<this.eliroj.length; nro++) {
            // ŝaltu ligitajn platojn
            const njb = this.eliroj[nro];
            if (njb) {
                const s_el = this.el(nro);
                njb[0].ŝaltu(njb[1],s_el);
            }
        }
    }

}

/**
 * La kovradon de rektangula panelo ni prizorgas per bitmaskoj por ĉiu vico
 * Ni uzas areon de okbitaj nombroj por prizorgi la liberajn kaj okupitajn lokojn
 * en maksimume 8 vertikaloj.
 * Se vi volas pli larĝan panelon, uzu Uint16 anstataŭ Uint8
 * 
 */
class LKovro {
    
    constructor(vicoj, kolumnoj=8) {
        this.vic = vicoj;
        this.kol = kolumnoj;
        // por prizorgi la liberajn kaj okupitajn lokojn
        this.okupo = new Uint8Array(vicoj);
    }

    static bitmask(kol,dk) {
        // Kreu bitmaskon por la okupendaj kol..kol+dk
        // Ni ŝovas tiom da 1 kiom la plato okupas kolumnojn
        // de la pozicio 32 al la koncerna vico ĉe la malaltaj 8 bitoj
        return (1<<31)>>(dk-1) >>> (24+kol);
    }

    /**
     * Rigardu, ĉu estas libera spaco por plato dk x dv
     * ĉe koordinatoj vico, kolumno
     * @param {*} dk 
     * @param {*} dv 
     * @param {*} vico 
     * @param {*} kolumno 
     * @returns 
     */
    libera(dk,dv,kolumno,vico) {
        const bm = LKovro.bitmask(kolumno,dk);

        let lb = true;
        for (let v=vico; v < vico+dv; v++) {
            lb &&= ((this.okupo[v] & bm) == 0)
        }

        return lb;
    }

   /**
     * Rigardu, ĉu estas libera spaco por plato dk x dv
     * ĉe koordinatoj vico, kolumno. La malnovaj koordinatoj
     * de la plato estas ankaŭ donitaj. Do se la nova loko 
     * parte kovras la novan, tio estas konsiderata
     * @param {*} dk 
     * @param {*} dv 
     * @param {*} vico 
     * @param {*} kolumno 
     * @returns 
     */
    libera_nov(dk,dv,kol_nov,vic_nov,kol_malnov,vic_malnov) {
        const bm_nov = LKovro.bitmask(kol_nov,dk);
        const bm_malnov = LKovro.bitmask(kol_malnov,dk);

        let lb = true;
        for (let v=vic_nov; v < vic_nov+dv; v++) {
            let okup = this.okupo[v];
            if (v >= vic_malnov && vic_malnov < v+dv) {
                okup &= ~bm_malnov;
            }
            lb &&= ((okup & bm_nov) == 0)
        }

        return lb;
    }    

    /**
     * Okupu lokon dk x dv ĉe vico, kolumno
     * @param {*} dk 
     * @param {*} dv 
     * @param {*} vico 
     * @param {*} kolumno 
     */
    okupu(dk,dv,kolumno,vico) {
        if (this.libera(dk,dv,kolumno,vico)) {
            const bm = LKovro.bitmask(kolumno,dk);

            // okupu la lokon
            for (let v=vico; v < vico+dv; v++) {
                // ni ne devas estingi bitojn, ĉar la loko estas libera!
                this.okupo[v] |= bm;
            }
        } else {
            throw(`Loko ${dk} x ${dv} ne libera ĉe ${kolumno}, ${vico}!`)
        }
    }

    /**
     * Liberigu lokon dk x dv ĉe vico, kolumno
     */
    malokupu(dk,dv,kolumno,vico) {
        const bm = LKovro.bitmask(kolumno,dk);

        // liberigu la lokon
        for (let v=vico; v < vico+dv; v++) {
            // ni ne devas estingi bitojn, ĉar la loko estas libera!
            this.okupo[v] &= ~bm;
        }        
    }
}

/**
 * Provizas statikajn metodojn por krei XML/SVG-elementojn kaj ŝanĝi ties atributojn.
 * kaj kiel klaso ligiĝas al SVG-dokumento (elemento <svg>) kaj prizorgas ties enhavon
 */

class LSVG {

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

    static unuo(pt) {
        return pt/50*UNUO;
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
            LSVG.a(elm, {transform: `translate(${x} ${y})`});
    }

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

    event_koordinatoj(event) {
        let pt = this.svg.createSVGPoint();
        pt.x = event.clientX;
        pt.y = event.clientY;
        let CTM = this.svg.getScreenCTM();
        let inverseCTM = CTM.inverse();
        let svgPoint = pt.matrixTransform(inverseCTM);
        return svgPoint;
    }    

}

class LSVGPlato extends LPlato {

    constructor(id,eniroj,eliroj,larĝo,alto,forigo,marko) {
        super(id,eniroj,eliroj);

        // formato en unuoj
        this.larĝo = larĝo;
        this.alto = alto;

        // formato en punktoj
        const alt=alto*UNUO;
        const lrĝ = larĝo*UNUO;

        // SVG grupo-elemento, kiu entenas la grafikon de la ilo
        this.g = LSVG.e("g",{
            id: this.id,
            class: "plato"
        });    
        
        const r = LSVG.e("rect",{
            class: "plato fono",
            height: alt,
            width: lrĝ,
            rx: 5,
        });
        this.g.append(r);    

        if (forigo) {
            const x = LSVG.e("text",{
                class: "for",
                x: lrĝ-9,
                y: 9
            },
            "\u274c");
            this.g.append(x);    

            x.addEventListener("click",() => {
                forigo(this);
            });
        }

        if (marko) {
            r.addEventListener("click",() => {
                marko(this);
            });    
        }
    }

    nomo(nom) {
        const t = LSVG.e("text",{ x: 1/5*UNUO, y: 3/10*UNUO}, nom);
        this.g.append(t);
    }

    kontakto(x=2,y=20,e) {
        const c = LSVG.e("circle",{ class: "kontakto", cx: x, cy: y, r: 2 });   
        this.g.append(c);
        if (e) {
            const t = LSVG.e("text",{ x: x+.5, y: y+11 }, e);        
            this.g.append(t);
        }      
        return c;     
    }

    /**
     * 
     * @param {int} x x-koordinato
     * @param {int} y y-koordinato
     * @param {string} e etikedo
     * @returns 
     */
    lumo(x,y,e) {
        const gl = LSVG.e("g",{
            class: "lumo"
        });

        const c = LSVG.e("circle",{ class: "lumo", cx: x, cy: y, r: 3.5 });   
        gl.append(c);
        if (e) {
            const t = LSVG.e("text",{ x: x, y: y, class: "lumo" }, e);        
            gl.append(t);
        }   
        this.g.append(gl)   
        return gl;     
    }

    marku(mark) {
        const r = this.g.querySelector("rect.plato");
        if (r) {
            r.classList.toggle("markita",mark);
        }
    }

    markita() {
        return this.g.querySelector(".markita");
    }    

}

class LButono {
    constructor(id,klaso="butono",surskribo, x, y, w, h) {
        this.id = id;
        this.surskribo = surskribo;
        this.g = LSVG.e("g",{ id: id, class: klaso})
        const r = LSVG.e("rect",{ x: x, y: y, width: w, height: h, rx: 3 });
        // y: +1.5: iom pli sube pro supersignoj
        const t = LSVG.e("text", { x: x+w/2, y: y+1.5+h/2 },surskribo);
        this.g.append(r,t);        
    }

    reago(rg) {
        const self = this;
        this.g.addEventListener("click",(ev) => {
            rg(self);
        })
    }
}

class LMenuo {
    constructor(id, klaso="menuo", w=400, h=20, reago) {
        this.id = id;
        this.reago = reago;

        // SVG grupo-elemento, kiu entenas la grafikon de la ilo
        this.g = LSVG.e("g",{
            id: id,
            class: klaso
        });    

        const r = LSVG.e("rect",{
            width: w,
            height: h,
            rx: 5
        });

        this.g.append(r);
    }

    menueroj(...eroj) {
        const y0 = 2, x0 = 5;
        const h = 16, w = 32;
        const self = this;
        eroj.forEach((ero,n) => {
            const btn = new LButono("menuero_"+ero,"menuero butono",ero,x0 + n*(w+2), y0, w, h);   
            btn.reago((btn) => {
                if (self.reago)
                    self.reago(btn.surskribo);
            });
            this.g.append(btn.g);
        })
    }

}

/**
 * La panelo prizorgas la aranĝon de la logikpordoj (platoj) sur ĝi.
 */

class LPanelo extends LSVG {

    constructor(svg,aranĝo) {
        super(svg);

        // ni uzas aranĝon de kampoj kun grandeco 50x50
        const vb = svg.getAttribute("viewBox").split(" ");
        this.kolumnoj = Math.ceil(vb[2]/50);
        this.vicoj = Math.ceil((vb[3]-20)/50); // -20 pro la supra menuo ni redukto la uzeblan altecon

        // la listo de la platoj
        this.platoj = {}; // { <plato.id>: { plato, k, v } }
        // ni devas prizorgi la okupitajn kau liberajn lokojn
        this.kovro = new LKovro(this.vicoj,this.kolumnoj);

        // fono
        const r = LSVG.e("rect", {
            class: "panelo",
            width: vb[2],
            height: parseInt(vb[3])+parseInt(vb[1]), // se ni havas negativa y-koordinaton, ni reduktu la altecon
            rx: 5
        });
        this.svg.append(r);

        // montru kradon UNUOxUNUO
        const g = LSVG.e("g", {
            class: "krado"
        });
        for (let v = 0; v<this.vicoj; v++) {
            for (let k = 0; k<this.kolumnoj; k++) {
                const r1 = LSVG.e("rect",{ x: UNUO*k, y: UNUO*v, width: UNUO, height: UNUO, rx: 5 });
                g.append(r1);
            }
        }

        // ni metas horizontalajn dratojn en ĉiu loko kie povas
        // esti eniroj kaj eliroj, tiel ni havas aprioran konekton
        // trans liberaj kampoj
        const g1 = LSVG.e("g", {
            class: "plato"
        });

        for (let v = 0; v<this.vicoj; v++) {
            const l = LSVG.e("line",{ x1: 0, y1: UNUO*(2/5+v), x2: vb[2], y2: UNUO*(2/5+v) });
            g1.append(l);
        }
            
        r.addEventListener("click",(event) => {
            // se iu plato estas martkita, metu ĝin en la montritan lokon
            const plato = this.markita();
            if (plato) {
                const pt = this.event_koordinatoj(event);
                const kolumno = Math.floor(pt.x/UNUO);
                const vico = Math.floor(pt.y/UNUO);
                console.log("vico: "+vico+" kolumno: "+kolumno);

                const dk = plato.larĝo
                const dv = plato.alto
                   
                // se la loko estas libera ni povas movi la markitan 
                // platon tien
                const pi = this.platoj[plato.id];        
                if (this.kovro.libera_nov(dk,dv,kolumno,vico,pi.k,pi.v)) {
                    // malokupu nunan lokon kaj okupu la novan
                    //this.kovro.malokupu(dk,dv,undefined,undefined);
                    //this.kovro.okupu(dk,dv,kolumno,vico);

                    // sencimigo
                    console.log("ANTAŬ MOVO:")
                    this.skribu_ligojn();

                    this.forigu(plato);
                    this.metu(plato,kolumno,vico);

                    // sencimigo
                    console.log("POST MOVO:")
                    this.skribu_ligojn();
                }
            }
        });

        this.svg.append(g,g1);

        // se antaŭaranĝo de menuo/platoj estas donita, kreu ĝin
        if (aranĝo) {
            this.kreu(aranĝo)
        }
    }


    /**
     * Kreu menuon kaj evtl. donitan aranĝon de platoj
     * @param {*} aranĝo 
     */
    kreu(aranĝo) {
        const self = this;

        function forigo(plato) { 
            self.forigu(plato); 
        }

        function marko(plato) {
            self.marku(plato);
        }

        function menuero_reago(ero) {
            const plato = kreu_platon(ero);

            if (ero == "xy" || ero == "xyz" || ero == "abcdef") {
                const EN = Object.values(self.platoj).find((v) => {
                    return (v.plato instanceof LEnirPlato)
                });
                if (EN) self.forigu(EN.plato);
                self.metu(plato,0,0);
            } else {
                self.metu_ien(plato);
            }
        }

        function kreu_platon(nomo) {
            const [Pk,...args] = {
                "EN": [LEnirPlato,2],
                "xy": [LEnirPlato,2],
                "xyz": [LEnirPlato,3],
                "abcdef": [LEnirPlato,6],
                "EL": [LElirPlato],
                "ID0":  [LIDPlato,0],
                "ID1":  [LIDPlato,1],
                "NE":   [LPordPlato,NE],
                "KAJ":  [LPordPlato,KAJ],
                "NKAJ": [LPordPlato,NKAJ],
                "AŬ":   [LPordPlato,AŬ],
                "XAŬ":  [LPordPlato,XAŬ],
                "NEK":  [LPordPlato,NEK],
                "EKV":  [LPordPlato,EKV],
                "KAJXAŬ": [LPordPlato,KAJXAŬ]
            }[nomo];
            if (Pk === LPordPlato || Pk === LIDPlato) {
                return new Pk(undefined,...args,forigo,marko,nomo=="KAJXAŬ"?'=1/&':nomo);        
            } else {
                return new Pk(undefined,...args);
            }
        }

        // kreu menuon por la diversaj logikplatoj
        if (aranĝo.menuo) {
            const vb = this.svg.getAttribute("viewBox").split(" ");

            const menuo = new LMenuo("MENU","menuo",vb[2],-vb[1],menuero_reago);
            menuo.menueroj(...aranĝo.menuo);
        
            this.ŝovu(menuo.g,0,-20);
            this.svg.append(menuo.g);
        }

        if (aranĝo.platoj) {
            for (const p of aranĝo.platoj) {
                const plato = kreu_platon(p[0]);
                this.metu(plato,p[1],p[2]);               
            }
        }
    }


    /**
     * Maldekstra najbaro
     * @param {*} k kolumno ekde kiu maldekstre ni serĉu 
     * @param {*} v vico en kiu ni serĉu
     */
    najbaro_maldekstra(k,v) {
        if (k >= 0) {
            for (let _k = k; _k >= 0; _k--) {
                const njb = Object.values(this.platoj).find((p) => 
                    p.k == _k && p.v <= v && p.v + p.plato.alto > v);
                if (njb) return njb
            }
        }
    }


    /**
     * Dekstra najbaro
     * @param {*} k kolumno ekde kiu dekstre ni serĉu 
     * @param {*} v vico en kiu ni serĉu
     */
    najbaro_dekstra(k,v) {
        if (k < this.kolumnoj) {
            for (let _k = k; _k<this.kolumnoj; _k++) {
                const njb = Object.values(this.platoj).find((p) =>
                    p.k == _k && p.v <= v && p.v + p.plato.alto > v);
                if (njb) return njb
            }
        }
    }    

    /**
     * Trovu liberan lkon por plato
     * @param {LSVGPlato} plato 
     * @returns [kolumno,vico]
     */
    trovu_lokon(plato) {
        for (let v = 0; v<this.vicoj; v++) {
            for (let k = 0; k<this.kolumnoj; k++) {
                if (this.kovro.libera(plato.larĝo,plato.alto,k,v))
                    return [k,v];
            }
        }
    }

    /**
     * Metu platon en liberan lokon
     * @param {LSVGPlato} plato 
     */
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
     * @param {*} k kolumno
     * @param {*} v vico
     */
    metu(plato,k,v) {
        const dk = plato.larĝo; 
        const dv = plato.alto; 
        
        // okupu la koncernan lokon
        this.kovro.okupu(dk,dv,k,v);
        this.platoj[plato.id] = { plato, k, v };

        // KOREKTU: append nur se ne jam troviĝas        
        this.svg.append(plato.g);
        // ŝovu la platon al la ĝusta loko en SVG
        this.ŝovu(plato.g,UNUO*k,UNUO*v);


        // trovu dekstrajn najbarojn en la okupitaj vicoj
        // por ligi elriojn al ties eniroj

        if (v+dv <= this.vicoj && k+dk <= this.kolumnoj) {

            for (let _v = v; _v < v+dv; _v++) {

                const njb1 = this.najbaro_maldekstra(k-1,_v);
                if (njb1) {
                    njb1.plato.ligu(_v-njb1.v,plato,_v-v);
                    // ŝaltu la platon laŭ la elirostato de la najbaro
                    const s_el = njb1.plato.el(_v-njb1.v);
                    plato.ŝaltu(_v-v,s_el);
                }

                // kaj dekstre
                const njb2 = this.najbaro_dekstra(k+dk,_v);
                if (njb2) {
                    plato.ligu(_v-v,njb2.plato,_v-njb2.v)
                    // ŝaltu la najbaran platon laŭ la propra elirostato 
                    const s_el = plato.el(_v-v);
                    njb2.plato.ŝaltu(_v-njb2.v,s_el);
                }
            }
        }
        
    }

    forigu(plato) {
        //let imin, jmin;
        const pi = this.platoj[plato.id];
        const dk = plato.larĝo; 
        const dv = plato.alto; 

        for (let _v = pi.v; _v < pi.v+dv; _v++) {

            const p_el = plato.eliroj[_v-pi.v];
            const njb1 = this.najbaro_maldekstra(pi.k-1,_v);

            if (njb1) {
                const njb_el = _v-njb1.v;
                // ligu eliron de la maldekstra najbaro al nia evtl. dekstra najbaro
                njb1.plato.ligu(njb_el,...p_el);
                // aktualigu staton
                if (p_el) p_el[0].ŝaltu(p_el[1],njb1.plato.el(njb_el));
            } else if (p_el) {
                // forigu ligojn dekstrajn en la linio _v
                // ne necesas, ĉar ni forigas la platon: plato.malligu(_v-pi.v);

                // ni ne havas maldekstran najbaron, sed dekstran kiun eble
                // ni devas aktualigi
                p_el[0].ŝaltu(p_el[1],false);
            }
        }

        // liberigu la kampon en la panelo
        this.kovro.malokupu(dk,dv,pi.k,pi.v);
        delete this.platoj[plato.id];

        // forigu la pecon el svg
        plato.g.remove();
    }    


    /**
     * Redonas markitan platon, se troviĝas tia
     * @returns 
     */
    markita() {
        for (const p of Object.values(this.platoj)) {
            if (p.plato.markita()) {
                console.log("markita: "+p.plato.id);
                return(p.plato);
            };
        };
    }    

    /**
     * Se la plato ne estas markita: markas la koncernan platon kaj malmarkas ĉiujn aliajn.
     * Aliokaze ĝi estas malmarkita
     * @param {*} plato 
     */
    marku(plato) {
        if (plato.markita()) {
            plato.marku(false);
        } else {
            Object.values(this.platoj).forEach((p) => {
                if (p.plato === plato) p.plato.marku(true);
                else p.plato.marku(false);
            });  
        }
    }

    skribu_ligojn() {
        for (const p of Object.values(this.platoj)) {
            if (p.plato.eliroj) {
                console.log(`${p.plato.id}: `);
                for (const el of p.plato.eliroj) {
                    const p_el = this.platoj[el[0].id]
                    const erara = !p_el || p.k > p_el.k? "ERARA" : "";
                    console.log(`  -> ${el[0].id} ${el[1]} ${erara}`);
                }
            }
        }
    }

}


// plato kun logikpordo
class LPordPlato extends LSVGPlato {
    constructor(id,aranĝo,forigo,marko,nomo=id) {
        const pordo = new LPordo(aranĝo);
        const ŝlt = pordo.ŝlt();
        const rel1 = pordo.rk(1) != 0;
        const unuoj = 1+rel1
        super(id,unuoj,unuoj,2,unuoj,forigo,marko);
        this.pordo = pordo;
        this.relajsoj = [];

        // koordinatoj laŭ la diversaj aranĝoj
        const X=[
            [75],
            [75,60],
            [80,65,50]
        ][ŝlt-1];        
        const Yj=[
            [[],[6,10,25,40,45]],
            [
                [6,10,96],
                [6,10,25,40,96],
                [6,10,75,90,96],
                [6,10,25,40,75,90,96]
            ]
        ][0+rel1];
        const ye=[45,96][0+rel1];

        // 1 aŭ 2 relajsoj
        this.relajso(0,X,2/5*UNUO);
        if (rel1) this.relajso(1,X,7/5*UNUO);

        const el0 = pordo.el_(0);
        const el1 = pordo.el_(1);

        // ni unue traktas la pli simplan kazon, kiam
        // ambaŭ eliroj estas kunigitaj aŭ entute estas
        // nur unu relajso kaj unu eliro
        if (el0 == el1 || el1 == 0) {
            const xe = 90+X.length;

            // ĉiu kolumno da relajsoŝaltiloj
            for (let i = 0; i<X.length; i++) {
                // kiu relajso havas ŝaltilon en tiu kolumno estas
                // difinita en rk-bitoj
                const b0 = (pordo.rk(0) & (1<<i))>>i;
                const b1 = (pordo.rk(1) & (1<<i))>>i;
                // laŭ tiuo ni elektas la diversajn y-koordinatojn
                const Y = Yj[ b0 | (b1<<1) ];
                this.drato(X[i],xe,Y);
            }

            if (el0 == el1) {
                // la du eliroj estas konektitaj
                // do ambaŭ donas unu saman rezulton
                this.eliro(3,xe,ye)
            } else if (el1 == 0) {
                this.eliro(1,xe,ye);
            }            
        } else {
            // en la pli komplika kazo la diversaj kolumnoj
            // distribuiĝas al la du eliroj laŭ la eliro-bitoj aparte
            const xe1 = LSVG.unuo(88);
            const xe2 = LSVG.unuo(92);

            // ĉiu kolumno da relajsoŝaltiloj
            for (let i = 0; i<X.length; i++) {
                // kiu relajso havas ŝaltilon en tiu kolumno estas
                // difinita en rk-bitoj
                const b0 = (pordo.rk(0) & (1<<i))>>i;
                const b1 = (pordo.rk(1) & (1<<i))>>i;
                // laŭ tiuo ni elektas la diversajn y-koordinatojn
                const Y = Yj[ b0 | (b1<<1) ];

                // se la kolumno i estas konektita al el0,
                //ni devas elekti kiel fina y=92 kaj xe=88
                // se al el1 ni elektu y=96, xe=92
                let xe, ye;
                if (el0 & (1<<i)) {
                    xe = xe1;
                    ye = LSVG.unuo(92)
                } else if (el1 & (1<<i)) {
                    xe = xe2;
                    ye = LSVG.unuo(96)
                };
                Y[Y.length-1] = ye;
                this.drato(X[i],xe,Y);
            }

            this.eliro(1,xe1,ye-4);
            this.eliro(2,xe2,ye);
        }

        if(nomo) this.nomo(nomo);
    }

    relajso(nro,X,y) {
        const rk = this.pordo.rk(nro);
        const re = this.pordo.re(nro);
        const id_rel = this.id + '_rel' + nro;

        if (rk) {
            // grupo por kunigi partojn de la relajso
            const rel = LSVG.e("g",{id: id_rel});

            // kontakto
            const c = LSVG.e("circle",{ class: "kontakto", cx: 2, cy: y, r: 2 });   
            /*
            if (e) {
                const t = LSVG.e("text",{ x: .5, y: y+11 },e);        
                this.g.append(t);
            }      
            */

            // bobeno
            const r = LSVG.e("rect",{ x: 2/5*UNUO, y: y+5, width: 2/5*UNUO, height: 12/50*UNUO });
            // drato
            const p = LSVG.e("path",{ d: `M5 0L${3/5*UNUO} 0L${3/5*UNUO} 5M${3/5*UNUO} ${17/50*UNUO}L${3/5*UNUO} ${24/50*UNUO}`,
                transform: `translate(0 ${y})`
            }); 
            // maso
            const l = LSVG.e("line",{ class: "maso", x1: 26/50*UNUO, y1: y+24/50*UNUO, x2: 34/50*UNUO, y2: y+24/50*UNUO });

            rel.append(c,r,p,l);
           
            for (let i = 0; i<X.length; i++) {
                if ((rk & (1<<i)) != 0)
                    this.ponto(rel,X[i],y,((re & (1<<i)) != 0))
            }

            this.g.append(rel);
            this.relajsoj[nro] = rel;
        }
    }

    // ŝaltilo de la relajso
    ponto(rel,w,y,fermita) {
        const ys = y+11/50*UNUO;
        const fend = -1 + 6*(1-fermita);
        // strekita
        // KOREKTU: se ni havas u pontojn ni tamen bezonas
        // nur unu pli longan kernon
        const p = LSVG.e("path",{ class: "kerno", d: `M${4/5*UNUO} ${ys}L${w-fend} ${ys}` });
        // klapo
        const klap = LSVG.e("path",{ class: "klapo", d: `M${w-fend} ${y+4}L${w} ${y+18/50*UNUO}` });
        const l = LSVG.e("line",{ x1: w, x2: w + (fermita?1.5:-1.5), y1: y+5, y2: y+5 });
        const c = LSVG.e("circle",{
            cx: w,
            cy: y+18/50*UNUO,
            r: 1
        });
        rel.append(p,klap,l,c);

        // const pt = {w: w, fermita0: fermita, fermita: fermita, klapo: klap};
        // this.pontoj.push(pt);
    }   

    drato(xp,xe,Y) {
        // poluso
        const y0 = Y[0];
        const c = LSVG.e("circle",{ class: "poluso", cx: xp, cy: y0, r: 3.5 });
        const p = LSVG.e("path",{ d: `M${xp} ${y0-2}L${xp} ${y0+2}M${xp-2} ${y0}L${xp+2} ${y0}` });
        this.g.append(c,p);

        // vertikalaj dratpecoj        
        for (let i=1; i < Y.length-1; i+=2) {
            const y1 = Y[i];
            const y2 = Y[i+1];
            const d = LSVG.e("line", { x1: xp, y1: y1, x2: xp, y2: y2 });
            this.g.append(d);
        }
        // horizontala linio
        const y = Y[Y.length-1];
        const h = LSVG.e("line", { x1: xp, y1: y, x2: xe, y2: y });
        this.g.append(h);
    }

    eliro(n=3, x=90, yd=95) { //,e="") {
        const y1 = n==1? 20:70;
        const y2 = n==3? 20:undefined;

        //this.kontakto(98,y1.e);
        let d = `M100 ${y1}L${x} ${y1}`;
        if (y2) { d += `L${x} ${y2}L100 ${y2}M${x} ${y2}` } ;
        d += `L${x} ${yd}`;
        
        const p = LSVG.e("path",{ d });
        this.g.append(p);
    }    

    /**
     * Redonas elirostaton
     * @param {*} nro 
     * @returns 
     */
    el(nro) {
        return this.pordo.el(nro);
    }

    /**
     * Ŝanĝas enirostaton kaj laŭe ŝaltas relajsojn kaj 
     * daŭrigas ankaŭ ŝanĝi la dekstrnajbarajn elirostatojn
     * @param {*} eniro 
     * @param {*} aktiva 
     */
    ŝaltu(eniro,aktiva) {
        console.debug(`ŝaltu ${this.id}:en${eniro}:${aktiva}`)
        // ŝanĝu la staton de la eniro
        this.pordo.ŝaltu(eniro,aktiva);
        const rel = this.relajsoj[eniro];

        // ŝanĝu staton de la kontakto
        const kontakto = rel.querySelector(`.kontakto`);
        if (kontakto) kontakto.classList.toggle("aktiva",aktiva);

        // ŝanĝu la staton de la ŝaltiloklapoj
        rel.querySelectorAll(".klapo").forEach((pt) => {
            // la turnopunkto troviĝas en la fino de la d-pado
            const d = pt.getAttribute("d").split("L");
            const [x,y] = d[d.length-1].split(" ");
            //LSVG.a(klapo, {d: `M${xw-fend} ${y+9}L${xw} ${y+25}`});
            if (aktiva) {
                LSVG.a(pt,{transform: `rotate(15 ${x} ${y})`});
                //pt.fermita = !pt.fermita0;
            } else {
                pt.removeAttribute("transform");
                //pt.fermita = pt.fermita0;
            }
        });

        this.pordo.skribu_staton();

        this.ŝaltu_najbarojn();
    }
}

class LIDPlato extends LSVGPlato {
    
    constructor(id,eniro=0,forigo,marko,nomo="ID"+eniro) {
        super(id,1,2,2,2,forigo,marko);
        this.eniro = eniro; // 0 aŭ 1
        this.aktiva = false;
        
        const y0 = (2/5+eniro)*UNUO;       
        const y1 = (7/5-eniro)*UNUO
        //const lumo = this.lumo(7,y0);
        //this.lumoj[5-v] = [lumo,false];
        //dratoj.kontakto(48,y);
        const d = LSVG.e("path",{ d: `M${4} ${y0}L${UNUO} ${y0}L${2*UNUO} ${y0}M${UNUO} ${y0}L${2*UNUO} ${y1}` });
        this.g.append(d);
        this.kontakto(2,y0)
        if (nomo) this.nomo(nomo);
    }

    el(nro) {
        return this.aktiva;
    }

    ŝaltu(nro,aktiva) {
        if (this.eniro == nro) {
            this.aktiva = aktiva;
            const kontakto = this.g.querySelector(".kontakto");
            if (kontakto) kontakto.classList.toggle("aktiva",aktiva);

            this.ŝaltu_najbarojn();
        }
    }
}

class LEnirPlato extends LSVGPlato {

    /**
     * Kreas tabulon kun ŝaltiloj por krei
     * enirelektron (enirsignalojn) por la cirkvito
     * Per 'mod' oni povas difinas kiom da diversaj
     * enirvariabloj ni havas, ekz mod=2 ni havas variablojn
     * x kaj y kun po 3 eniroj kunigitaj
     * @param {*} id 
     * @param {*} mod nombro de variabloj (2,3..6)
     */
    constructor(id,mod=2,kunigu=true) {
        super(id,0,6,1,6);
        //super(id,forigebla,"logikplato eniroj",50,300);
        LSVG.a(this.g,{
            class: "plato eniroj"
        });

        // per kunigoj ni povas doni al pluraj 
        // enirdratoj la saman staton (enirsignalon)
        // tiel ekz x1, x2, x3 ĉiuj povas roli kiel eniro x
        this.kunigoj = [];
        this.lumoj = new Array(6);

        // x, y, z resp. a,b,c,d,e,f
        const c = mod<=3? 120 : 97;
        for (t = 0; t<mod; t++) {
            const x = t? LSVG.unuo(40) : LSVG.unuo(2);
            const y = LSVG.unuo(12+50*t);
            const tx = LSVG.e("text",{ x, y },String.fromCharCode(c+t));
            this.g.append(tx);    
        }

        // krei enirojn 
        for (let v=0; v<6; v++) {
            const vic = v%mod;
            const nro = Math.ceil((6-v)/mod);

            const x = (1+v)*LSVG.unuo(7);
            const y0 = (1/5+(mod-vic-1))*UNUO;
            const y = (5.4-v)*UNUO;

            //const lumo = this.lumo(x,y0-2,nro);
            const lumo = new LButono(v,"lumo butono",nro,x-5,y0-8,10,9.5);            
            this.lumoj[5-v] = [lumo,false];
            //dratoj.kontakto(48,y);
            const d = LSVG.e("path",{ class: `drato dr_${vic+1}`, d: `M${x} ${y0+2}L${x} ${y}L${UNUO} ${y}` });
            this.g.append(lumo.g,d);

            /*
            lumo.addEventListener("click",() => {
                this.ŝaltu(5-v, true);
            });
            */
            const self = this;
            lumo.reago((btn) => {
                self.ŝaltu(5-btn.id, true);
            });

            // por trakti kunigojn ni devas scii 
            // la eliro-numerojn de la dratoj
            //drat.index = 5-i; 
            //this.eliroj(drat);
        }
        if (kunigu) {
            for (let v=5; v>=mod; v--) {
                this.kunigu(v,mod);
            }
        }
    }

    kunigu(n1,mod) {
        // se unu el la du jam estas kunigita kun alia,
        // aldonu tie
        const n2 = n1-mod;
        let added = false;
        for (const kn of this.kunigoj) {
            if (kn.has(n1)) {
                kn.add(n2);
                added = true;
                break;
            } else if (kn.has(n2)) {
                kn.add(n1);
                added = true;
                break;
            }
        }
        // se ne, kreu novan kunigon kiel Set-objekto
        if (!added) this.kunigoj.push(new Set([n1,n2]));

        // desegnu la kunigojn
        const xi = LSVG.unuo(7*(1+n1));
        const xj = LSVG.unuo(7*(1+n2));
        const y = (16/50+(6*mod-n1-1)%mod) * UNUO;

        const c1 = LSVG.e("circle",{ cx: xi, cy: y, r: 1 });
        const c2 = LSVG.e("circle",{ cx: xj, cy: y, r: 1 });
        const l = LSVG.e("path",{ d: `M${xi} ${y}Q${(xi+xj)/2} ${y+3} ${xj} ${y}` });
        this.g.append(c1,c2,l);
    }

    el(nro) {
        return this.lumoj[nro][1];
    }

    ŝaltu(eliro, kunigoj=false) {
        const lumo = this.lumoj[eliro];
        const aktiva = !lumo[1];

        // ŝanĝu staton de la lumo
        //this.lumoj[eliro][1] = aktiva;
        lumo[1] = aktiva;
        lumo[0].g.classList.toggle("aktiva",aktiva);

        // ŝaltu ligitajn platojn
        const njb = this.eliroj[eliro];
        if (njb) njb[0].ŝaltu(njb[1],aktiva);

        // kunigitajn elirojn ŝaltu al sama stato
        if (kunigoj) {
            this.kunigoj.forEach((kn) => {
                if (kn.has(eliro)) {
                    // ŝaltu ankaŭ ĉiujn kunigitajn dratojn (troveblaj per indekso en this.el)
                    kn.forEach((d) => {
                        if (d != eliro) this.ŝaltu(d, false); //this.eliroj[d] = aktiva
                    })
                }
            });
        }
    }
}

class LElirPlato extends LSVGPlato {
    constructor(id) {
        super(id,6,0,1,6);
        this.lumoj = new Array(6);
        //super(id,forigebla,"logikplato eliroj",50,300);
        
        for (let v=5; v>=0; v--) {
            //const drat = new LkPeco(false);
            const x = 10 + (v+1)%2*10
            const y = 270-v*50;
            // de maldekstre al la maso
            const d = LSVG.e("path",{ d: `M0 ${y}L30 ${y}L30 290` });
            this.g.append(d);
            const lumo = this.lumo(x,y);
            this.lumoj[5-v] = [lumo,false];

            //this.eniroj(drat);
        }
        // maso
        const m = LSVG.e("line",{ class: "maso", x1: 30-4, y1: 290, x2: 30+4, y2: 290 });
        this.g.append(m);
    }

    ŝaltu(eniro,aktiva) {
        const lumo = this.lumoj[eniro];
        // ŝanĝu staton de la lumo
        lumo[1] = aktiva;
        lumo[0].classList.toggle("aktiva",aktiva);
    }

}