const PRODUCTION_API_URL = 'https://bibliophiles-bazar-1.onrender.com/api';
const LOCAL_API_URL = 'http://localhost:2007/api';

function stripTrailingSlash(url) {
    return url.replace(/\/+$/, '');
}

function ensureApiPath(url) {
    const normalized = stripTrailingSlash(url);
    return normalized.endsWith('/api') ? normalized : `${normalized}/api`;
}

function removeApiSuffix(url) {
    return stripTrailingSlash(url).replace(/\/api$/, '');
}

function resolveApiUrl(url, fallback) {
    if (!import.meta.env.PROD) {
        return url || fallback;
    }

    if (!url || url.includes('localhost')) {
        return fallback;
    }

    return url;
}

const apiBaseUrl = resolveApiUrl(
    import.meta.env.VITE_API_BASE_URL,
    PRODUCTION_API_URL,
);

export const API_BASE_URL = ensureApiPath(
    import.meta.env.PROD ? apiBaseUrl : (import.meta.env.VITE_API_BASE_URL || LOCAL_API_URL),
);

export const BACKEND_URL = removeApiSuffix(API_BASE_URL);
