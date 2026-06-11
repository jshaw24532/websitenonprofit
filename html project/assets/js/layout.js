(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{63:(e,t,r)=>{"use strict";var n=r(7260);r.o(n,"usePathname")&&r.d(t,{usePathname:function(){return n.usePathname}}),r.o(n,"useRouter")&&r.d(t,{useRouter:function(){return n.useRouter}}),r.o(n,"useSearchParams")&&r.d(t,{useSearchParams:function(){return n.useSearchParams}})},695:e=>{e.exports={style:{fontFamily:"'Playfair Display', 'Playfair Display Fallback'",fontStyle:"normal"},className:"__className_0a80b4",variable:"__variable_0a80b4"}},1578:(e,t,r)=>{"use strict";function n(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(){for(var e,t,r=0,n="",a=arguments.length;r<a;r++)(e=arguments[r])&&(t=function e(t){var r,n,a="";if("string"==typeof t||"number"==typeof t)a+=t;else if("object"==typeof t)if(Array.isArray(t)){var i=t.length;for(r=0;r<i;r++)t[r]&&(n=e(t[r]))&&(a&&(a+=" "),a+=n)}else for(n in t)t[n]&&(a&&(a+=" "),a+=n);return a}(e))&&(n&&(n+=" "),n+=t);return n}(t)}function a(e){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0}).format(e)}function i(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:8;return e.length<=2*t?e:"".concat(e.slice(0,t),"...").concat(e.slice(-t))}r.d(t,{cn:()=>n,v:()=>a,L:()=>i})},1847:(e,t,r)=>{"use strict";r.d(t,{A:()=>o});var n=r(2115);let a=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim()};var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,n.forwardRef)((e,t)=>{let{color:r="currentColor",size:s=24,strokeWidth:o=2,absoluteStrokeWidth:l,className:c="",children:d,iconNode:m,...h}=e;return(0,n.createElement)("svg",{ref:t,...i,width:s,height:s,stroke:r,strokeWidth:l?24*Number(o)/Number(s):o,className:a("lucide",c),...h},[...m.map(e=>{let[t,r]=e;return(0,n.createElement)(t,r)}),...Array.isArray(d)?d:[d]])}),o=(e,t)=>{let r=(0,n.forwardRef)((r,i)=>{let{className:o,...l}=r;return(0,n.createElement)(s,{ref:i,iconNode:t,className:a("lucide-".concat(e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()),o),...l})});return r.displayName="".concat(e),r}},2466:(e,t,r)=>{"use strict";r.d(t,{default:()=>f});var n=r(5155),a=r(2115),i=r(2619),s=r.n(i),o=r(63),l=r(9408),c=r(1847);let d=(0,c.A)("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);var m=r(3457);let h=(0,c.A)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),u=(0,c.A)("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);var p=r(6830),v=r(1578);function f(){let[e,t]=(0,a.useState)(!1),[r,i]=(0,a.useState)(!1),[c,f]=(0,a.useState)(!1),x=(0,o.usePathname)();(0,a.useEffect)(()=>{let e=()=>f(window.scrollY>20);return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]),(0,a.useEffect)(()=>{t(!1),i(!1)},[x]);let b=x.startsWith("/josephproject/government");return(0,n.jsxs)("header",{className:(0,v.cn)("fixed top-0 z-50 w-full transition-all duration-300",c||b?"bg-white/95 shadow-md backdrop-blur-md":"bg-transparent"),children:[(0,n.jsx)("div",{className:"container-wide",children:(0,n.jsxs)("div",{className:"flex h-16 items-center justify-between lg:h-20",children:[(0,n.jsxs)(s(),{href:"/",className:"flex items-center gap-3",children:[(0,n.jsx)("div",{className:(0,v.cn)("flex h-10 w-10 items-center justify-center rounded-lg transition-colors",c||b?"bg-navy-900 text-gold-400":"bg-white/10 text-gold-400 backdrop-blur-sm"),children:(0,n.jsx)(l.A,{className:"h-5 w-5"})}),(0,n.jsxs)("div",{className:"hidden sm:block",children:[(0,n.jsx)("p",{className:(0,v.cn)("text-sm font-bold leading-tight",c||b?"text-navy-950":"text-white"),children:p.CQ.shortName}),(0,n.jsx)("p",{className:(0,v.cn)("text-xs",c||b?"text-navy-500":"text-white/70"),children:"National Civic Infrastructure"})]})]}),(0,n.jsxs)("nav",{className:"hidden items-center gap-1 lg:flex",children:[p.lA.map(e=>(0,n.jsx)(s(),{href:e.href,className:(0,v.cn)("rounded-lg px-3 py-2 text-sm font-medium transition-colors",x===e.href?c||b?"bg-navy-50 text-navy-950":"bg-white/10 text-white":c||b?"text-navy-700 hover:text-navy-950":"text-white/80 hover:text-white"),children:e.label},e.href)),(0,n.jsxs)("div",{className:"relative",children:[(0,n.jsxs)("button",{onClick:()=>i(!r),onBlur:()=>setTimeout(()=>i(!1),200),className:(0,v.cn)("flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",b?c||b?"bg-navy-900 text-gold-400":"bg-white/15 text-gold-400":c||b?"text-navy-700 hover:text-navy-950":"text-white/80 hover:text-white"),"aria-expanded":r,"aria-haspopup":"true",children:[p.HU.label,(0,n.jsx)(d,{className:(0,v.cn)("h-4 w-4 transition-transform",r&&"rotate-180")})]}),r&&(0,n.jsxs)("div",{className:"absolute right-0 top-full mt-2 w-[420px] rounded-2xl border border-navy-100 bg-white p-4 shadow-2xl",children:[(0,n.jsx)("p",{className:"mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-navy-400",children:"National Civic Blockchain Infrastructure Consortium"}),(0,n.jsx)("div",{className:"grid max-h-[70vh] gap-1 overflow-y-auto",children:p.HU.items.map(e=>(0,n.jsxs)(s(),{href:e.href,className:"group rounded-xl px-3 py-2.5 transition-colors hover:bg-navy-50",children:[(0,n.jsx)("p",{className:"text-sm font-semibold text-navy-900 group-hover:text-navy-950",children:e.label}),(0,n.jsx)("p",{className:"text-xs text-navy-500",children:e.description})]},e.href))})]})]})]}),(0,n.jsx)("div",{className:"hidden items-center gap-3 lg:flex",children:(0,n.jsxs)(s(),{href:"/josephproject/donate",className:(0,v.cn)("inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all","bg-gold-500 text-navy-950 hover:bg-gold-400"),children:[(0,n.jsx)(m.A,{className:"h-4 w-4"}),"Donate"]})}),(0,n.jsx)("button",{onClick:()=>t(!e),className:(0,v.cn)("rounded-lg p-2 lg:hidden",c||b?"text-navy-900":"text-white"),"aria-label":e?"Close menu":"Open menu",children:e?(0,n.jsx)(h,{className:"h-6 w-6"}):(0,n.jsx)(u,{className:"h-6 w-6"})})]})}),e&&(0,n.jsx)("div",{className:"border-t border-navy-100 bg-white lg:hidden",children:(0,n.jsxs)("div",{className:"container-wide max-h-[80vh] space-y-1 overflow-y-auto py-4",children:[p.lA.map(e=>(0,n.jsx)(s(),{href:e.href,className:"block rounded-lg px-4 py-3 text-sm font-medium text-navy-800 hover:bg-navy-50",children:e.label},e.href)),(0,n.jsxs)("div",{className:"border-t border-navy-100 pt-3",children:[(0,n.jsx)("p",{className:"px-4 py-2 text-xs font-semibold uppercase tracking-wider text-navy-400",children:p.HU.label}),p.HU.items.map(e=>(0,n.jsx)(s(),{href:e.href,className:"block rounded-lg px-4 py-2.5 text-sm text-navy-700 hover:bg-navy-50",children:e.label},e.href))]}),(0,n.jsx)("div",{className:"border-t border-navy-100 pt-3",children:(0,n.jsxs)(s(),{href:"/josephproject/donate",className:"btn-primary mx-4 mt-2 w-[calc(100%-2rem)]",children:[(0,n.jsx)(m.A,{className:"h-4 w-4"}),"Donate Now"]})})]})})]})}},3457:(e,t,r)=>{"use strict";r.d(t,{A:()=>n});let n=(0,r(1847).A)("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]])},3673:()=>{},5625:e=>{e.exports={style:{fontFamily:"'Source Serif 4', 'Source Serif 4 Fallback'",fontStyle:"normal"},className:"__className_25ee46",variable:"__variable_25ee46"}},5686:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2619,23)),Promise.resolve().then(r.t.bind(r,8612,23)),Promise.resolve().then(r.t.bind(r,695,23)),Promise.resolve().then(r.t.bind(r,5625,23)),Promise.resolve().then(r.t.bind(r,3673,23)),Promise.resolve().then(r.bind(r,2466))},6830:(e,t,r)=>{"use strict";r.d(t,{CQ:()=>n,HU:()=>i,YM:()=>s,gX:()=>o,lA:()=>a});let n={name:"On 3rd Affordable Food Outreach Service Truck",shortName:"On 3rd Outreach",consortiumName:"Municipal Blockchain & Infrastructure Consortium",consortiumShort:"MBIC",tagline:"Building the Next Generation of Civic Infrastructure, Government Transparency, and Enterprise Blockchain Leadership",description:"A first-of-its-kind collaborative initiative bringing together enterprise blockchain companies, municipal governments, universities, and infrastructure specialists to modernize public infrastructure through blockchain technology.",email:"info@on3rdoutreach.org",consortiumEmail:"consortium@on3rdoutreach.org",phone:"(555) 123-4567",address:"123 Civic Center Drive, Suite 400, Washington, DC 20001"},a=[{label:"Home",href:"/"},{label:"About",href:"/josephproject/about"},{label:"Our Mission",href:"/josephproject/mission"},{label:"Programs",href:"/josephproject/programs"},{label:"Impact",href:"/josephproject/impact"}],i={label:"Government & Infrastructure",href:"/josephproject/government",items:[{label:"Executive Overview",href:"/josephproject/government/executive-overview",description:"National civic infrastructure initiative overview"},{label:"Founding Partners",href:"/josephproject/government/founding-partners",description:"Early strategic partnership opportunities"},{label:"University & Workforce Pipeline",href:"/josephproject/government/university-workforce",description:"Talent development and deployment readiness"},{label:"Strategic Advisors",href:"/josephproject/government/strategic-advisors",description:"Multidisciplinary leadership network"},{label:"Municipal Infrastructure Programs",href:"/josephproject/government/municipal-programs",description:"Real-world civic deployment initiatives"},{label:"Civic Technology Research Labs",href:"/josephproject/government/research-labs",description:"Innovation and research collaborations"},{label:"Sponsorship & Enterprise Partnerships",href:"/josephproject/government/sponsorship",description:"Corporate and enterprise engagement"},{label:"Government Relations & Public Policy",href:"/josephproject/government/public-policy",description:"Policy frameworks and government alignment"},{label:"Internship & Fellowship Programs",href:"/josephproject/government/internships",description:"Student and professional development"},{label:"Contact the Consortium",href:"/josephproject/government/contact",description:"Engage with consortium leadership"}]};i.items;let s=[{name:"Bitcoin",symbol:"BTC",address:"bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",network:"Bitcoin Mainnet",color:"#F7931A"},{name:"Ethereum",symbol:"ETH",address:"0x742d35Cc6634C0532925a3b844Bc454e4438f44e",network:"Ethereum Mainnet",color:"#627EEA"},{name:"USD Coin",symbol:"USDC",address:"0x742d35Cc6634C0532925a3b844Bc454e4438f44e",network:"Ethereum (ERC-20)",color:"#2775CA"},{name:"Solana",symbol:"SOL",address:"7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",network:"Solana Mainnet",color:"#9945FF"}],o=[{name:"Community Supporter",amount:25,description:"Supports one community meal delivery"},{name:"Outreach Partner",amount:100,description:"Funds a day of mobile food outreach operations"},{name:"Infrastructure Ally",amount:500,description:"Supports civic technology research initiatives"},{name:"Founding Supporter",amount:2500,description:"Strategic support for consortium development"}]},8612:e=>{e.exports={style:{fontFamily:"'DM Sans', 'DM Sans Fallback'",fontStyle:"normal"},className:"__className_0d7163",variable:"__variable_0d7163"}},9408:(e,t,r)=>{"use strict";r.d(t,{A:()=>n});let n=(0,r(1847).A)("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]])}},e=>{e.O(0,[827,619,441,255,358],()=>e(e.s=5686)),_N_E=e.O()}]);
/* gov-nav-fallback */
/** Vanilla fallback: Government dropdown when React hydration is unavailable */
(function () {
  var BASE = "/josephproject";
  var ITEMS = [
    { label: "Executive Overview", href: BASE + "/government/executive-overview/", description: "National civic infrastructure initiative overview" },
    { label: "Founding Partners", href: BASE + "/government/founding-partners/", description: "Early strategic partnership opportunities" },
    { label: "University & Workforce Pipeline", href: BASE + "/government/university-workforce/", description: "Talent development and deployment readiness" },
    { label: "Strategic Advisors", href: BASE + "/government/strategic-advisors/", description: "Multidisciplinary leadership network" },
    { label: "Municipal Infrastructure Programs", href: BASE + "/government/municipal-programs/", description: "Real-world civic deployment initiatives" },
    { label: "Civic Technology Research Labs", href: BASE + "/government/research-labs/", description: "Innovation and research collaborations" },
    { label: "Sponsorship & Enterprise Partnerships", href: BASE + "/government/sponsorship/", description: "Corporate and enterprise engagement" },
    { label: "Government Relations & Public Policy", href: BASE + "/government/public-policy/", description: "Policy frameworks and government alignment" },
    { label: "Internship & Fellowship Programs", href: BASE + "/government/internships/", description: "Student and professional development" },
    { label: "Contact the Consortium", href: BASE + "/government/contact/", description: "Engage with consortium leadership" },
  ];

  function init() {
    var nav = document.querySelector("header nav.hidden.lg\\:flex");
    if (!nav) return;

    var buttons = nav.querySelectorAll("button[aria-haspopup='true']");
    var btn = null;
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].textContent.indexOf("Government") !== -1) {
        btn = buttons[i];
        break;
      }
    }
    if (!btn) return;

    var wrap = btn.parentElement;
    if (!wrap || wrap.querySelector("[data-gov-menu='1']")) return;

    var menu = document.createElement("div");
    menu.setAttribute("data-gov-menu", "1");
    menu.className =
      "absolute right-0 top-full mt-2 w-[420px] rounded-2xl border border-navy-100 bg-white p-4 shadow-2xl hidden z-50";
    menu.innerHTML =
      '<p class="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-navy-400">National Civic Blockchain Infrastructure Consortium</p>' +
      '<div class="grid max-h-[70vh] gap-1 overflow-y-auto"></div>';
    var grid = menu.querySelector("div");

    ITEMS.forEach(function (item) {
      var a = document.createElement("a");
      a.href = item.href;
      a.className = "group block rounded-xl px-3 py-2.5 transition-colors hover:bg-navy-50";
      a.innerHTML =
        '<p class="text-sm font-semibold text-navy-900 group-hover:text-navy-950">' +
        item.label +
        '</p><p class="text-xs text-navy-500">' +
        item.description +
        "</p>";
      grid.appendChild(a);
    });

    wrap.appendChild(menu);

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var open = !menu.classList.contains("hidden");
      menu.classList.toggle("hidden", open);
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      var chevron = btn.querySelector("svg");
      if (chevron) chevron.classList.toggle("rotate-180", !open);
    });

    document.addEventListener("click", function (e) {
      if (!wrap.contains(e.target)) {
        menu.classList.add("hidden");
        btn.setAttribute("aria-expanded", "false");
        var chevron = btn.querySelector("svg");
        if (chevron) chevron.classList.remove("rotate-180");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
