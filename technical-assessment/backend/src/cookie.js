const { env } = require("./config");

const cookieDomain =
  env.COOKIE_DOMAIN && env.COOKIE_DOMAIN !== "localhost"
    ? env.COOKIE_DOMAIN
    : undefined;

const cookieOptions = {
  secure: true,
  sameSite: "lax",
  ...(cookieDomain ? { domain: cookieDomain } : {}),
};
const legacyCookieOptions = {
  secure: true,
  sameSite: "lax",
};

const setAccessTokenCookie = (res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: env.JWT_ACCESS_TOKEN_TIME_IN_MS,
    ...cookieOptions,
  });
};
const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: env.JWT_REFRESH_TOKEN_TIME_IN_MS,
    ...cookieOptions,
  });
};
const setCsrfTokenCookie = (res, csrfToken) => {
  res.cookie("csrfToken", csrfToken, {
    httpOnly: false,
    maxAge: env.CSRF_TOKEN_TIME_IN_MS,
    ...cookieOptions,
  });
};
const setAllCookies = (res, accessToken, refreshToken, csrfToken) => {
  setAccessTokenCookie(res, accessToken);
  setRefreshTokenCookie(res, refreshToken);
  setCsrfTokenCookie(res, csrfToken);
};

const clearAllCookies = (res) => {
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  res.clearCookie("csrfToken", cookieOptions);
  // Remove cookies created before switching from a host-only to a shared domain.
  res.clearCookie("accessToken", legacyCookieOptions);
  res.clearCookie("refreshToken", legacyCookieOptions);
  res.clearCookie("csrfToken", legacyCookieOptions);
};

const clearAccessAndCsrfCookies = (res) => {
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("csrfToken", cookieOptions);
  // Remove cookies created before switching from a host-only to a shared domain.
  res.clearCookie("accessToken", legacyCookieOptions);
  res.clearCookie("csrfToken", legacyCookieOptions);
};

module.exports = {
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setCsrfTokenCookie,
  setAllCookies,
  clearAllCookies,
  clearAccessAndCsrfCookies,
};
