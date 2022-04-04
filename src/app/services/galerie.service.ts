import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GalerieService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(environment.apiUrl + '/admin/galeries/list');
  }

  ajouter(formData) {
    return this.http.post(
      environment.apiUrl + '/admin/galeries/store',
      formData
    );
  }

  delete(id) {
    return this.http.post(environment.apiUrl + '/admin/galeries/delete/image', {
      id: id,
    });
  }

  editer(formData) {
    return this.http.post(
      environment.apiUrl + '/admin/galeries/update/image',
      formData
    );
  }
}
