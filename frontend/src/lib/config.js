const PRODUCTION_BACKEND_URL = 'https://bibliophiles-bazar-1.onrender.com';
const LOCAL_BACKEND_URL = 'http://localhost:2007';

function stripTrailingSlash(url) {
    return url.replace(/\/+$/, '');
}

function ensureApiPath(url) {
    const normalized = stripTrailingSlash(url);
    return normalized.endsWith('/api') ? normalized : `${normalized}/api`;
}

function resolveProductionUrl(url, fallback) {
    if (!import.meta.env.PROD) {
        return url || fallback;
    }

    if (!url || url.includes('localhost')) {
        return fallback;
    }

    return url;
}

const backendUrl = resolveProductionUrl(
    import.meta.env.VITE_BACKEND_URL,
    PRODUCTION_BACKEND_URL,
);

const apiBaseUrl = resolveProductionUrl(
    import.meta.env.VITE_API_BASE_URL,
    `${backendUrl}/api`,
);

export const BACKEND_URL = stripTrailingSlash(
    import.meta.env.PROD ? backendUrl : (import.meta.env.VITE_BACKEND_URL || LOCAL_BACKEND_URL),
);

export const API_BASE_URL = ensureApiPath(
    import.meta.env.PROD ? apiBaseUrl : (import.meta.env.VITE_API_BASE_URL || `${BACKEND_URL}/api`),
);
