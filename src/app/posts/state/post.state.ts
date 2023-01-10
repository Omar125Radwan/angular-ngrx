import { Post } from "src/app/models/post.model";

export interface PostState {
  posts: Post[];
}

export const initialState: PostState = {
  posts: [],
}
