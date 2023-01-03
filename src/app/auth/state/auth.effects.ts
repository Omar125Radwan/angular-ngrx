import { setLoadingSpinner } from './../../store/shared/shared.action';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { User } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { loginStart, loginSuccess } from './auth.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';

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
          const user: User = this.authService.formatUser(data);
          return loginSuccess({ user });
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
