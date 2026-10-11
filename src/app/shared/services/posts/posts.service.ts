import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient=inject(HttpClient)
  myHeaders:object={
      headers:{
        'AUTHORIZATION':`Bearer ${localStorage.getItem('socialToken')}`
      }

  }
  getAllPosts():Observable<any>{
    return this.httpClient.get(`${environment.baseURL}/posts`,this.myHeaders)
  }

  createPosts(body:any):Observable<any>{
    return this.httpClient.post(`${environment.baseURL}/posts`,body,this.myHeaders)
  }
  getSinglePost(postId:any):Observable<any>{
    return this.httpClient.get(`${environment.baseURL}/posts/${postId}`,this.myHeaders)
  }
  deletePost(postId:any):Observable<any>{
    return this.httpClient.delete(`${environment.baseURL}/posts/${postId}`,this.myHeaders)
  }

}
