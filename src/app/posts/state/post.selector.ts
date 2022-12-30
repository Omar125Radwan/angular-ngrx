import { createSelector } from '@ngrx/store';
import { PostState } from './post.state';
import { createFeatureSelector } from '@ngrx/store';

const getPostState = createFeatureSelector<PostState>('posts');
export const getPosts = createSelector(getPostState, (state) => {
  return state.posts;
});
