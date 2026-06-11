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
