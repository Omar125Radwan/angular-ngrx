import { Router } from '@angular/router';
import { setLoadingSpinner, setErrorMessage } from './../../store/shared/shared.action';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { User } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { loginStart, loginSuccess, signupStart, signupSuccess, autoLogin, autoLogout } from './auth.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => this.authService.login(action.email, action.password)
        .pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user: User = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user, redirect: true });
          }),
          catchError(errResp => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(errResp.error.error.message)
            return of(setErrorMessage({ message: errorMessage }));
          })
        ))
    )
  }
  );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => this.authService.signUp(action.email, action.password)
        .pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user: User = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return signupSuccess({ user, redirect: true });
          }),
          catchError(errResp => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(errResp.error.error.message)
            return of(setErrorMessage({ message: errorMessage }));
          })
        ))
    )
  }
  );

  loginRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...[loginSuccess, signupSuccess]),
      tap((action) => {
        this.store.dispatch(setErrorMessage({ message: '' }));
        if(action.redirect) {
          this.router.navigate(['/']);
        }
      })
    )
  },
    { dispatch: false }
  );

  autoLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogin),
        mergeMap((action) => {
          const user = this.authService.getUserFromLocalStorage();
          return of(loginSuccess({ user, redirect: false }));
        })
      );
    }
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogout),
        map((action) => {
          this.authService.logout();
          this.router.navigate(['auth']);
        })
      )
    },
    { dispatch: false }
  )

}



/* login2$ = createEffect(() => this.actions$.pipe(
  ofType(loginStart),
  exhaustMap((action) => this.authService.login(action.email, action.password)
    .pipe(
      map((data) =>  loginSuccess()),
    ))
  )
); */
