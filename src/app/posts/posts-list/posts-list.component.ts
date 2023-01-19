import { loadPosts } from './../state/post.action';
import { Router } from '@angular/router';
import { getCount, getPosts } from './../state/post.selector';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { Post } from 'src/app/models/post.model';
import { deletePost } from '../state/post.action';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<Post[] | any>;
  constructor(
    private sotre: Store<AppState>,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(this.sotre.select(getPosts)) {
      this.posts$ = this.sotre.select(getPosts);
    }
    this.sotre.dispatch(loadPosts());
  }
  onDeletePost(id: string) {
    if(confirm("Are you sure?")) {
      console.log('You deleted the post ' + id);
      this.sotre.dispatch(deletePost({id}));
      this.router.navigate(['posts']);
    }
  }
}
