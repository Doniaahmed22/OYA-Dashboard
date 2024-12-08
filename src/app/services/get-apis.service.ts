import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetApisService {

  constructor(private _HttpClient: HttpClient) { }

  // getAllProducts():Observable<any>{
  //   return this._HttpClient.get(`https://dummyjson.com/products`);
  // }

  getAllProducts(limit: number, skip: number): Observable<any> {
    return this._HttpClient.get<any>(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  }

  getProducts(): Observable<any> {
    return this._HttpClient.get<any>(`https://dummyjson.com/products`);
  }

  searchProduct(searchWord: string): Observable<any> {
    return this._HttpClient.get(`https://dummyjson.com/products/search?q=${searchWord}`)
  }

  filterProducts(filters: any): Observable<any> {
    const params = new HttpParams({ fromObject: filters });
    return this._HttpClient.get('https://dummyjson.com/products', { params });
  }





  addNewProduct(product: {}): Observable<any> {
    return this._HttpClient.post(`https://dummyjson.com/products/add`, product);
  }

  updateProduct(id: number, product: {}): Observable<any> {
    return this._HttpClient.put(`https://dummyjson.com/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this._HttpClient.delete(`https://dummyjson.com/products/${id}`);
  }

  getSpecificProduct(id: number): Observable<any> {
    return this._HttpClient.get(`https://dummyjson.com/products/${id}`);
  }

  getCategories(): Observable<any> {
    return this._HttpClient.get(`https://dummyjson.com/products/categories`);
  }

  getProductUnderCategories(url:string):Observable<any>{
    return this._HttpClient.get(url);
  }

  getAllUsers(limit:number,skip:number):Observable<any>{
    return this._HttpClient.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
  }

  getUsers():Observable<any>{
    return this._HttpClient.get(`https://dummyjson.com/users`);
  }

  searchUser(searchWord: string): Observable<any> {
    return this._HttpClient.get(`https://dummyjson.com/users/search?q=${searchWord}`)
  }

  filterUsers(key:any , value:any):Observable<any>{
    return this._HttpClient.get(`https://dummyjson.com/users/filter?key=${key}&value=${value}`)
  }

  addUser(user:{}):Observable<any>{
    return this._HttpClient.post(`https://dummyjson.com/users/add`, user)
  }

  editUser(userId:number,user:{}):Observable<any>{
    return this._HttpClient.put(`https://dummyjson.com/users/${userId}`, user)
  }

  deleteUser(userId:number):Observable<any>{
    return this._HttpClient.delete(`https://dummyjson.com/users/${userId}`)
  }

  getUserById(id:number):Observable<any>{
    return this._HttpClient.get(`https://dummyjson.com/users/${id}`);
  }

  getCarts():Observable<any>{
    return this._HttpClient.get(`https://dummyjson.com/carts`);
  }

  getUserCart(id:number):Observable<any>{
    return this._HttpClient.get(`https://dummyjson.com/carts/user/${id}`)
  }

  getAllComments():Observable<any>{
    return this._HttpClient.get(`https://dummyjson.com/comments`)
  }

  login(data:any):Observable<any>{
    return this._HttpClient.post(`https://dummyjson.com/auth/login`,data);
  }
}
