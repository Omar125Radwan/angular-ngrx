import { getToken } from './../auth/state/auth.selector';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { AppState } from '../store/app.state';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(getToken).pipe(
        take(1),
        exhaustMap((token) => {
          if (!token) {
            return next.handle(req);
          }
          let modifiedReq = req.clone({
            params: req.params.append('auth', token),
          });
          return next.handle(modifiedReq)
        })
      );
  }
}
