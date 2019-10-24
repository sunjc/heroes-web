import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KeycloakService} from './keycloak.service';
import {mergeMap} from 'rxjs/operators';
import {ExcludedUrlRegex} from './keycloak-options';

@Injectable()
export class KeycloakBearerInterceptor implements HttpInterceptor {
  constructor(private keycloakService: KeycloakService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {enableBearerInterceptor, excludedUrls} = this.keycloakService;
    if (!enableBearerInterceptor) {
      return next.handle(req);
    }

    const shallPass: boolean = excludedUrls.findIndex(item => this.isUrlExcluded(req, item)) > -1;
    if (shallPass) {
      return next.handle(req);
    }

    return this.keycloakService.addTokenToHeader(req.headers).pipe(
      mergeMap(headersWithBearer => {
        const kcReq = req.clone({headers: headersWithBearer});
        return next.handle(kcReq);
      })
    );
  }

  /**
   * Checks if the url is excluded from having the Bearer Authorization header added.
   *
   * @param req http request from @angular http module.
   * @param excludedUrlRegex contains the url pattern and the http methods,
   * excluded from adding the bearer at the Http Request.
   */
  private isUrlExcluded({method, url}: HttpRequest<any>, {urlPattern, httpMethods}: ExcludedUrlRegex): boolean {
    const httpTest = httpMethods.length === 0 || httpMethods.join().indexOf(method.toUpperCase()) > -1;
    const urlTest = urlPattern.test(url);

    return httpTest && urlTest;
  }
}
