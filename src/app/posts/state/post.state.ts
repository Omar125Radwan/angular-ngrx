import { EntityState } from "@ngrx/entity";
import { createEntityAdapter } from "@ngrx/entity";
import { Post } from "src/app/models/post.model";

export interface PostState extends EntityState<Post> {}

export const postsAdapter = createEntityAdapter<Post>();

export const initialState: PostState = postsAdapter.getInitialState();

export const postsSelectors = postsAdapter.getSelectors();
