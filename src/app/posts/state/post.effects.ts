import { Post } from './../../models/post.model';
import { mergeMap, map, switchMap, filter, withLatestFrom, of } from 'rxjs';
import { loadPosts, loadPostsSuccess, addPostSuccess, addPost, updatePost, updatePostSuccess, deletePost, deletePostSuccess } from './post.action';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { PostService } from './../../services/post.service';
import { Injectable } from '@angular/core';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Update } from '@ngrx/entity/src';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getPosts } from './post.selector';
import { dummyAction } from 'src/app/auth/state/auth.actions';
@Injectable()
export class PostsEffects {
  constructor(private action$: Actions, private postsService: PostService, private sotre: Store<AppState>) {
  }

  loadPosts$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(loadPosts),
        withLatestFrom(this.sotre.select(getPosts)),
        mergeMap(([action, posts]) => {
          // if(!posts.length) {
          if(!posts.length || posts.length === 1) {
            return this.postsService.getPosts()
            .pipe(
              map((posts: Post[]) => {
                return loadPostsSuccess({ posts })
              })
            )
          }
          return of(dummyAction());
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
                  const updatePost: Update<Post> = {
                    id: action.post.id,
                    changes: {
                      ...action.post,
                    }
                  }
                  return updatePostSuccess({ post: updatePost })
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
      withLatestFrom(this.sotre.select(getPosts)),
      switchMap(([id, posts]) => {
        if (!posts.length) {
          // return this.postsService.getPosts()
          return this.postsService.getPostById(id)
            .pipe(map((post) => {
              const postData = [{...post, id}];
              // return loadPostsSuccess({ posts: post })
              return loadPostsSuccess({ posts: postData })
            }));
        }
        return of(dummyAction());
      })
    );
  })

}
