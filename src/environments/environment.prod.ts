export const environment = {
  production: true,
  apiUrl: 'http://heroes-api.apps.itrunner.org',
  keycloak: {
    config: {
      url: 'https://sso.itrunner.org/auth',
      realm: 'heroes',
      clientId: 'heroes'
    },
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: false
    },
    enableBearerInterceptor: true,
    loadUserProfileAtStartUp: true,
    bearerExcludedUrls: ['/assets']
  }
};
