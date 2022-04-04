import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MinistriesService {

  constructor(private http:HttpClient) { }

  list() {
    return this.http.get(environment.apiUrl + '/admin/ministries/list');
  }

  limit(id) {
    return this.http.get(environment.apiUrl + `/admin/ministries/limit/${id}`);
  }
  
  show(id) {
    return this.http.get(environment.apiUrl + `/admin/ministries/show/${id}`);
  }

  ajouter(formData) {
    return this.http.post(environment.apiUrl + '/admin/ministries/store',formData);
  }

  editer(formData) {
    return this.http.post(environment.apiUrl + '/admin/ministries/update',formData);
  }

  delete(id) {
    return this.http.post(environment.apiUrl + '/admin/ministries/delete',{
      id:id
    });
  }
}
