import {KeycloakConfig, KeycloakInitOptions} from 'keycloak-js';

/**
 * HTTP Methods
 */
export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH';

/**
 * ExcludedUrl type may be used to specify the url and the HTTP method that
 * should not be intercepted by the KeycloakBearerInterceptor.
 *
 * Example:
 * const excludedUrl: ExcludedUrl[] = [
 *  {
 *    url: 'reports/public'
 *    httpMethods: ['GET']
 *  }
 * ]
 *
 * In the example above for URL reports/public and HTTP Method GET the bearer will not be automatically added.
 *
 * If the url is informed but httpMethod is undefined, then the bearer will not be added for all HTTP Methods.
 */
export interface ExcludedUrl {
  url: string;
  httpMethods?: HttpMethods[];
}

/**
 * Similar to ExcludedUrl, contains the HTTP methods and a regex to include the url patterns.
 * This interface is used internally by the KeycloakService.
 */
export interface ExcludedUrlRegex {
  urlPattern: RegExp;
  httpMethods?: HttpMethods[];
}

/**
 * KeycloakService initialization options.
 */
export interface KeycloakOptions {
  /**
   * Configs to init the keycloak-js library. If undefined, will look for a keycloak.json file at root of the project.
   *
   * If not undefined, can be a string meaning the url to the keycloak.json file or an object of {@link KeycloakConfig}.
   * Use this configuration if you want to specify the keycloak server, realm, clientId.
   * This is useful if you have different configurations for production, stage and development environments.
   * Hint: Make use of Angular environment configuration.
   */
  config?: KeycloakConfig | string;
  /**
   * Options to initialize the adapter.
   */
  initOptions?: KeycloakInitOptions;
  /**
   * By default all requests made by Angular HttpClient will be intercepted in order to add the bearer in the Authorization Http Header.
   * However, if this is a not desired feature, the enableBearerInterceptor must be false.
   *
   * Briefly, if enableBearerInterceptor === false, the bearer will not be added to the authorization header.
   *
   * The default value is true.
   */
  enableBearerInterceptor?: boolean;
  /**
   * Forces the execution of loadUserProfile after the keycloak initialization considering that the user logged in.
   * This option is recommended if is desirable to have the user details at the beginning,
   * so after the login, the loadUserProfile function will be called and it's value cached.
   *
   * The default value is true.
   */
  loadUserProfileAtStartUp?: boolean;
  /**
   * String Array to exclude the urls that should not have the Authorization Header automatically added.
   * This library makes use of Angular Http Interceptor, to automatically add the Bearer token to the request.
   */
  bearerExcludedUrls?: (string | ExcludedUrl)[];
}
