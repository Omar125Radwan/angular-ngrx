import { loginSuccess, signupSuccess, autoLogout } from './auth.actions';
import { initialState } from './../../posts/state/post.state';
import { Action, createReducer, on } from '@ngrx/store';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    }
  }),
  on(signupSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    }
  }),
  on(autoLogout, (state, action) => {
    return {
      ...state,
      user: null,
    }
  })
);

export function AuthReducer(state: any, action: Action) {
  return _authReducer(state, action);
}
