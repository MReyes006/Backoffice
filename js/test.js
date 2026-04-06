(() => {
    const BTN_ID = "atl-report-btn";
    const REPORT_URL = "https://affiliatedashboard.8motiv.com/";

    // Busca el bloque debajo de los botones azules
    const findAnchor = () => {
        const buttons = Array.from(document.querySelectorAll("button, a"));
        const a = buttons.find(b => (b.innerText || "").trim() === "Get product link");
        const b = buttons.find(b => (b.innerText || "").trim() === "Get link with source");
        const anchor = (b || a);
        return anchor ? anchor.closest("div") : null;
    };

    // Función para obtener el ID del afiliado logeado
    const getAffiliateId = () => {
        if (typeof window.clarity !== 'undefined') {
            const scripts = document.querySelectorAll('script');
            for (let script of scripts) {
                if (script.textContent && script.textContent.includes('affiliate_id')) {
                    const match = script.textContent.match(/affiliate_id['"]?\s*,\s*['"]?(\d+)/);
                    if (match && match[1]) {
                        return match[1];
                    }
                }
            }
        }

        const scripts = document.querySelectorAll('script');
        for (let script of scripts) {
            if (script.textContent) {
                const match1 = script.textContent.match(/affiliate_id['"]?\s*,\s*['"]?(\d+)/);
                if (match1 && match1[1]) {
                    return match1[1];
                }
                
                const match2 = script.textContent.match(/clarity\(['"]identify['"]\s*,\s*['"]?(\d+)/);
                if (match2 && match2[1]) {
                    return match2[1];
                }
            }
        }

        const localStorageKeys = Object.keys(localStorage);
        for (let key of localStorageKeys) {
            if (key.toLowerCase().includes('affiliate') || key.toLowerCase().includes('user')) {
                const value = localStorage.getItem(key);
                try {
                    const parsed = JSON.parse(value);
                    if (parsed && (parsed.id || parsed.affiliate_id || parsed.userId)) {
                        return parsed.id || parsed.affiliate_id || parsed.userId;
                    }
                } catch (e) {
                    if (!isNaN(value) && value.length > 0) {
                        return value;
                    }
                }
            }
        }

        const sessionStorageKeys = Object.keys(sessionStorage);
        for (let key of sessionStorageKeys) {
            if (key.toLowerCase().includes('affiliate') || key.toLowerCase().includes('user')) {
                const value = sessionStorage.getItem(key);
                try {
                    const parsed = JSON.parse(value);
                    if (parsed && (parsed.id || parsed.affiliate_id || parsed.userId)) {
                        return parsed.id || parsed.affiliate_id || parsed.userId;
                    }
                } catch (e) {
                    if (!isNaN(value) && value.length > 0) {
                        return value;
                    }
                }
            }
        }

        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name.toLowerCase().includes('affiliate') || name.toLowerCase().includes('user')) {
                try {
                    const decoded = decodeURIComponent(value);
                    const parsed = JSON.parse(decoded);
                    if (parsed && (parsed.id || parsed.affiliate_id || parsed.userId)) {
                        return parsed.id || parsed.affiliate_id || parsed.userId;
                    }
                } catch (e) {
                    if (!isNaN(value) && value.length > 0) {
                        return value;
                    }
                }
            }
        }

        const elementsWithId = document.querySelectorAll('[data-affiliate-id], [data-user-id], [affiliate-id], [user-id]');
        for (let el of elementsWithId) {
            const id = el.getAttribute('data-affiliate-id') || 
                        el.getAttribute('data-user-id') || 
                        el.getAttribute('affiliate-id') || 
                        el.getAttribute('user-id');
            if (id && !isNaN(id)) {
                return id;
            }
        }

        return null;
    };

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    // Función para agregar "Member since" debajo de "Active"
    const addMemberSince = () => {
        if (document.getElementById('member-since-text')) return;

        const affiliateId = getAffiliateId();
        
        if (affiliateId) {
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", "pk_LwfvY6NGrwRLjnG3FlcYNcRwJxcgbZyo");
            myHeaders.append("Content-Type", "application/json");

            fetch(`https://aff-api.uppromote.com/api/v2/affiliates/${affiliateId}`, {
                method: 'GET',
                headers: myHeaders
            })
            .then(response => response.json())
            .then(data => {
                const affiliate = data.data;
                const createdAt = affiliate.created_at;
                
                if (createdAt) {
                    const formattedDate = formatDate(createdAt);
                    
                    // Buscar el span que contiene "Active"
                    const activeSpan = document.querySelector('.dropdown.profile-element .text-muted.text-xs.block');
                    
                    if (activeSpan && !document.getElementById('member-since-text')) {
                        // Crear el nuevo elemento
                        const memberSinceSpan = document.createElement('span');
                        memberSinceSpan.id = 'member-since-text';
                        memberSinceSpan.className = 'text-muted text-xs block';
                        memberSinceSpan.style.cssText = 'margin-top: 4px; font-weight: bold; color: #ffffff;';
                        memberSinceSpan.innerHTML = `Member since: ${formattedDate}`;
                        
                        // Insertar después del span de "Active"
                        activeSpan.parentNode.insertBefore(memberSinceSpan, activeSpan.nextSibling);
                    }
                }
            })
            .catch(error => {
                console.error('Error al obtener fecha:', error);
            });
        }
    };

    // Función para redirigir con login automático
    const redirectWithLogin = (e) => {
        e.preventDefault();
        
        const affiliateId = getAffiliateId();
        
        if (affiliateId) {
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", "pk_LwfvY6NGrwRLjnG3FlcYNcRwJxcgbZyo");
            myHeaders.append("Content-Type", "application/json");

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`https://aff-api.uppromote.com/api/v2/affiliates/${affiliateId}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const affiliate = data.data;
                const params = new URLSearchParams({
                    affiliate_id: affiliate.id || '',
                    email: affiliate.email || '',
                    first_name: affiliate.first_name || '',
                    last_name: affiliate.last_name || '',
                    default_affiliate_link: affiliate.default_affiliate_link || ''
                });
                
                window.open(`${REPORT_URL}?${params.toString()}`, "_blank", "noopener,noreferrer");
            })
            .catch(error => {
                console.error('❌ Error:', error);
                alert('Error al cargar los datos del afiliado.');
            });
        } else {
            alert("No se pudo encontrar el ID del afiliado logeado");
        }
    };

    // Quitar active de Dashboard SIEMPRE y agregar CSS para forzarlo
    const removeDashboardActive = () => {
        const allLinks = document.querySelectorAll('#side-menu li a');
        
        allLinks.forEach(link => {
            const label = link.querySelector('.nav-label');
            if (label && label.textContent.trim() === 'Dashboard') {
                const dashboardLi = link.closest('li');
                if (dashboardLi) {
                    dashboardLi.classList.remove('active');
                    dashboardLi.id = 'dashboard_menu_disabled';
                }
            }
        });
    };

    // Inyectar CSS para forzar que Dashboard nunca se vea como active
    const injectCSS = () => {
        if (document.getElementById('custom-dashboard-css')) return;
        
        const style = document.createElement('style');
        style.id = 'custom-dashboard-css';
        style.textContent = `
            #dashboard_menu_disabled.active {
                background: transparent !important;
            }
            #dashboard_menu_disabled.active > a {
                color: #a7b1c2 !important;
                background: transparent !important;
            }
            #dashboard_menu_disabled.active > a .nav-label {
                color: #a7b1c2 !important;
            }
            #dashboard_menu_disabled.active > a i {
                color: #a7b1c2 !important;
            }
        `;
        document.head.appendChild(style);
    };

    // Poner active en Links si estamos en /dashboard
    const setLinksActive = () => {
        const currentUrl = window.location.href;
        
        if (currentUrl.includes('/dashboard')) {
            const linksLi = document.getElementById('links_menu');
            if (linksLi) {
                linksLi.classList.add('active');
            }
        }
    };

    // Agregar nuevo li "Links" al menú - SIEMPRE arriba de Dashboard
    const addLinksMenuItem = () => {
        if (document.getElementById('links_menu')) {
            removeDashboardActive();
            setLinksActive();
            return;
        }

        // Buscar el li que contiene el enlace de Dashboard por su texto
        const allLinks = document.querySelectorAll('#side-menu li a .nav-label');
        let dashboardLi = null;
        
        allLinks.forEach(label => {
            if (label.textContent.trim() === 'Dashboard') {
                dashboardLi = label.closest('li');
            }
        });
        
        if (dashboardLi) {
            // Crear nuevo li para "Links"
            const linksLi = document.createElement('li');
            linksLi.id = 'links_menu';
            linksLi.innerHTML = `
                <a href="https://af.uppromote.com/8motivperfume/dashboard">
                    <i class="fal fa-link btn-danger-shadow"></i>
                    <span class="nav-label">Links</span>
                </a>
            `;
            
            // Insertar ANTES del Dashboard (arriba)
            dashboardLi.parentNode.insertBefore(linksLi, dashboardLi);
            
            // Quitar active de Dashboard y poner en Links
            removeDashboardActive();
            setLinksActive();
        }
    };

    // Modificar el enlace de Dashboard
    const setupDashboardLink = () => {
        const allLinks = document.querySelectorAll('#side-menu li a');
        
        allLinks.forEach(link => {
            const label = link.querySelector('.nav-label');
            if (label && label.textContent.trim() === 'Dashboard' && !link.hasAttribute('data-modified')) {
                link.setAttribute('data-modified', 'true');
                link.href = '#';
                link.addEventListener('click', redirectWithLogin);
                
                // Quitar active inmediatamente
                const dashboardLi = link.closest('li');
                if (dashboardLi) {
                    dashboardLi.classList.remove('active');
                    dashboardLi.id = 'dashboard_menu_disabled';
                }
            }
        });
    };

    const ensureButton = () => {
        if (document.getElementById(BTN_ID)) return true;

        const anchor = findAnchor();
        if (!anchor) return false;

        const btn = document.createElement("button");
        btn.id = BTN_ID;
        btn.type = "button";
        btn.innerText = "Dashboard";

        btn.style.cssText = `
            padding: 16px 16px;
            border-radius: 6px;
            border: 0px solid rgb(221, 221, 221);
            font-weight: 800;
            cursor: pointer;
            background: #b8a77d;
            color: #fff;
        `;

        btn.addEventListener("click", redirectWithLogin);

        anchor.appendChild(btn);
        return true;
    };

    // Inyectar CSS primero
    injectCSS();

    // Inicial + reintentos
    ensureButton();
    addLinksMenuItem();
    setupDashboardLink();
    removeDashboardActive();
    setLinksActive();
    addMemberSince();
    
    let tries = 0;
    const t = setInterval(() => {
        ensureButton();
        addLinksMenuItem();
        setupDashboardLink();
        removeDashboardActive();
        setLinksActive();
        addMemberSince();
        tries++;
        if (tries > 40) clearInterval(t);
    }, 300);

    // Mantenerlo si React re-renderiza
    const obs = new MutationObserver(() => {
        ensureButton();
        addLinksMenuItem();
        setupDashboardLink();
        removeDashboardActive();
        setLinksActive();
        addMemberSince();
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });

    // Cuando la pestaña vuelve a estar visible, quitar active de Dashboard
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            removeDashboardActive();
            setLinksActive();
        }
    });

    // También cuando la ventana recibe foco
    window.addEventListener('focus', () => {
        removeDashboardActive();
        setLinksActive();
    });

})();