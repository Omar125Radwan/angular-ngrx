import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { AddPostComponent } from './add-post/add-post.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
  ],
})
export class PostsModule { }
