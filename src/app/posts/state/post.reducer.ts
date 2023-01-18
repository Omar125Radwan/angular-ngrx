import { on } from '@ngrx/store';
import { initialState, postsAdapter } from './post.state';
import { createReducer } from '@ngrx/store';
import { PostState } from './post.state';
import { Action } from '@ngrx/store';
import { loadPostsSuccess, addPostSuccess, updatePostSuccess, deletePostSuccess } from './post.action';
const _postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    return postsAdapter.addOne(action.post, state);
  }),
  on(updatePostSuccess, (state, action) => {
    return postsAdapter.updateOne(action.post, state);
  }),
  on(deletePostSuccess, (state, { id }) => {
    return postsAdapter.removeOne(id, state);
  }),
  on(loadPostsSuccess, (state, action) => {
    return postsAdapter.setAll(action.posts, state);
  })
);
export function postsReducer(state: PostState | undefined, action: Action) {
  return _postsReducer(state, action);
}






//! addPostSucces
/*  let post = { ...action.post };
  return {
    ...state,
    posts: [...state.posts, post],
  } */
//! deletePostSuccess
/* const updatePosts = state.posts.filter(post => {
  return post.id !== id;
});
return {
  ...state,
  posts: updatePosts,
} */
