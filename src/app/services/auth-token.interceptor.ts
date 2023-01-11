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
// eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1NWU0ZDkxOGE0ODY0YWQxMzUxMDViYmRjMDEwYWY5Njc5YzM0MTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYW5ndWxhcm5ncngtMjY0ZGYiLCJhdWQiOiJhbmd1bGFybmdyeC0yNjRkZiIsImF1dGhfdGltZSI6MTY3MzQzOTYzMywidXNlcl9pZCI6IllXNDFvWWFRT21RTEt0Um1jUFBEMDA0Y3dSSjIiLCJzdWIiOiJZVzQxb1lhUU9tUUxLdFJtY1BQRDAwNGN3UkoyIiwiaWF0IjoxNjczNDM5NjMzLCJleHAiOjE2NzM0NDMyMzMsImVtYWlsIjoidGVzdDJAdGVzdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdDJAdGVzdC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.wBmtlxSBL-xRd_MAAPKFaLY1-WkrK3yURSJYFH_lWM4ZUM6GfLaMGLzF5wqwMdK3xh33T0rVxiPfNP8jmlnmaojXEVlGrfPPJ_rSBFh9vT00nLFSMpPU8hGzUazq4Uja1XSaTAAFSlnW6YBrlkYniYDsL91KEqLOQwkd8tEhXX-4gRYtbmYTrH4jMPYKZd63AHGbOUJn-QjB1iKf-49jwN-g2H62Pt49IhKCY2DNuyGj11MHZK8-g9Kjq6k7-PWd3-FBJ_NUjPaFGT_ONee0RAVFmoyE4RSoJNzc5-pwc12SbX58wKRuy47M4Cxu1RqXLC2nOkKfH8UdWI1p39KEtw
