
class KDiag {

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

    constructor(svg,n=3,unuo=10) {
        this.svg = svg;
        this.unuo=unuo;
        this.skaloj(n);
    }

    skaloj(n) {
        const w = parseFloat(svg.getAttribute("width"));
        const h = parseFloat(svg.getAttribute("height"));
        const k_r = KDiag.e("line",{
            class: "akso",
            x1: -w/2,
            y1: 0,
            x2: w/2,
            y2: 0
        });
        const k_i = KDiag.e("line",{
            class: "akso",
            x1: 0,
            y1: -h/2,
            x2: 0,
            y2: h/2
        });
        this.svg.append(k_r,k_i);
        for (let i=0; i<n; i++) {
            const c = KDiag.e("circle",{
                r: (1+i)*this.unuo
            });
            this.svg.append(c)
        };
    }
}

