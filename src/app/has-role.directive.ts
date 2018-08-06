import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthenticationService} from './authentication.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authenticationService: AuthenticationService) {
  }

  @Input()
  set appHasRole(role: string) {
    if (this.authenticationService.hasRole(role)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
