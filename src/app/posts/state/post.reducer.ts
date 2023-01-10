import { on } from '@ngrx/store';
import { initialState } from './post.state';
import { createReducer } from '@ngrx/store';
import { PostState } from './post.state';
import { Action } from '@ngrx/store';
import { addPost, deletePost, updatePost, loadPostsSuccess } from './post.action';
const _postsReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    let post = { ...action.post };
    post.id = ((state.posts.length) + 1).toString();
    return {
      ...state,
      posts: [...state.posts, post],
    }
  }),
  on(updatePost, (state, action) => {
    const updatePosts = state.posts.map(post => {
      return action.post.id === post.id ? action.post : post;
    })
    return {
      ...state,
      posts: updatePosts,
    }
  }),
  on(deletePost, (state, { id }) => {
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
