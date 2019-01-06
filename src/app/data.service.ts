import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
 })
};

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  getUsers(){
  	return this.http.get('http://localhost:1234/api/items')
  }

  getUser(userId){
  	return this.http.get('http://localhost:1234/api/items/' + userId)
  }

  getPosts(){
  	return this.http.get('https://jsonplaceholder.typicode.com/posts')
  }
  getPost(postId){
    return this.http.get("https://jsonplaceholder.typicode.com/posts/" + postId)
  }
  postMessage(stuff){
    return this.http.post(`http://localhost:1234/api/message/`, stuff, httpOptions);
  }

}
