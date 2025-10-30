
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

    /**
     * desegnas cirkleton kun linioj por reprezenti komplekson ĉe la origino
     */
    nombraĵo(id, komplekso = undefined) {
        const g = KDiag.e("g", {
            class: "komplekso",
            id: id
        })
        const c = KDiag.e("circle",{
            class: "rondo",
            //transform: `translate(${k.re*this.unuo} ${-k.im*this.unuo})`,
            // cx: k.re*this.unuo,
            // cy: -k.im*this.unuo,
            r: this.unuo/5
        });
        const c1 = KDiag.e("circle",{
            class: "punkto",
            //transform: `translate(${k.re*this.unuo} ${-k.im*this.unuo})`,
            // cx: k.re*this.unuo,
            // cy: -k.im*this.unuo,
            r: this.unuo/20
        });            
        const l = KDiag.e("line",{
            class: "helplinio no"
        });
        const im = KDiag.e("line",{
            class: "helplinio im"
        });
        const re = KDiag.e("line",{
            class: "helplinio re"
        });
        g.append(re,im,l,c,c1);
        this.svg.append(g);

        // se komplekso donita, poziciu tien
        if (komplekso) {
            this.movu_al(g,komplekso);
        }

        // movebligu
        g.addEventListener('mousedown', this.musmovo_ek.bind(this));
        g.addEventListener('touchstart', this.musmovo_ek.bind(this));        

        return g;
    }

    /**
     * Movu SVG g-elementon al la loko de komplekso
     * @param {*} g_id aŭ la SVG g-elemento aŭ ties id
     * @param {*} komplekso 
     */
    movu_al(g_id,komplekso) {
        const g = typeof g_id === "string" ? document.getElementById(g_id): g_id;
        if (g) {
            for (const ido of g.children) {
                if (ido.classList.contains("rondo") || ido.classList.contains("punkto")) {
                    KDiag.a(ido,{                        
                        cx: komplekso.re*this.unuo,
                        cy: -komplekso.im*this.unuo
                    });
                } else if (ido.classList.contains("no")) {
                    KDiag.a(ido,{
                        x2:  komplekso.re*this.unuo,
                        y2: -komplekso.im*this.unuo
                    });
                } else if (ido.classList.contains("im")) {
                    KDiag.a(ido,{
                        x2:  komplekso.re*this.unuo,
                        y1: -komplekso.im*this.unuo,
                        y2: -komplekso.im*this.unuo
                    });
                } else if (ido.classList.contains("re")) {
                    KDiag.a(ido,{
                        x1:  komplekso.re*this.unuo,
                        x2:  komplekso.re*this.unuo,
                        y2: -komplekso.im*this.unuo
                    });
                }
            };

        }
    }

    musmovo_ek(evt) {
        // elemento target: (<g>)
        // For touch, evt.touches[0] is the first finger
        const currentElement = evt.currentTarget; //evt.target.closest('g'); 
        if (!currentElement) return; // Only drag <g> elements

        // Prevent default browser dragging behavior
        evt.preventDefault();
        this.movata = currentElement;

        // 2. Get the starting coordinates
        const pointer = evt.touches ? evt.touches[0] : evt;
        this.startX = pointer.clientX;
        this.startY = pointer.clientY;

        // trovu la nunan pozicion
        const p = currentElement.querySelector(".punkto");
        this.currentX = parseFloat(p.getAttribute("cx"));
        this.currentY = parseFloat(p.getAttribute("cy"));

        // 4. Attach move/end listeners to the document/SVG to track movement globally
        // This is crucial to keep dragging even if the cursor leaves the element.
        this.svg.addEventListener('mousemove', this.musmovo.bind(this));
        this.svg.addEventListener('mouseup', this.musmovo_fin.bind(this));
        this.svg.addEventListener('touchmove', this.musmovo.bind(this));
        this.svg.addEventListener('touchend', this.musmovo_fin.bind(this));
    }

    musmovo(evt) {
        if (!this.movata) return;

        const pointer = evt.touches ? evt.touches[0] : evt;
        evt.preventDefault();

        // 1. Calculate the difference (delta)
        const dx = pointer.clientX - this.startX;
        const dy = pointer.clientY - this.startY;

        // 2. Calculate the new position
        const newX = this.currentX + dx;
        const newY = this.currentY + dy;

        // Metu la nombraĵon en la novan lokon
        console.log("nova loko: "+newX+","+newY);

        const re = newX/this.unuo;
        const im = -newY/this.unuo;
        this.movu_al(this.movata,{re, im});
        //currentElement.setAttribute('transform', `translate(${newX}, ${newY})`);
    }

    musmovo_fin(evt) {
        if (!this.movata) return;
        
        // forigu eventreagojn
        this.svg.removeEventListener('mousemove', this.musmovo);
        this.svg.removeEventListener('mouseup', this.musmovo_fin);
        this.svg.removeEventListener('touchmove', this.musmovo);
        this.svg.removeEventListener('touchend', this.musmovo_fin);

        this.movata = null;
    }
}

