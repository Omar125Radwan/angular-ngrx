import { Post } from "src/app/models/post.model";

export interface PostState {
  posts: Post[];
}

export const initialState: PostState = {
  posts: [
    {id: '1', title: 'Simple Title 1', description: 'Simple describtion 1'},
    {id: '2', title: 'Simple Title 2', description: 'Simple describtion 2'},
  ]
}
