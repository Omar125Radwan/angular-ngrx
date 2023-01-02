import { initialState } from './../../posts/state/post.state';
import { Action, createReducer } from '@ngrx/store';
import { AuthState } from './auth.state';

const _authReducer = createReducer(initialState);

export function AuthReducer(state: any, action: Action) {
  return _authReducer(state, action);
}
