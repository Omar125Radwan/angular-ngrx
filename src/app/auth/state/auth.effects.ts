import { AuthService } from './../../services/auth.service';
import { loginStart, loginSuccess } from './auth.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(loginStart),
    exhaustMap((action) => this.authService.login(action.email, action.password)
      .pipe(
        map((data) => {
          return loginSuccess();
        }),
      ))
    )}
  );

}



/* login2$ = createEffect(() => this.actions$.pipe(
  ofType(loginStart),
  exhaustMap((action) => this.authService.login(action.email, action.password)
    .pipe(
      map((data) =>  loginSuccess()),
    ))
  )
); */
