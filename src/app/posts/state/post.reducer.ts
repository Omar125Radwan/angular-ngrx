import { initialState } from './post.state';
import { createReducer } from '@ngrx/store';
import { PostState } from './post.state';
import { Action } from '@ngrx/store';
const _postsReducer = createReducer(initialState);
export function postsReducer (state: PostState | undefined, action: Action) {
  return _postsReducer(state, action);
}
