// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  keycloak: {
    config: {
      url: 'http://localhost:8090/auth',
      realm: 'heroes',
      clientId: 'heroes',
      sslRequired: 'external'
    },
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: false,
      promiseType: 'native'
    },
    enableBearerInterceptor: true,
    loadUserProfileAtStartUp: true,
    bearerExcludedUrls: ['/assets']
  }
};
