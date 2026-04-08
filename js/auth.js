<<<<<<< HEAD

// Verificar si el usuario está autenticado
function isAuthenticated() {
    const isLoggedIn = localStorage.getItem('affiliate_logged_in');
    const affiliateData = localStorage.getItem('affiliate_data');
    return isLoggedIn === 'true' && affiliateData !== null;
}

// Proteger página - redirigir si no está autenticado
function protectRoute(redirectTo = 'index.html') {
    if (!isAuthenticated()) {
        window.location.href = redirectTo;
        return false;
    }
    return true;
}

// Redirigir si ya está autenticado (para página de login)
function redirectIfAuthenticated(redirectTo = 'dashboard.html') {
    if (isAuthenticated()) {
        window.location.href = redirectTo;
        return true;
    }
    return false;
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('affiliate_logged_in');
    localStorage.removeItem('affiliate_data');
    window.location.href = 'index.html';
}

// Obtener datos del usuario
function getAffiliateData() {
    const data = localStorage.getItem('affiliate_data');
    return data ? JSON.parse(data) : null;
=======

// Verificar si el usuario está autenticado
function isAuthenticated() {
    const isLoggedIn = localStorage.getItem('affiliate_logged_in');
    const affiliateData = localStorage.getItem('affiliate_data');
    return isLoggedIn === 'true' && affiliateData !== null;
}

// Proteger página - redirigir si no está autenticado
function protectRoute(redirectTo = 'index.html') {
    if (!isAuthenticated()) {
        window.location.href = redirectTo;
        return false;
    }
    return true;
}

// Redirigir si ya está autenticado (para página de login)
function redirectIfAuthenticated(redirectTo = 'dashboard.html') {
    if (isAuthenticated()) {
        window.location.href = redirectTo;
        return true;
    }
    return false;
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('affiliate_logged_in');
    localStorage.removeItem('affiliate_data');
    window.location.href = 'index.html';
}

// Obtener datos del usuario
function getAffiliateData() {
    const data = localStorage.getItem('affiliate_data');
    return data ? JSON.parse(data) : null;
>>>>>>> c10c9a3d80c9b285c61c48beeb028ec2ec3391c2
}