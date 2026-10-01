/* Cliëntbezoek-app — eenvoudige app zonder extra software.
   Navigatie werkt met links als #/clienten en #/client/annie,
   zodat de app op GitHub Pages zonder server-instellingen werkt. */
(function () {
  "use strict";

  var clients = window.CLIENTEN || [];
  var view = document.getElementById("view");
  var tabs = document.querySelectorAll(".tabbar a");

  // Onthoudt waar je was, zolang de app open staat
  var state = { filter: "vandaag", query: "", lastClient: clients.length ? clients[0].id : null };

  var DAGEN = { ma: "ma", di: "di", wo: "wo", do: "do", vr: "vr", za: "za", zo: "zo" };
  var WAARSCHUW_DAGEN = 60; // indicatie verloopt binnen zoveel dagen → oranje label

  // ---------- Hulpjes ----------
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function initials(c) {
    var a = (c.voornaam || c.achternaam || "?").charAt(0);
    var parts = (c.achternaam || "").replace(/^(de|van|der|den|ter|ten|het)\s+/gi, "").split(/[\s-]/);
    var b = (parts[0] || "").charAt(0);
    return (c.voornaam ? a + b : b).toUpperCase();
  }
  function displayName(c) {
    return [c.aanhef, c.roepnaam && c.aanhef !== "Fam." ? c.roepnaam : "", c.aanhef === "Fam." ? c.achternaam : c.achternaam.split("-")[0]]
      .filter(Boolean).join(" ");
  }
  function parseDate(s) {
    var m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(s || "");
    return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null;
  }
  function age(c) {
    var d = parseDate(c.geboortedatum);
    if (!d) return null;
    var now = new Date();
    var a = now.getFullYear() - d.getFullYear();
    if (now < new Date(now.getFullYear(), d.getMonth(), d.getDate())) a--;
    return a;
  }
  function expiresSoon(c) {
    var d = parseDate(c.indicatieTot);
    if (!d) return false;
    var days = (d - new Date()) / 86400000;
    return days <= WAARSCHUW_DAGEN;
  }
  function isToday(c) { return c.volgendBezoek && c.volgendBezoek.dag === "vandaag"; }
  function isThisWeek(c) { return c.volgendBezoek && (isToday(c) || DAGEN[c.volgendBezoek.dag]); }
  function telLink(n) { return "tel:" + String(n || "").replace(/[^\d+]/g, ""); }
  function find(id) {
    for (var i = 0; i < clients.length; i++) if (clients[i].id === id) return clients[i];
    return null;
  }

  var ICON = {
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    warn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
    info: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>',
    ear: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11a9 9 0 0 1 18 0v4a2 2 0 0 1-2 2h-1v-6h3M3 11v4a2 2 0 0 0 2 2h1v-6H3"/></svg>'
  };

  // ---------- Scherm 1: cliëntenoverzicht ----------
  function filtered() {
    var q = state.query.trim().toLowerCase();
    return clients.filter(function (c) {
      if (state.filter === "vandaag" && !isToday(c)) return false;
      if (state.filter === "week" && !isThisWeek(c)) return false;
      if (q && (displayName(c) + " " + c.achternaam + " " + c.woonplaats).toLowerCase().indexOf(q) === -1) return false;
      return true;
    }).sort(function (a, b) {
      return (isToday(b) - isToday(a)) || (a.volgendBezoek.tijd || "").localeCompare(b.volgendBezoek.tijd || "");
    });
  }

  function rowHtml(c) {
    var vb = c.volgendBezoek || {};
    var when = isToday(c) ? vb.tijd : (vb.dag ? vb.dag + " " + vb.tijd : "");
    return '<a class="client-row" href="#/client/' + esc(c.id) + '">' +
      '<div class="avatar" aria-hidden="true">' + esc(initials(c)) + '</div>' +
      '<div class="row-main">' +
        '<div class="row-top"><div class="row-name">' + esc(displayName(c)) + '</div>' +
        '<div class="row-time' + (isToday(c) ? ' today' : '') + '">' + esc(when) + '</div></div>' +
        '<div class="row-place">' + esc(c.woonplaats) + '</div>' +
        '<div class="tags"><span class="tag">' + esc(c.zorg[0] || "") + '</span>' +
        '<span class="tag">' + esc(c.financiering.replace(" gemeente Gouda", "").replace(" · ", " ")) + '</span>' +
        (expiresSoon(c) ? '<span class="tag warn">Indicatie verloopt</span>' : '') +
        '</div>' +
      '</div>' + ICON.chev + '</a>';
  }

  function renderList() {
    var box = document.getElementById("list");
    if (!box) return;
    var rows = filtered();
    box.innerHTML = rows.length ? rows.map(rowHtml).join("") : '<div class="empty">Geen cliënten gevonden.</div>';
    document.querySelectorAll(".filters button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.filter === state.filter));
    });
  }

  function renderOverview() {
    var today = new Date().toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" });
    today = today.charAt(0).toUpperCase() + today.slice(1);
    var nToday = clients.filter(isToday).length;
    var nWarn = clients.filter(expiresSoon).length;

    view.innerHTML =
      '<header class="hero">' +
        '<div class="hero-top"><div><div class="sub">' + esc(today) + '</div><h1>Mijn cliënten</h1></div>' +
        '<button class="round-btn light" type="button" aria-label="Nieuwe cliënt toevoegen" id="add">' + ICON.plus + '</button></div>' +
        '<div class="stats">' +
          '<div class="stat"><b>' + nToday + '</b><span>bezoeken vandaag</span></div>' +
          '<div class="stat"><b>' + clients.length + '</b><span>cliënten actief</span></div>' +
          '<div class="stat"><b>' + nWarn + '</b><span>indicatie verloopt</span></div>' +
        '</div>' +
        '<label class="search">' + ICON.search +
          '<span class="sr" hidden>Zoeken</span>' +
          '<input id="q" type="search" placeholder="Zoek op naam of woonplaats" autocomplete="off" value="' + esc(state.query) + '">' +
        '</label>' +
      '</header>' +
      '<div class="filters" role="group" aria-label="Filter">' +
        '<button type="button" data-filter="vandaag">Vandaag</button>' +
        '<button type="button" data-filter="week">Deze week</button>' +
        '<button type="button" data-filter="alle">Alle cliënten</button>' +
      '</div>' +
      '<div class="list" id="list"></div>';

    renderList();

    document.getElementById("q").addEventListener("input", function (e) {
      state.query = e.target.value;
      renderList();
    });
    document.querySelectorAll(".filters button").forEach(function (b) {
      b.addEventListener("click", function () { state.filter = b.dataset.filter; renderList(); });
    });
    document.getElementById("add").addEventListener("click", function () {
      location.hash = "#/nieuw";
    });
  }

  // ---------- Scherm 2: cliëntkaart ----------
  function field(label, value) {
    return '<div class="field"><small>' + esc(label) + '</small><div>' + esc(value) + '</div></div>';
  }
  function kv(label, value) {
    return '<div><span>' + esc(label) + '</span><b>' + esc(value) + '</b></div>';
  }

  function renderClient(id) {
    var c = find(id || state.lastClient);
    if (!c) { location.hash = "#/clienten"; return; }
    state.lastClient = c.id;
    var vb = c.volgendBezoek || {};
    var bezoek = isToday(c) ? "Bezoek vandaag · " + vb.tijd + " – " + vb.eind : "Volgend bezoek · " + vb.dag + " " + vb.tijd;
    var a = age(c);
    var adres = c.adres + ", " + c.postcode + " " + c.woonplaats;
    var route = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(adres);

    view.innerHTML =
      '<header class="hero">' +
        '<div class="hero-top">' +
          '<a class="round-btn" href="#/clienten" aria-label="Terug naar cliëntenoverzicht">' + ICON.back + '</a>' +
          '<div class="sub">' + esc(bezoek) + '</div>' +
          '<span style="width:44px"></span>' +
        '</div>' +
        '<div class="person"><div class="avatar lg" aria-hidden="true">' + esc(initials(c)) + '</div>' +
          '<div><h1 class="name">' + esc(displayName(c)) + '</h1>' +
          '<div class="meta">' + [a !== null ? a + ' jaar' : '', c.voornaam ? 'noemt zich “' + esc(c.roepnaam) + '”' : ''].filter(Boolean).join(' · ') + '</div></div></div>' +
        '<div class="actions">' +
          '<a class="primary" href="' + telLink(c.telefoon) + '">' + ICON.phone + 'Bellen</a>' +
          '<a class="ghost" href="' + route + '" target="_blank" rel="noopener">' + ICON.pin + 'Route</a>' +
        '</div>' +
      '</header>' +
      '<div class="stack">' +
        (c.letOp ? '<div class="alert">' + ICON.warn + '<div><b>Let op bij binnenkomst</b><p>' + esc(c.letOp) + '</p></div></div>' : '') +

        '<section class="card"><h2>Persoonsgegevens</h2><div class="fields">' +
          field("Naam", [c.aanhef, c.voornaam, c.achternaam].filter(Boolean).join(" ")) +
          '<div class="field"><small>Adres</small><div>' + esc(c.adres) + '</div><div>' + esc(c.postcode + " " + c.woonplaats) + '</div></div>' +
          '<div class="grid2">' + field("Telefoon", c.telefoon) + field("Geboortedatum", c.geboortedatum) + '</div>' +
          '<div class="grid2">' + field("Huisarts", c.huisarts) + field("Cliëntnummer", c.clientnummer) + '</div>' +
        '</div></section>' +

        '<section class="card"><h2>Zorg &amp; afspraken</h2>' +
          '<div class="chips">' + c.zorg.map(function (z) { return '<span class="chip">' + esc(z) + '</span>'; }).join("") + '</div>' +
          '<div class="kv">' +
            kv("Financiering", c.financiering) +
            kv("Frequentie", c.frequentie) +
            kv("Uren per bezoek", c.urenPerBezoek) +
            kv("Vaste zorgverlener", c.zorgverlener) +
            kv("Indicatie geldig t/m", c.indicatieTot) +
          '</div>' +
        '</section>' +

        '<section class="card"><h2>Over ' + esc(c.roepnaam) + '</h2>' +
          '<p>' + esc(c.over) + '</p>' +
          '<div class="bullets">' +
            '<div>' + ICON.heart + '<div><b>Vindt fijn:</b> ' + esc(c.fijn) + '</div></div>' +
            '<div>' + ICON.info + '<div><b>Liever niet:</b> ' + esc(c.liever) + '</div></div>' +
            '<div>' + ICON.ear + '<div><b>Communicatie:</b> ' + esc(c.communicatie) + '</div></div>' +
          '</div>' +
        '</section>' +

        '<section class="card"><h2>Eerste contactpersoon</h2>' +
          '<div class="contact"><div><div class="who">' + esc(c.contact.naam) + '</div>' +
          '<div class="how">' + esc(c.contact.relatie) + ' · ' + esc(c.contact.telefoon) + '</div></div>' +
          '<a class="call-btn" href="' + telLink(c.contact.telefoon) + '" aria-label="Bel ' + esc(c.contact.naam) + '">' + ICON.phone + '</a></div>' +
        '</section>' +

        '<div class="footnote">Laatst bijgewerkt: ' + esc(c.bijgewerkt.datum) + ' door ' + esc(c.bijgewerkt.door) + '</div>' +
      '</div>';
  }

  // ---------- Nog uit te werken ----------
  var PLACEHOLDERS = {
    bezoek: ["Bezoek", "Hier komen de planning van vandaag, in- en uitchecken en de taken per bezoek."],
    verslag: ["Verslag", "Hier schrijft de zorgverlener een korte rapportage na elk bezoek."],
    netwerk: ["Netwerk", "Hier staan mantelzorgers, huisarts, casemanager en andere betrokkenen."],
    nieuw: ["Nieuwe cliënt", "Hier komt het intakeformulier om een nieuwe cliënt toe te voegen."]
  };
  function renderPlaceholder(key) {
    var p = PLACEHOLDERS[key];
    view.innerHTML = '<div class="placeholder"><h1>' + esc(p[0]) + '</h1><p>' + esc(p[1]) + '</p>' +
      (key === "nieuw" ? '<a href="#/clienten">Terug naar het overzicht</a>' : '') + '</div>';
  }

  // ---------- Navigatie ----------
  function route() {
    var parts = (location.hash || "#/clienten").replace(/^#\/?/, "").split("/");
    var page = parts[0] || "clienten";
    var active = page;

    if (page === "client") renderClient(parts[1]);
    else if (PLACEHOLDERS[page]) { renderPlaceholder(page); if (page === "nieuw") active = "clienten"; }
    else { page = active = "clienten"; renderOverview(); }

    tabs.forEach(function (t) {
      if (t.dataset.tab === active) t.setAttribute("aria-current", "page");
      else t.removeAttribute("aria-current");
      if (t.dataset.tab === "client" && state.lastClient) t.setAttribute("href", "#/client/" + state.lastClient);
    });
    view.scrollTop = 0;
    view.focus({ preventScroll: true });
  }

  window.addEventListener("hashchange", route);
  route();
})();
