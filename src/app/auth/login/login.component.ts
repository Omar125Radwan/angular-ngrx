import { loginStart } from './../state/auth.actions';
import { AppState } from './../../store/app.state';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  //! Factory function for Errors
  showErrors(Name: string, min?: number): string | undefined {
    const nameControl = this.loginForm.get(Name);
    if(nameControl?.touched && !nameControl.valid) {
      if(nameControl.errors?.['required']) {
        return `${Name} is required`;
      }
      if(nameControl.errors?.['minlength']) {
        return `${Name} Should be of minimum ${min} chars length`;
      }
      if(nameControl.errors?.['email']) {
        return `Invalid Mail`;
      }
    }
    return undefined;
  }

  onLogin(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.store.dispatch(loginStart({email, password}));
  }

}
