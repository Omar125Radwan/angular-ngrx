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


@NgModule({
  declarations: [
    PostsListComponent,
    AddPostComponent,
    EdtiPostComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(POST_STATE_NAME, postsReducer),
  ],
})
export class PostsModule { }
