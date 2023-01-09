import { loginSuccess, signupSuccess } from './auth.actions';
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
  })
  );

export function AuthReducer(state: any, action: Action) {
  return _authReducer(state, action);
}
