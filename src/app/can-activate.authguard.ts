import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {KeycloakService} from './keycloak.service';

@Injectable({providedIn: 'root'})
export class CanActivateAuthGuard implements CanActivate {

  constructor(private router: Router, private keycloakService: KeycloakService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve) => {
      const authenticated = await this.keycloakService.isLoggedIn();
      if (authenticated) {
        resolve(true);
      } else {
        this.keycloakService.login();
        resolve(false);
      }
    });
  }
}
