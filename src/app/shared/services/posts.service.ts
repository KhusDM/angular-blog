import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FbCreateResponse, Post } from '../interfaces';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private httpClient: HttpClient) {
  }

  create(post: Post): Observable<Post> {
    return this.httpClient
      .post(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(map((response: FbCreateResponse) => {
        const newPost = {
          ...post,
          id: response.name,
          date: new Date(post.date)
        };
        return newPost;
      }));
  }

  getAll(): Observable<any> {
    return this.httpClient
      .get(`${environment.fbDbUrl}/posts.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object
          .keys(response)
          .map((key) => ({
              ...response[key],
              id: key,
              date: response[key].date
            })
          );
      }));
  }

  remove(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }
}
