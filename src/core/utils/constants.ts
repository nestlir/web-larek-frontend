const isLocalhost =
  typeof window !== 'undefined' &&
  ['localhost', '127.0.0.1'].includes(window.location.hostname);

const origin = isLocalhost
  ? (process.env.API_ORIGIN || 'http://localhost:8080')
  : 'https://larek-api.nomoreparties.co';

export const API_URL = `${origin}/api/weblarek`;
export const CDN_URL = `${origin}/content/weblarek`;

export const settings = {};
