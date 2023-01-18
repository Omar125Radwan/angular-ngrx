import { EntityState } from "@ngrx/entity";
import { createEntityAdapter } from "@ngrx/entity/src";
import { Post } from "src/app/models/post.model";

export interface PostState extends EntityState<Post> {}

export const postsAdapter = createEntityAdapter<Post>();

export const initialState: PostState = postsAdapter.getInitialState();
