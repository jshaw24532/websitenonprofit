(function () {
  var DATA_URL = "/josephproject/assets/data/donate-data.json";
  var state = {
    search: "",
    sort: "popular",
    categoryIds: [],
    methodFilter: null,
    showFilters: false,
    categories: [],
    organizations: [],
  };

  var $ = function (id) {
    return document.getElementById(id);
  };

  function parseCategoryIds(param) {
    if (!param) return [];
    return param
      .split(",")
      .map(function (s) {
        return parseInt(s.trim(), 10);
      })
      .filter(function (id) {
        return !isNaN(id);
      });
  }

  function categoryNames(ids) {
    return ids
      .map(function (id) {
        var c = state.categories.find(function (x) {
          return x.id === id;
        });
        return c ? c.name : null;
      })
      .filter(Boolean);
  }

  function readUrl() {
    var p = new URLSearchParams(window.location.search);
    state.search = p.get("q") || "";
    state.sort = p.get("sort") || "popular";
    state.categoryIds = parseCategoryIds(p.get("categories"));
    state.methodFilter = p.get("method") || null;
    state.showFilters = Boolean(p.get("categories") || p.get("method"));
    $("search-input").value = state.search;
    updateSortButtons();
    if (state.showFilters) $("filter-panel").classList.remove("hidden");
  }

  function buildUrl() {
    var p = new URLSearchParams();
    if (state.categoryIds.length) p.set("categories", state.categoryIds.slice().sort(function (a, b) { return a - b; }).join(","));
    if (state.methodFilter) p.set("method", state.methodFilter);
    if (state.search.trim()) p.set("q", state.search.trim());
    if (state.sort !== "popular") p.set("sort", state.sort);
    var qs = p.toString();
    return qs ? "/josephproject/donate/?" + qs : "/josephproject/donate/";
  }

  function syncUrl() {
    var target = buildUrl();
    var current = window.location.pathname + window.location.search;
    if (current !== target) {
      history.replaceState(null, "", target);
    }
  }

  function hasFilters() {
    return state.categoryIds.length > 0 || state.methodFilter || state.search.trim();
  }

  function filteredOrgs() {
    var list = state.organizations.slice();
    var q = state.search.trim().toLowerCase();
    if (q) {
      list = list.filter(function (o) {
        return (
          o.name.toLowerCase().includes(q) ||
          o.description.toLowerCase().includes(q) ||
          o.shortName.toLowerCase().includes(q) ||
          o.impactAreas.some(function (a) {
            return a.toLowerCase().includes(q);
          })
        );
      });
    }
    var names = categoryNames(state.categoryIds);
    if (names.length) {
      list = list.filter(function (o) {
        return names.some(function (n) {
          return o.impactAreas.indexOf(n) !== -1;
        });
      });
    }
    if (state.methodFilter) {
      list = list.filter(function (o) {
        return o.methods.indexOf(state.methodFilter) !== -1;
      });
    }
    if (state.sort === "popular") {
      list.sort(function (a, b) {
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      });
    } else if (state.sort === "underserved") {
      list.sort(function (a, b) {
        return (b.underserved ? 1 : 0) - (a.underserved ? 1 : 0);
      });
    } else {
      list.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    }
    return list;
  }

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function renderFeatured() {
    var el = $("featured-orgs");
    if (hasFilters()) {
      el.classList.add("hidden");
      return;
    }
    var featured = state.organizations.filter(function (o) {
      return o.featured;
    });
    if (!featured.length) {
      el.classList.add("hidden");
      return;
    }
    el.classList.remove("hidden");
    el.innerHTML =
      '<p class="mb-3 text-xs font-semibold uppercase tracking-wider text-navy-500">Featured organizations</p><div class="flex gap-3 overflow-x-auto pb-2">' +
      featured
        .map(function (org) {
          return (
            '<a href="/josephproject/donate/' +
            org.slug +
            '/" class="flex shrink-0 items-center gap-2 rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-800 shadow-sm hover:border-gold-400 hover:bg-gold-50">' +
            '<span class="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white" style="background:' +
            org.accentColor +
            '">' +
            esc(org.shortName.charAt(0)) +
            "</span>" +
            esc(org.shortName) +
            "</a>"
          );
        })
        .join("") +
      "</div>";
  }

  function renderOrgCard(org) {
    var badges = '<span class="rounded bg-navy-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-navy-600">' + esc(org.countryCode) + "</span>";
    if (org.popular) badges += '<span class="rounded bg-gold-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-gold-800">Popular</span>';
    if (org.underserved) badges += '<span class="rounded bg-navy-800 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white">Underserved</span>';
    var areas = org.impactAreas
      .slice(0, 3)
      .map(function (a) {
        return '<span class="rounded-full bg-navy-50 px-2 py-0.5 text-[10px] text-navy-600">' + esc(a) + "</span>";
      })
      .join("");
    if (org.impactAreas.length > 3) areas += '<span class="text-[10px] text-navy-400">+' + (org.impactAreas.length - 3) + " more</span>";
    var methods = org.methods
      .map(function (m) {
        return '<span class="rounded-full bg-gold-50 px-2 py-0.5 text-[10px] font-medium uppercase text-gold-800">' + (m === "cash" ? "Card" : m) + "</span>";
      })
      .join("");
    return (
      '<a href="/josephproject/donate/' +
      org.slug +
      '/" class="group flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition-all hover:border-gold-300 hover:shadow-lg">' +
      '<div class="flex h-28 items-center justify-center" style="background:' +
      org.accentColor +
      '18">' +
      '<div class="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-md" style="background:' +
      org.accentColor +
      '">' +
      esc(org.shortName.charAt(0)) +
      "</div></div>" +
      '<div class="flex flex-1 flex-col p-5"><div class="mb-2 flex flex-wrap gap-2">' +
      badges +
      '</div><h2 class="mb-2 line-clamp-2 text-lg font-bold text-navy-950">' +
      esc(org.name) +
      '</h2><p class="mb-3 line-clamp-2 flex-1 text-sm text-navy-600">' +
      esc(org.description) +
      '</p><div class="mb-3 flex flex-wrap gap-1">' +
      areas +
      '</div><div class="mb-4 flex flex-wrap gap-1">' +
      methods +
      '</div><span class="inline-flex w-full items-center justify-center rounded-lg bg-gold-500 py-2.5 text-sm font-semibold text-navy-950 group-hover:bg-gold-400">Donate</span></div></a>'
    );
  }

  function render() {
    syncUrl();
    var list = filteredOrgs();
    renderFeatured();
    $("results-count").innerHTML =
      "<strong>" +
      list.length +
      "</strong> organization" +
      (list.length !== 1 ? "s" : "") +
      " found" +
      (state.categoryIds.length ? " in " + state.categoryIds.length + " impact area(s)" : "");
    $("org-grid").innerHTML = list.map(renderOrgCard).join("");
    $("org-grid").classList.toggle("hidden", list.length === 0);
    $("empty-state").classList.toggle("hidden", list.length > 0);
    var fc = $("filter-count");
    var n = state.categoryIds.length + (state.methodFilter ? 1 : 0);
    if (n) {
      fc.textContent = n;
      fc.classList.remove("hidden");
      fc.classList.add("flex");
    } else {
      fc.classList.add("hidden");
    }
    $("clear-filters").classList.toggle("hidden", !hasFilters());
    renderCategoryButtons();
    renderMethodButtons();
  }

  function updateSortButtons() {
    document.querySelectorAll(".sort-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-sort") === state.sort;
      btn.className =
        "sort-btn rounded-lg px-4 py-2 text-sm font-medium capitalize " +
        (active ? "bg-navy-900 text-white" : "text-navy-700 hover:bg-navy-50");
    });
  }

  function renderMethodButtons() {
    var methods = [
      { id: "crypto", label: "Crypto" },
      { id: "stock", label: "Stock" },
      { id: "daf", label: "DAF" },
      { id: "cash", label: "Card" },
    ];
    $("method-filters").innerHTML = methods
      .map(function (m) {
        var active = state.methodFilter === m.id;
        return (
          '<button type="button" data-method="' +
          m.id +
          '" class="method-btn rounded-full px-4 py-2 text-sm font-medium ' +
          (active ? "bg-navy-900 text-white" : "bg-navy-100 text-navy-700 hover:bg-navy-200") +
          '">' +
          m.label +
          "</button>"
        );
      })
      .join("");
    document.querySelectorAll(".method-btn").forEach(function (btn) {
      btn.onclick = function () {
        var id = btn.getAttribute("data-method");
        state.methodFilter = state.methodFilter === id ? null : id;
        render();
      };
    });
  }

  function renderCategoryButtons() {
    $("category-filters").innerHTML = state.categories
      .map(function (cat) {
        var active = state.categoryIds.indexOf(cat.id) !== -1;
        return (
          '<button type="button" data-cat="' +
          cat.id +
          '" class="cat-btn rounded-full px-3 py-1.5 text-sm font-medium ' +
          (active ? "bg-gold-500 text-navy-950" : "bg-navy-100 text-navy-700 hover:bg-navy-200") +
          '">' +
          esc(cat.name) +
          "</button>"
        );
      })
      .join("");
    document.querySelectorAll(".cat-btn").forEach(function (btn) {
      btn.onclick = function () {
        var id = parseInt(btn.getAttribute("data-cat"), 10);
        var i = state.categoryIds.indexOf(id);
        if (i === -1) state.categoryIds.push(id);
        else state.categoryIds.splice(i, 1);
        render();
      };
    });
  }

  function clearAll() {
    state.categoryIds = [];
    state.methodFilter = null;
    state.search = "";
    state.sort = "popular";
    $("search-input").value = "";
    updateSortButtons();
    render();
  }

  function bindEvents() {
    $("search-input").addEventListener("input", function (e) {
      state.search = e.target.value;
      render();
    });
    document.querySelectorAll(".sort-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.sort = btn.getAttribute("data-sort");
        updateSortButtons();
        render();
      });
    });
    $("toggle-filters").addEventListener("click", function () {
      state.showFilters = !state.showFilters;
      $("filter-panel").classList.toggle("hidden", !state.showFilters);
    });
    $("clear-filters").addEventListener("click", clearAll);
    $("empty-clear").addEventListener("click", clearAll);
    $("select-all-cats").addEventListener("click", function () {
      state.categoryIds = state.categories.map(function (c) {
        return c.id;
      });
      render();
    });
    $("clear-cats").addEventListener("click", function () {
      state.categoryIds = [];
      render();
    });
  }

  fetch(DATA_URL)
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      state.categories = data.categories;
      state.organizations = data.organizations;
      readUrl();
      bindEvents();
      render();
    })
    .catch(function (err) {
      console.error(err);
      $("org-grid").innerHTML =
        '<p class="text-red-600">Failed to load organizations. Please refresh the page.</p>';
    });
})();
