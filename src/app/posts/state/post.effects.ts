import { Post } from './../../models/post.model';
import { mergeMap, of, map } from 'rxjs';
import { loadPosts, loadPostsSuccess } from './post.action';
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
  )
}
