/**
 * aside.js — Niche3DS Partner Portal
 * Sidebar centralizado: inyecta el HTML y auto-detecta la página activa por URL.
 *
 * USO EN CADA HTML:
 *   1. Reemplaza el <aside>...</aside> con:   <div id="aside-root"></div>
 *   2. Antes de </body> agrega:               <script src="/js/aside.js"></script>
 *      (ajusta la ruta relativa según la profundidad del archivo)
 */

(function () {

  /* ═══════════════════════════════════════════════
     0. VARIABLE GLOBAL: MARCA SELECCIONADA
     ═══════════════════════════════════════════════ */
  var selectedBrand = localStorage.getItem('niche3ds_brand') || 'La Sabia Madrid';
  var AVAILABLE_BRANDS = ['La Sabia Madrid','Brand Demo'];

  /* ═══════════════════════════════════════════════
     1. DEFINICIÓN CENTRALIZADA DEL MENÚ
     ═══════════════════════════════════════════════ */
  var MENU = {

    standalone: [
      { href: "/dashboard2.html", label: "Overview", key: "overview" }
    ],

    groups: [

      /* ── DASHBOARD ── */
      {
        id: "grp-dashboard",
        label: "Dashboard",
        subGroups: [
          // {
          //   id: "grp-sales",
          //   label: "Sales",
          //   items: [
          //     { href: "/page/dashboard/sales-by-country.html",    label: "By Country",        key: "sales-country" },
          //     { href: "/page/dashboard/sales-by-state.html",      label: "By State",          key: "sales-state" },
          //     { href: "/page/dashboard/sales-by-city.html",       label: "By City",           key: "sales-city" },
          //     { href: "/page/dashboard/sales-by-collection.html", label: "By Collection",     key: "sales-collection" },
          //     { href: "/page/dashboard/sales-by-store.html",      label: "By Store",          key: "sales-store" },
          //     { href: "/page/dashboard/sales-by-perfume.html",    label: "By Product",        key: "sales-product" },
          //     { href: "/page/dashboard/sales-by-season.html",     label: "By Season",         key: "sales-season" },
          //     { href: "/page/brand/brand-socila-netwook.html",    label: "By Social Network", key: "sales-social" }
          //   ]
          // },
          {
            id: "grp-mkt-main",
            label: "Marketing",
            subLabels: [
              {
                label: "Social Networks",
                items: [
                  { href: "/page/marketing/social-networks.html", label: "By Platform",  key: "mkt-social-platform" },
                  { href: "/page/marketing/social-by-content.html", label: "By Content Type",   key: "mkt-social-content"  },
                  { href: "/page/marketing/location.html", label: "By Country",  key: "mkt-social-location" },
                   { href: "/page/marketing/metrics.html", label: " By metrics",  key: "mkt-social-metrics" }
                ]
              },
              {
                label: "Followers",
                items: [
                  { href: "/page/marketing/gender.html", label: "By Gender",    key: "mkt-aud-gender"      },
                  { href: "/page/marketing/age.html", label: "By Age",       key: "mkt-aud-age"         },
                  { href: "/page/marketing/country.html", label: "By Country",      key: "mkt-aud-country"        }
                ]
              }
            ]
          },
          {
            id: "grp-social-campaign-paid",
            label: "Social Campaign (Paid)",
            items: [
              { href: "/page/dashboard/Performance-by-Campaign.html", label: "Performance by Campaign", key: "social-paid-campaign-performance" },
              { href: "/page/dashboard/Platform-Performance.html", label: "Platform Performance", key: "social-paid-platform-performance" }
            ]
          }
        ]
      },

      /* ── ORDERS ── */
      {
        id: "grp-orders",
        label: "Brand Orders",
        subGroups: [
          // {
          //   id: "grp-view",
          //   label: "Order by",
          //   items: [
          //     { href: "/page/orders/orders-by-collection.html", label: "Collection", key: "orders-collection" },
          //     { href: "/page/orders/orders-by-perfumery.html",  label: "Perfume",    key: "orders-perfume" },
          //     { href: "/page/orders/orders-by-season.html",     label: "Season",     key: "orders-season" }
          //   ]
          // },
          {
            id: "grp-order-progress",
            label: "Order in progress",
            items: [
              { href: "/page/orders/order-in-progress.html", label: "Pre Order", key: "order-pre-order" },
              { href: "/page/orders/order.html", label: "Order", key: "order-in-progress" }
            ]
          }
        ],
        // directItems: [
        //   { href: "/page/orders/order-history.html", label: "Order History", key: "order-history" },
        // ]
      },

      /* ── BRAND ASSETS ── */
      // {
      //   id: "grp-brand-assets",
      //   label: "Brand Assets",
      //   directItemsTop: true,
      //   directItems: [
      //     { href: "/page/brand-assets/brand-asset.html", label: "Assets", key: "brand-assets" }
      //   ],
      //   subGroups: [
      //     {
      //       id: "grp-assets-view",
      //       label: "Views",
      //       items: [
      //         { href: "/page/brand-Assets/brand-document.html", label: "Document", key: "assets-document" },
      //         { href: "/page/brand-Assets/brand-video.html",    label: "Video",    key: "assets-video" },
      //         { href: "/page/brand-Assets/brand-images.html",   label: "Images",   key: "assets-images" }
      //       ]
      //     }
      //   ]
      // },

      /* ── BRAND ── */
      {
        id: "grp-brand",
        label: "Brand",
        directItems: [
          { href: "/page/brand/brand-catalog.html",       label: "Brand Catalog",            key: "brand-products" },
          // { href: "/page/brand/Legal-documentation.html", label: "Legal documentation", key: "brand-legal" },
        ],
      },

      /* ── PRICING ── */
      // {
      //   id: "grp-pricing",
      //   label: "Pricing",
      //   subGroups: [
      //     {
      //       id: "grp-pricing-policy",
      //       label: "Pricing policy",
      //       items: [
      //         { href: "/page/pricing/msrp.html", label: "MSRP / Pricing Policy", key: "pricing-msrp-policy" },
      //         { href: "#", label: "Price compliance", key: "pricing-price-compliance" }
      //       ]
      //     }
      //   ]
      // },

      /* ── UPCOMING PRODUCTS ── */
      // {
      //   id: "grp-upcoming-products",
      //   label: "Upcoming Products",
      //   directItems: [
      //     { href: "/page/brand/upcoming.html", label: "Upcoming", key: "brand-upcoming" }
      //   ]
      // },

      /* ── BRAND SCORE ── */
      // {
      //   id: "grp-brand-score",
      //   label: "Brand Score",
      //   subGroups: [
      //      {
      //       id: "grp-brand-score-score",  // ✅ ID único (antes era "grp-score" duplicado)
      //       label: "Score",
      //       subLabel: "Score History",
      //       items: [
      //         { href: "/page/score/score-history-brand.html", label: "Brand", key: "brand-score" }
      //       ]
      //     }
      //   ]
      // },

      /* ── LEGAL ── */
      {
        id: "grp-legal",
        label: "Legal",
        directItems: [
          { href: "/page/legal/business-plan.html", label: "Business Plan", key: "legal-business-plan" },
          // { href: "/page/brand/Legal-documentation.html", label: "Legal documentation", key: "brand-legal" },
          { href: "/page/legal/distribution-agreement.html", label: "Distribution Agreement", key: "legal-distribution-agreement" },
          { href: "#", label: "FDA and MoCRA Approval", key: "legal-fda-mocra-approval" },
          { href: "/page/legal/distribution-coefficient.html", label: "Distribution Coefficient", key: "legal-distribution-coefficient" }
        ]
      },

      /* ── PROFILE ── */
      {
        id: "grp-profile",
        label: "Profile",
        directItems: [
          { href: "/page/profile/companyinfo.html",   label: "Company Info",   key: "profile-company" },
          { href: "/page/profile/paymentmethod.html", label: "Payment method", key: "profile-payment" }
        ]
      },

      /* ── SECURITY ── */
      {
        id: "grp-security",
        label: "Security",
        directItems: [
          { href: "/page/security/users.html",  label: "Users",  key: "security-users" },
          { href: "/page/security/roles.html",  label: "Roles",  key: "security-roles" }
        ]
      }

    ]
  };

  /* ═══════════════════════════════════════════════
     2. DETECTAR PÁGINA ACTIVA POR URL
     ═══════════════════════════════════════════════ */
  function detectActiveKey() {
    var currentPath = window.location.pathname.toLowerCase();
    var currentHash = window.location.hash.toLowerCase();
    if (currentPath !== "/" && currentPath.slice(-1) === "/") {
      currentPath = currentPath.slice(0, -1);
    }

    function match(href) {
      if (!href || href === "#") return false;
      var h = href.toLowerCase();
      var hashIndex = h.indexOf("#");
      var hrefPath = hashIndex >= 0 ? h.slice(0, hashIndex) : h;
      var hrefHash = hashIndex >= 0 ? h.slice(hashIndex) : "";

      var pathMatches = false;
      if (currentPath === hrefPath) {
        pathMatches = true;
      } else {
        var fileName = hrefPath.split("/").pop();
        pathMatches = !!fileName && currentPath.slice(-("/" + fileName).length) === "/" + fileName;
      }

      if (!pathMatches) return false;
      if (hrefHash) return currentHash === hrefHash;
      return true;
    }

    for (var i = 0; i < MENU.standalone.length; i++) {
      if (match(MENU.standalone[i].href)) return MENU.standalone[i].key;
    }

    for (var g = 0; g < MENU.groups.length; g++) {
      var grp = MENU.groups[g];

      if (grp.directItems) {
        for (var d = 0; d < grp.directItems.length; d++) {
          if (match(grp.directItems[d].href)) return grp.directItems[d].key;
        }
      }

      if (grp.subGroups) {
        for (var s = 0; s < grp.subGroups.length; s++) {
          var sg = grp.subGroups[s];
          if (sg.items) {
            for (var it = 0; it < sg.items.length; it++) {
              if (match(sg.items[it].href)) return sg.items[it].key;
            }
          }
          if (sg.subLabels) {
            for (var sl = 0; sl < sg.subLabels.length; sl++) {
              var slItems = sg.subLabels[sl].items || [];
              for (var si = 0; si < slItems.length; si++) {
                if (match(slItems[si].href)) return slItems[si].key;
              }
            }
          }
        }
      }
    }

    return null;
  }

  /* ═══════════════════════════════════════════════
     3. CALCULAR RUTA RAÍZ RELATIVA
     ═══════════════════════════════════════════════ */
  function getRoot() {
    var parts = window.location.pathname.split("/").filter(Boolean);
    var depth = parts.length - 1;
    if (depth <= 0) return "./";
    var arr = [];
    for (var i = 0; i < depth; i++) arr.push("..");
    return arr.join("/") + "/";
  }

  function href(path) {
    if (!path || path === "#") return "#";
    return getRoot() + path.replace(/^\//, "");
  }

  /* ═══════════════════════════════════════════════
     4. DETECTAR SI UN GRUPO / SUB-GRUPO TIENE ACTIVO
     ═══════════════════════════════════════════════ */
  function groupHasActive(group, activeKey) {
    if (group.directItems) {
      for (var i = 0; i < group.directItems.length; i++) {
        if (group.directItems[i].key === activeKey) return true;
      }
    }
    if (group.subGroups) {
      for (var s = 0; s < group.subGroups.length; s++) {
        if (sgHasActive(group.subGroups[s], activeKey)) return true;
      }
    }
    return false;
  }

  function sgHasActive(sg, activeKey) {
    if (sg.items) {
      for (var i = 0; i < sg.items.length; i++) {
        if (sg.items[i].key === activeKey) return true;
      }
    }
    if (sg.subLabels) {
      for (var s = 0; s < sg.subLabels.length; s++) {
        var slItems = sg.subLabels[s].items || [];
        for (var j = 0; j < slItems.length; j++) {
          if (slItems[j].key === activeKey) return true;
        }
      }
    }
    return false;
  }

  /* ═══════════════════════════════════════════════
     5. CONSTRUIR HTML DEL ASIDE
     ═══════════════════════════════════════════════ */
  function buildHTML(activeKey) {
    var root = getRoot();
    var h = "";

    h += '<div class="aside-logo">'
      + '<div class="logo-mark">'
      + '<img src="' + root + 'img/logo2.png" alt="Niche Logo" style="width:180px;max-width:100%;">'
      + '</div></div>';

    h += '<div class="aside-user">'
      + '<div class="user-name" id="sidebarName">Francis Santana</div>'
      + '<div class="user-status"><div class="status-dot inactive"></div><span>Active</span></div>'
      + '<div class="user-since">Member since: <span id="sidebarDate">Mar 11, 2026</span></div>'
      // ✅ Dropdown de marca seleccionado
      + '<div class="user-brand-selector">'
      + '<span style="color: #fff;font-size: 15px;">Selected Brand</span>'
      + '<select id="brandDropdown" class="brand-dropdown" onchange="AsideNav.onBrandChange(this.value)">'
      + AVAILABLE_BRANDS.map(function(brand) {
          var selected = brand === selectedBrand ? ' selected' : '';
          return '<option value="' + brand + '"' + selected + '>' + brand + '</option>';
        }).join('')
      + '</select>'
      + '</div>'
      + '</div>';

    h += '<nav class="aside-nav">';

    MENU.standalone.forEach(function (item) {
      var active = item.key === activeKey ? " active" : "";
      h += '<a href="' + href(item.href) + '" class="nav-item-standalone' + active + '">' + item.label + '</a>';
    });

    MENU.groups.forEach(function (grp) {
      var open = groupHasActive(grp, activeKey) ? " open" : "";
      h += '<div class="nav-group' + open + '" id="' + grp.id + '">';
      h += '<div class="nav-group-header" onclick="AsideNav.toggleGroup(\'' + grp.id + '\')">'
        + '<span class="nav-group-label">' + grp.label + '</span>'
        + '<i class="fas fa-chevron-down nav-group-arrow"></i>'
        + '</div>';
      h += '<div class="nav-group-body">';

      if (grp.directItemsTop && grp.directItems) {
        grp.directItems.forEach(function (item) {
          var active = item.key === activeKey ? " active" : "";
          h += '<a href="' + href(item.href) + '" class="nav-sub-item' + active + '">' + item.label + '</a>';
        });
      }

      if (grp.subGroups && grp.subGroups.length) {
        h += '<div class="nav-sub-group">';
        grp.subGroups.forEach(function (sg) {
          var sgOpen = sgHasActive(sg, activeKey);

          if (sg.subLabels) {
            /* ── subLabels: N secciones independientes ── */
            h += '<div class="nav-sub-group-header" onclick="AsideNav.toggleSubGroup(\'' + sg.id + '\')">'
              + '<span>' + sg.label + '</span>'
              + '<i class="fas fa-chevron-right nav-sub-arrow' + (sgOpen ? " open" : "") + '" id="arrow-' + sg.id + '"></i>'
              + '</div>';
            h += '<div class="nav-sub-group-body" id="' + sg.id + '" style="display:' + (sgOpen ? "block" : "none") + ';">';

            sg.subLabels.forEach(function (sl, idx) {
              var slId   = sg.id + "-sl" + idx;
              var slOpen = false;
              if (sl.items) {
                for (var k = 0; k < sl.items.length; k++) {
                  if (sl.items[k].key === activeKey) { slOpen = true; break; }
                }
              }
              h += '<div class="nav-sub-group-header nav-sub-group-header--nested" onclick="AsideNav.toggleIndependent(\'' + slId + '\')">'
                + '<span>' + sl.label + '</span>'
                + '<i class="fas fa-chevron-right nav-sub-arrow' + (slOpen ? " open" : "") + '" id="arrow-' + slId + '"></i>'
                + '</div>';
              h += '<div class="nav-sub-group-body" id="' + slId + '" style="display:' + (slOpen ? "block" : "none") + ';">';
              if (sl.items) {
                sl.items.forEach(function (item) {
                  if (item.disabled) {
                    h += '<a href="#" class="nav-sub-item disabled">' + item.label + '</a>';
                  } else {
                    var active = item.key === activeKey ? " active" : "";
                    h += '<a href="' + href(item.href) + '" class="nav-sub-sub-item' + active + '">' + item.label + '</a>';
                  }
                });
              }
              h += '</div>';
            });

            h += '</div>';

          } else if (sg.subLabel) {
            /* ── subLabel string: Score > Score History ── */
            var innerId   = sg.id + "-inner";
            var innerOpen = sgOpen;
            h += '<div class="nav-sub-group-header" onclick="AsideNav.toggleSubGroup(\'' + sg.id + '\')">'
              + '<span>' + sg.label + '</span>'
              + '<i class="fas fa-chevron-right nav-sub-arrow' + (sgOpen ? " open" : "") + '" id="arrow-' + sg.id + '"></i>'
              + '</div>';
            h += '<div class="nav-sub-group-body" id="' + sg.id + '" style="display:' + (sgOpen ? "block" : "none") + ';">';

            h += '<div class="nav-sub-group-header nav-sub-group-header--nested" onclick="AsideNav.toggleIndependent(\'' + innerId + '\')">'
              + '<span>' + sg.subLabel + '</span>'
              + '<i class="fas fa-chevron-right nav-sub-arrow' + (innerOpen ? " open" : "") + '" id="arrow-' + innerId + '"></i>'
              + '</div>';
            h += '<div class="nav-sub-group-body" id="' + innerId + '" style="display:' + (innerOpen ? "block" : "none") + ';">';

            if (sg.items) {
              sg.items.forEach(function (item) {
                if (item.disabled) {
                  h += '<a href="#" class="nav-sub-item disabled">' + item.label + '</a>';
                } else {
                  var active = item.key === activeKey ? " active" : "";
                  h += '<a href="' + href(item.href) + '" class="nav-sub-sub-item' + active + '">' + item.label + '</a>';
                }
              });
            }

            h += '</div>';
            h += '</div>';

          } else {
            /* ── Original: un nivel ── */
            h += '<div class="nav-sub-group-header" onclick="AsideNav.toggleSubGroup(\'' + sg.id + '\')">'
              + '<span>' + sg.label + '</span>'
              + '<i class="fas fa-chevron-right nav-sub-arrow' + (sgOpen ? " open" : "") + '" id="arrow-' + sg.id + '"></i>'
              + '</div>';
            h += '<div class="nav-sub-group-body" id="' + sg.id + '" style="display:' + (sgOpen ? "block" : "none") + ';">';

            if (sg.items) {
              sg.items.forEach(function (item) {
                if (item.disabled) {
                  h += '<a href="#" class="nav-sub-item disabled">' + item.label + '</a>';
                } else {
                  var active = item.key === activeKey ? " active" : "";
                  h += '<a href="' + href(item.href) + '" class="nav-sub-sub-item' + active + '">' + item.label + '</a>';
                }
              });
            }

            h += '</div>';
          }
        });
        h += '</div>';
      }

      if (!grp.directItemsTop && grp.directItems) {
        grp.directItems.forEach(function (item) {
          var active = item.key === activeKey ? " active" : "";
          h += '<a href="' + href(item.href) + '" class="nav-sub-item' + active + '">' + item.label + '</a>';
        });
      }

      h += '</div>';
      h += '</div>';
    });

    h += '</nav>';

    h += '<div class="aside-footer">'
      + '<a href="#" class="nav-item" onclick="return false;">'
      + '<div class="nav-icon"><i class="fas fa-sign-out-alt"></i></div>'
      + '<span class="nav-text">Log out</span>'
      + '</a>'
      + '<div style="text-align:center;margin-top:8px;font-size:9px;color:rgba(255,255,255,.15);letter-spacing:.5px;">Niche3DS Partner Portal</div>'
      + '</div>';

    return h;
  }

  /* ═══════════════════════════════════════════════
     6. ACCORDION + BRAND SELECTOR METHODS
     ═══════════════════════════════════════════════ */
  window.AsideNav = {

    toggleGroup: function (id) {
      var grp = document.getElementById(id);
      if (!grp) return;
      var isOpen = grp.classList.contains("open");
      document.querySelectorAll(".nav-group").forEach(function (g) {
        if (g.id !== id) g.classList.remove("open");
      });
      grp.classList.toggle("open", !isOpen);
    },

    /* Accordion: cierra hermanos al abrirse */
    toggleSubGroup: function (id) {
      var body  = document.getElementById(id);
      var arrow = document.getElementById("arrow-" + id);
      if (!body) return;
      var isOpen = body.style.display !== "none";

      var parentBody = body.parentElement;
      if (parentBody) {
        parentBody.querySelectorAll(":scope > .nav-sub-group-body, :scope > .nav-sub-group > .nav-sub-group-body").forEach(function (other) {
          if (other !== body && !other.contains(body)) {
            other.style.display = "none";
            var prevHeader = other.previousElementSibling;
            if (prevHeader) {
              var otherArrow = prevHeader.querySelector(".nav-sub-arrow");
              if (otherArrow) otherArrow.classList.remove("open");
            }
          }
        });
      }

      if (isOpen) {
        body.style.display = "none";
        if (arrow) arrow.classList.remove("open");
      } else {
        body.style.display = "block";
        if (arrow) arrow.classList.add("open");
      }
    },

    /* Independiente: NO cierra hermanos. Usado en subLabels y subLabel */
    toggleIndependent: function (id) {
      var body  = document.getElementById(id);
      var arrow = document.getElementById("arrow-" + id);
      if (!body) return;
      var isOpen = body.style.display !== "none";
      if (isOpen) {
        body.style.display = "none";
        if (arrow) arrow.classList.remove("open");
      } else {
        body.style.display = "block";
        if (arrow) arrow.classList.add("open");
      }
    },

    /* ── Brand Selector ── */
    onBrandChange: function(brand) {
      // 1. Actualizar variable global
      selectedBrand = brand;
      
      // 2. Persistir en localStorage
      localStorage.setItem('niche3ds_brand', brand);
      
      // 3. Dispatch custom event para que otras partes de la app puedan escuchar
      var event = new CustomEvent('niche3ds:brandChanged', { 
        detail: { brand: brand } 
      });
      document.dispatchEvent(event);
      
      console.log('[aside.js] Brand changed to:', brand);
    },
    
    // Getter para obtener la marca seleccionada desde fuera
    getSelectedBrand: function() {
      return selectedBrand;
    }
  };

  /* ═══════════════════════════════════════════════
     7. ESTILOS
     ═══════════════════════════════════════════════ */
  function injectStyles() {
    if (document.getElementById("_aside-styles")) return;
    var s = document.createElement("style");
    s.id = "_aside-styles";
    s.textContent =
      ".nav-sub-item.disabled{color:#999!important;opacity:.6;cursor:default!important;" +
      "pointer-events:none!important;text-decoration:none!important;}" +
      ".nav-sub-item.disabled:hover{color:#999!important;text-decoration:none!important;}" +
      ".nav-sub-group-header--nested{padding-left:24px!important;}" +
      /* Brand Dropdown Styles */
      ".brand-dropdown{width:100%;padding:8px 28px 8px 12px;margin-top:6px;border-radius:6px;" +
      "border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.12);" +
      "color:#fff;font-size:14px;font-weight:500;cursor:pointer;appearance:none;" +
      "background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");" +
      "background-repeat:no-repeat;background-position:right 10px center;" +
      "transition:all 0.2s ease;}" +
      ".brand-dropdown:focus{outline:none;border-color:#aba06e;box-shadow:0 0 0 2px rgba(171,160,110,0.3);}" +
      ".brand-dropdown option{background:#1a1a2e;color:#fff;padding:8px;}" +
      ".user-brand-selector{position:relative;padding:8px 0px;}" +
      ".user-brand-selector::after{content:'';position:absolute;right:16px;top:50%;transform:translateY(-50%);" +
      "width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:0px solid rgba(255,255,255,0.7);pointer-events:none;}";
    document.head.appendChild(s);
  }

  /* ═══════════════════════════════════════════════
     8. INYECTAR EN #aside-root
     ═══════════════════════════════════════════════ */
  function inject() {
    var root = document.getElementById("aside-root");
    if (!root) {
      console.warn("[aside.js] No se encontró <div id='aside-root'></div> en el DOM.");
      return;
    }
    root.className = "aside";
    root.innerHTML = buildHTML(detectActiveKey());
    
    // ✅ Re-aplicar el valor seleccionado por si se reconstruye el DOM
    var dropdown = document.getElementById('brandDropdown');
    if (dropdown) {
      dropdown.value = selectedBrand;
    }
  }

  /* ═══════════════════════════════════════════════
     9. INIT
     ═══════════════════════════════════════════════ */
  function init() {
    injectStyles();
    inject();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();