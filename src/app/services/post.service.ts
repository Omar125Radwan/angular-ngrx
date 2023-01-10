import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://angularngrx-264df-default-rtdb.firebaseio.com/posts.json')
    .pipe(
      map((data) => {
        const posts: Post[] = [];
        for(let key in data) {
          posts.push({...data[key], id: key});
        }
        return posts;
      })
    )
  }

}
