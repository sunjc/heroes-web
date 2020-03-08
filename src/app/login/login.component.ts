import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {MessageService} from '../message.service';
import {User} from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  validateForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService,
              private messageService: MessageService, private router: Router) {
  }

  submitForm(): void {
    this.user = Object.assign({}, this.validateForm.value);
    this.login();
  }

  login() {
    this.loading = false;
    this.authenticationService.login(this.user.username, this.user.password)
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

  ngOnInit(): void {
    // reset login status
    this.authenticationService.logout();

    this.validateForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      remember: [true]
    });
  }

  private log(message: string) {
    this.messageService.add('Login: ' + message);
  }
}
