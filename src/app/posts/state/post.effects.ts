import { Post } from './../../models/post.model';
import { mergeMap, map, switchMap, filter } from 'rxjs';
import { loadPosts, loadPostsSuccess, addPostSuccess, addPost, updatePost, updatePostSuccess, deletePost, deletePostSuccess } from './post.action';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { PostService } from './../../services/post.service';
import { Injectable } from '@angular/core';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
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

  getSinglePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/posts/details');
      }),
      map((r: any) => {
          return r.payload.routerState['params']['id'];
      }),
      switchMap((id) => {
        return this.postsService.getPostById(id)
        .pipe(map((post) => {
          const postData = [{...post, id}];
          return loadPostsSuccess({posts: postData})
        }));
      })
    );
  })

}
