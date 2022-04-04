import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SermonsService {

  constructor(private http:HttpClient) { }

  list() {
    return this.http.get(environment.apiUrl + '/admin/sermons/list');
  }

  preachers() {
    return this.http.get(environment.apiUrl + '/admin/sermons/preachers');
  }

  searchByPreacher(preacher){
    return this.http.post(environment.apiUrl + '/admin/sermons/search/preacher',{
      preacher_name:preacher
    });
  }

  limit(id) {
    return this.http.get(environment.apiUrl + `/admin/sermons/limit/${id}`);
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/sermons/show/${id}`);
  }

  ajouter(formData) {
    return this.http.post(environment.apiUrl + '/admin/sermons/store',formData);
  }

  editer(formData) {
    return this.http.post(environment.apiUrl + '/admin/sermons/update',formData);
  }

  delete(id) {
    return this.http.post(environment.apiUrl + '/admin/sermons/delete',{
      id:id
    });
  }

  searchDate(date){
    return this.http.post(environment.apiUrl + '/admin/sermons/search',{
      date:date
    });
  }
}
