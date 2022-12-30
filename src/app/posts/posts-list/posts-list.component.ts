import { getPosts } from './../state/post.selector';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<Post[] | any>;
  constructor(private sotre: Store<AppState>) { }

  ngOnInit(): void {
    if(this.sotre.select(getPosts)) {
      this.posts$ = this.sotre.select(getPosts);
    }
  }

}
