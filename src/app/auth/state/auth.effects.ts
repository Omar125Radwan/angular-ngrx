import { setLoadingSpinner, setErrorMessage } from './../../store/shared/shared.action';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { User } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { loginStart, loginSuccess } from './auth.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
    ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(loginStart),
    exhaustMap((action) => this.authService.login(action.email, action.password)
      .pipe(
        map((data) => {
          this.store.dispatch(setLoadingSpinner({status: false}));
          this.store.dispatch(setErrorMessage({message: ''}));
          const user: User = this.authService.formatUser(data);
          return loginSuccess({ user });
        }),
        catchError(errResp => {
          this.store.dispatch(setLoadingSpinner({status: false}));
          console.log(errResp.error.error.message);
          const errorMessage = this.authService.getErrorMessage(errResp.error.error.message)
          return of(setErrorMessage({message: errorMessage}));
        })
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
