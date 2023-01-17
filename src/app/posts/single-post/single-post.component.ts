import { getPostById } from './../state/post.selector';
import { AppState } from './../../store/app.state';
import { Store } from '@ngrx/store';
import { Post } from './../../models/post.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  post!: Observable<any>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.post = this.store.select(getPostById);
  }

}
