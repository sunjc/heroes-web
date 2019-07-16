import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../authentication.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(private router: Router, private authenticationService: AuthenticationService, private messageService: MessageService) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this.loading = false;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result) {
          // login successful
          this.loading = true;
          this.router.navigate(['dashboard']);
        } else {
          // login failed
          this.log('Username or password is incorrect');
        }
      });
  }

  private log(message: string) {
    this.messageService.add('Login: ' + message);
  }
}
