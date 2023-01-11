import { on } from '@ngrx/store';
import { initialState } from './post.state';
import { createReducer } from '@ngrx/store';
import { PostState } from './post.state';
import { Action } from '@ngrx/store';
import { loadPostsSuccess, addPostSuccess, updatePostSuccess, deletePostSuccess } from './post.action';
const _postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    let post = { ...action.post };
    return {
      ...state,
      posts: [...state.posts, post],
    }
  }),
  on(updatePostSuccess, (state, action) => {
    const updatePosts = state.posts.map(post => {
      return action.post.id === post.id ? action.post : post;
    })
    return {
      ...state,
      posts: updatePosts,
    }
  }),
  on(deletePostSuccess, (state, { id }) => {
    const updatePosts = state.posts.filter(post => {
      return post.id !== id;
    });
    return {
      ...state,
      posts: updatePosts,
    }
  }),
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
    }
  })
);
export function postsReducer(state: PostState | undefined, action: Action) {
  return _postsReducer(state, action);
}
