import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  // Connect Frontend to Backend

  apiUrl = 'http://localhost:3000/user';

  // GET All Data
  getAllData():Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Create Data
  createData(data: any):Observable<any> {
    console.log(data, 'GOGO');
    return this.http.post(`${this.apiUrl}`, data);
  }

  // Delete Data
  deleteData(id: any):Observable<any> {
    let _sql_id = id;
    return this.http.delete(`${this.apiUrl}/${_sql_id}`);
  }

  // Update Data
  updateData(data: any, id: any):Observable<any> {
    let _sql_id = id;
    return this.http.put(`${this.apiUrl}/${_sql_id}`, data);
  }

  // getSingleData
  getSingleData(id: any):Observable<any> {
    let _sql_id = id;
    return this.http.get(`${this.apiUrl}/${_sql_id}`);
  }
}
