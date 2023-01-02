import { Post } from 'src/app/models/post.model';
import { props } from '@ngrx/store';
import { createSelector } from '@ngrx/store';
import { PostState } from './post.state';
import { createFeatureSelector } from '@ngrx/store';

export const POST_STATE_NAME = 'posts'
const getPostState = createFeatureSelector<PostState>(POST_STATE_NAME);
export const getPosts = createSelector(getPostState, (state) => {
  return state.posts;
});

export const getPostById = (props: { id: string | null }) =>
createSelector(getPostState, (state) => {
  return state.posts.find((post: Post) => post.id === props.id);
});


/* export const getPostById = createSelector(getPostState, (state: any, props: any) => {
  return state.posts.find((post: Post) => post.id === props.id);
}); */
