import { RouterStateUrl } from './../../store/router/custom-serializer';
import { getCurrentRoute } from './../../store/router/router.selector';
import { createSelector } from '@ngrx/store';
import { PostState } from './post.state';
import { createFeatureSelector } from '@ngrx/store';

export const POST_STATE_NAME = 'posts'
const getPostState = createFeatureSelector<PostState>(POST_STATE_NAME);
export const getPosts = createSelector(getPostState, (state) => {
  return state.posts;
});

//* Best Practice
export const getPostById = createSelector(
  getPosts,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => {
    return posts.find((post) => post.id === route.params['id']);
  }
)

//? Good Solution
/* export const getPostById = (props: { id: string | null }) =>
createSelector(getPostState, (state) => {
  return state.posts.find((post: Post) => post.id === props.id);
}); */

//!deprecated Solution
/* export const getPostById = createSelector(getPostState, (state: any, props: any) => {
  return state.posts.find((post: Post) => post.id === props.id);
}); */
