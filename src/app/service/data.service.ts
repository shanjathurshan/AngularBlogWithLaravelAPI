import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private loggedInStatus = false;

  constructor(private httpClient: HttpClient) {}

  getData() {
    return this.httpClient.get('http://localhost:8000/api/products/');
  }

  insertData(data){
    return this.httpClient.post('http://localhost:8000/api/products/', data);
  }

  deleteData(id){
    return this.httpClient.delete('http://localhost:8000/api/products/'+id);
  }

  getProductById(id){
    return this.httpClient.get('http://localhost:8000/api/products/'+id);
  }

  updateProduct(id, data){
    return this.httpClient.put('http://localhost:8000/api/products/'+id, data);
  }

  serchProduct(name){
    return this.httpClient.get('http://localhost:8000/api/products/search/'+name);
  }

  // user details

  getUserData() {
    return this.httpClient.get('http://localhost:8000/api/users/');
  }
  deleteUserData(id){
    return this.httpClient.delete('http://localhost:8000/api/users/'+id);
  }
  getUserDetails(formValue){
    return this.httpClient.post('http://localhost:8000/api/login', formValue);
  }
  registerUserDetails(formValue){
    return this.httpClient.post('http://localhost:8000/api/register', formValue);
  }
  returnUserData(id) {
    return this.httpClient.get('http://localhost:8000/api/getById/'+ id);
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  setToken(token:  string):  void {
    return  localStorage.setItem('token', token );
  }
  setUser(user:  string):  void {
    return  localStorage.setItem('user', user );
  }

  getToken():  string {
    return  localStorage.getItem('token');
  }
  getUser():  string {
    return  localStorage.getItem('user');
  }

  get isLoggedIn() {
    if(this.getToken() != null){
      this.setLoggedIn(true);
      return this.loggedInStatus;
    }
    return this.loggedInStatus
  }


}
