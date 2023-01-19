import { EntityState } from "@ngrx/entity";
import { createEntityAdapter } from "@ngrx/entity";
import { Post } from "src/app/models/post.model";

export interface PostState extends EntityState<Post> {
  count: number;
}

export const postsAdapter = createEntityAdapter<Post>({
  sortComparer: sortByName,
});

export const initialState: PostState = postsAdapter.getInitialState({
  count: 0,
});

export function sortByName(a: Post, b: Post): number {
  const compare = a.title.localeCompare(b.title);
  if(compare > 0) {
    return -1;
  }
  if(compare < 0) {
    return 1;
  }
  return compare;
}

// export const postsSelectors = postsAdapter.getSelectors();
