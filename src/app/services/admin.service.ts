import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  list() {
    return this.http.get(environment.apiUrl + '/admin/admins/list');
  }

  ajouter(name,email,password) {
    return this.http.post(environment.apiUrl + '/admin/admins/store', {
      name: name,
      email: email,
      password: password,
    });
  }

  editer(id, name, email,password) {
    return this.http.post(environment.apiUrl + '/admin/admins/update', {
      id: id,
      name: name,
      email: email,
      password: password,
    });
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/admins/show/${id}`);
  }

  delete(id) {
    return this.http.post(environment.apiUrl + `/admin/admins/delete`, {
      id: id,
    });
  }
}
