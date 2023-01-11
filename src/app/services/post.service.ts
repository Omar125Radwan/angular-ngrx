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

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post< {name: string }>(
      `https://angularngrx-264df-default-rtdb.firebaseio.com/posts.json`,
      post
    )
  }

  updatePost(post: Post) {
    const postData = {
      [post.id]: {title: post.title, description: post.description},
    };
    return this.http.patch(
      `https://angularngrx-264df-default-rtdb.firebaseio.com/posts.json`,
      postData
    )
  }

  deletePost(id: string) {
    return this.http.delete(
      `https://angularngrx-264df-default-rtdb.firebaseio.com/posts/${id}.json`,
    )
  }

}
