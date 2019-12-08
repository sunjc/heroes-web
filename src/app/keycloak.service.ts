import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExcludedUrl, ExcludedUrlRegex, KeycloakOptions} from './keycloak-options';
import * as Keycloak from 'keycloak-js';

@Injectable({providedIn: 'root'})
export class KeycloakService {
  private keycloak: Keycloak.KeycloakInstance;
  private userProfile: Keycloak.KeycloakProfile;
  private loadUserProfileAtStartUp: boolean;
  private _enableBearerInterceptor: boolean;
  private _excludedUrls: ExcludedUrlRegex[];

  /**
   * Keycloak initialization. It should be called to initialize the adapter.
   * Options is a object with 2 main parameters: config and initOptions. The first one will be used to create the Keycloak instance.
   * The second one are options to initialize the keycloak instance.
   *
   * @param options
   * Config: may be a string representing the keycloak URI or an object with the following content:
   * - url: Keycloak json URL
   * - realm: realm name
   * - clientId: client id
   *
   * initOptions:
   * - onLoad: Specifies an action to do on load. Supported values are 'login-required' or 'check-sso'.
   * - token: Set an initial value for the token.
   * - refreshToken: Set an initial value for the refresh token.
   * - idToken: Set an initial value for the id token (only together with token or refreshToken).
   * - timeSkew: Set an initial value for skew between local time and Keycloak server in seconds(only together with token or refreshToken).
   * - checkLoginIframe: Set to enable/disable monitoring login state (default is true).
   * - checkLoginIframeInterval: Set the interval to check login state (default is 5 seconds).
   * - responseMode: Set the OpenID Connect response mode send to Keycloak server at login request.
   * Valid values are query or fragment . Default value is fragment, which means that after successful authentication will Keycloak redirect to
   * javascript application with OpenID Connect parameters added in URL fragment. This is generally safer and recommended over query.
   * - flow: Set the OpenID Connect flow. Valid values are standard, implicit or hybrid.
   *
   * enableBearerInterceptor: Flag to indicate if the bearer will added to the authorization header.
   *
   * loadUserProfileInStartUp: Indicates that the user profile should be loaded at the keycloak initialization, just after the login.
   *
   * bearerExcludedUrls: String Array to exclude the urls that should not have the Authorization Header automatically added.
   *
   * @returns A Promise with a boolean indicating if the initialization was successful.
   */
  init(options: KeycloakOptions = {}): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.initServiceValues(options);

      const {config, initOptions} = options;

      this.keycloak = Keycloak(config);

      this.keycloak.init(initOptions)
        .success(async authenticated => {
          if (authenticated && this.loadUserProfileAtStartUp) {
            await this.loadUserProfile();
          }
          resolve(authenticated);
        })
        .error((kcError) => {
          let msg = 'An error happened during Keycloak initialization.';
          if (kcError) {
            msg = msg.concat(`\nAdapter error details:\nError: ${kcError.error}\nDescription: ${kcError.error_description}`
            );
          }
          reject(msg);
        });
    });
  }

  /**
   * Loads all bearerExcludedUrl content in a uniform type: ExcludedUrl,
   * so it becomes easier to handle.
   *
   * @param bearerExcludedUrls array of strings or ExcludedUrl that includes
   * the url and HttpMethod.
   */
  private loadExcludedUrls(bearerExcludedUrls: (string | ExcludedUrl)[]): ExcludedUrlRegex[] {
    const excludedUrls: ExcludedUrlRegex[] = [];
    for (const item of bearerExcludedUrls) {
      let excludedUrl: ExcludedUrlRegex;
      if (typeof item === 'string') {
        excludedUrl = {urlPattern: new RegExp(item, 'i'), httpMethods: []};
      } else {
        excludedUrl = {
          urlPattern: new RegExp(item.url, 'i'),
          httpMethods: item.httpMethods
        };
      }
      excludedUrls.push(excludedUrl);
    }
    return excludedUrls;
  }

  /**
   * Handles the class values initialization.
   */
  private initServiceValues({enableBearerInterceptor = true, loadUserProfileAtStartUp = true, bearerExcludedUrls = []}): void {
    this._enableBearerInterceptor = enableBearerInterceptor;
    this.loadUserProfileAtStartUp = loadUserProfileAtStartUp;
    this._excludedUrls = this.loadExcludedUrls(bearerExcludedUrls);
  }

  /**
   * Redirects to login form
   */
  login(options: Keycloak.KeycloakLoginOptions = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      this.keycloak.login(options)
        .success(async () => {
          if (this.loadUserProfileAtStartUp) {
            await this.loadUserProfile();
          }
          resolve();
        })
        .error(() => reject(`An error happened during the login.`));
    });
  }

  /**
   * Redirects to logout.
   *
   * @param redirectUri Specifies the uri to redirect to after logout.
   * @returns A void Promise if the logout was successful, cleaning also the userProfile.
   */
  logout(redirectUri?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const options: any = {redirectUri};

      this.keycloak.logout(options)
        .success(() => {
          this.userProfile = undefined;
          resolve();
        })
        .error(() => reject('An error happened during logout.'));
    });
  }

  /**
   * Redirects to the Account Management Console
   */
  account() {
    this.keycloak.accountManagement();
  }

  /**
   * Check if the user has access to the specified role.
   *
   * @param role role name
   * @param resource resource name If not specified, `clientId` is used
   * @returns A boolean meaning if the user has the specified Role.
   */
  hasRole(role: string, resource?: string): boolean {
    let hasRole: boolean;

    hasRole = this.keycloak.hasResourceRole(role, resource);
    if (!hasRole) {
      hasRole = this.keycloak.hasRealmRole(role);
    }
    return hasRole;
  }

  /**
   * Check if user is logged in.
   *
   * @returns A boolean that indicates if the user is logged in.
   */
  async isLoggedIn(): Promise<boolean> {
    try {
      if (!this.keycloak.authenticated) {
        return false;
      }
      await this.updateToken(20);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Returns true if the token has less than minValidity seconds left before it expires.
   *
   * @param minValidity Seconds left. (minValidity) is optional. Default value is 0.
   * @returns Boolean indicating if the token is expired.
   */
  isTokenExpired(minValidity: number = 0): boolean {
    return this.keycloak.isTokenExpired(minValidity);
  }

  /**
   * If the token expires within minValidity seconds the token is refreshed. If the
   * session status iframe is enabled, the session status is also checked.
   * Returns a promise telling if the token was refreshed or not. If the session is not active
   * anymore, the promise is rejected.
   *
   * @param minValidity Seconds left. (minValidity is optional, if not specified 5 is used)
   * @returns Promise with a boolean indicating if the token was successfully updated.
   */
  updateToken(minValidity: number = 5): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!this.keycloak) {
        reject('Keycloak Angular library is not initialized.');
        return;
      }

      this.keycloak.updateToken(minValidity)
        .success(refreshed => {
          resolve(refreshed);
        })
        .error(() => reject('Failed to refresh the token, or the session is expired'));
    });
  }

  /**
   * Returns the authenticated token, calling updateToken to get a refreshed one if
   * necessary. If the session is expired this method calls the login method for a new login.
   *
   * @returns Promise with the generated token.
   */
  getToken(): Promise<string> {
    return new Promise(async (resolve) => {
      try {
        await this.updateToken(10);
        resolve(this.keycloak.token);
      } catch (error) {
        this.login();
      }
    });
  }

  /**
   * Loads the user profile.
   * Returns promise to set functions to be invoked if the profile was loaded
   * successfully, or if the profile could not be loaded.
   *
   * @param forceReload
   * If true will force the loadUserProfile even if its already loaded.
   * @returns
   * A promise with the KeycloakProfile data loaded.
   */
  loadUserProfile(forceReload: boolean = false): Promise<Keycloak.KeycloakProfile> {
    return new Promise(async (resolve, reject) => {
      if (this.userProfile && !forceReload) {
        resolve(this.userProfile);
        return;
      }

      if (!this.keycloak.authenticated) {
        reject('The user profile was not loaded as the user is not logged in.');
        return;
      }

      this.keycloak.loadUserProfile()
        .success(result => {
          this.userProfile = result as Keycloak.KeycloakProfile;
          resolve(this.userProfile);
        })
        .error(() => reject('The user profile could not be loaded.'));
    });
  }

  /**
   * Returns the logged username.
   */
  getUsername(): string {
    if (!this.userProfile) {
      throw new Error('User not logged in or user profile was not loaded.');
    }

    return this.userProfile.username;
  }

  /**
   * Returns email of the logged user
   */
  getUserEmail(): string {
    if (!this.userProfile) {
      throw new Error('User not logged in or user profile was not loaded.');
    }

    return this.userProfile.email;
  }

  /**
   * Clear authentication state, including tokens. This can be useful if application
   * has detected the session was expired, for example if updating token fails.
   * Invoking this results in onAuthLogout callback listener being invoked.
   */
  clearToken(): void {
    this.keycloak.clearToken();
  }

  /**
   * Adds a valid token in header. The key & value format is: Authorization Bearer <token>.
   * If the headers param is undefined it will create the Angular headers object.
   *
   * @param headers Updated header with Authorization and Keycloak token.
   * @returns An observable with the HTTP Authorization header and the current token.
   */
  addTokenToHeader(headers: HttpHeaders = new HttpHeaders()): Observable<HttpHeaders> {
    return new Observable((observer) => {
      this.getToken().then(token => {
        headers = headers.set('Authorization', 'bearer ' + token);
        observer.next(headers);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  get enableBearerInterceptor(): boolean {
    return this._enableBearerInterceptor;
  }

  get excludedUrls(): ExcludedUrlRegex[] {
    return this._excludedUrls;
  }
}
