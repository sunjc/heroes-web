import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {KeycloakService} from './keycloak.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private keycloakService: KeycloakService) {
  }

  @Input()
  set appHasRole(role: string) {
    if (this.keycloakService.hasRole(role)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
