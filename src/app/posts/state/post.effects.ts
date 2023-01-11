import { Post } from './../../models/post.model';
import { mergeMap, of, map, switchMap } from 'rxjs';
import { loadPosts, loadPostsSuccess, addPostSuccess, addPost, updatePost, updatePostSuccess, deletePost, deletePostSuccess } from './post.action';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { PostService } from './../../services/post.service';
import { Injectable } from '@angular/core';
@Injectable()
export class PostsEffects {
  constructor(private action$: Actions, private postsService: PostService) {
  }

  loadPosts$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(loadPosts),
        mergeMap((action) => {
          return this.postsService.getPosts()
            .pipe(
              map((posts: Post[]) => {
                return loadPostsSuccess({ posts })
              })
            )
        })
      )
    }
  );

  addPost$ = createEffect(
    () => {
      return this.action$
        .pipe(
          ofType(addPost),
          mergeMap(action => {
            return this.postsService.addPost(action.post)
              .pipe(
                map((data) => {
                  const post = { ...action.post, id: data.name };
                  return addPostSuccess({ post });
                })
              );
          })
        );
    },
  )

  updatePost$ = createEffect(
    () => {
      return this.action$
        .pipe(
          ofType(updatePost),
          switchMap((action) => {
            return this.postsService.updatePost(action.post)
            .pipe(
              map((data) => {
                return updatePostSuccess({ post: action.post })
              })
            )
          })
        );
    },
  )

  deletePost$ = createEffect(
    () => {
      return this.action$
        .pipe(
          ofType(deletePost),
          switchMap((action) => {
            return this.postsService.deletePost(action.id)
            .pipe(
              map((data) => {
                return deletePostSuccess({ id: action.id })
              })
            )
          })
        );
    },
  )

}
