import { signupStart } from './../state/auth.actions';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  //! Factory function for Errors
  showErrors(Name: string, min?: number): string | undefined {
    const nameControl = this.signUpForm.get(Name);
    if (nameControl?.touched && !nameControl.valid) {
      if (nameControl.errors?.['required']) {
        return `${Name} is required`;
      }
      if (nameControl.errors?.['minlength']) {
        return `${Name} Should be of minimum ${min} chars length`;
      }
      if (nameControl.errors?.['email']) {
        return `Invalid Mail`;
      }
    }
    return undefined;
  }

  onSignup(): void {
    if (!this.signUpForm.valid) {
      return;
    }
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(signupStart({ email, password }));
  }

}
