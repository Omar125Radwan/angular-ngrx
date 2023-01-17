import { PostsEffects } from './state/post.effects';
import { EffectsModule } from '@ngrx/effects';
import { PostsListComponent } from './posts-list/posts-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { AddPostComponent } from './add-post/add-post.component';
import { EdtiPostComponent } from './edti-post/edti-post.component';
import { postsReducer } from './state/post.reducer';
import { StoreModule } from '@ngrx/store';
import { POST_STATE_NAME } from './state/post.selector';
import { SinglePostComponent } from './single-post/single-post.component';


@NgModule({
  declarations: [
    PostsListComponent,
    AddPostComponent,
    EdtiPostComponent,
    SinglePostComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(POST_STATE_NAME, postsReducer),
    EffectsModule.forFeature([PostsEffects]),
  ],
})
export class PostsModule { }
