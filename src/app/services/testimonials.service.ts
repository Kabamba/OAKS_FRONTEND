import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TestimonialsService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(environment.apiUrl + '/admin/testimonials/list');
  }

  limit(id) {
    return this.http.get(environment.apiUrl + `/admin/testimonials/limit/${id}`);
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/testimonials/show/${id}`);
  }

  ajouter(formData) {
    return this.http.post(environment.apiUrl + '/admin/testimonials/store',formData);
  }

  editer(formData) {
    return this.http.post(environment.apiUrl + '/admin/testimonials/update',formData);
  }

  delete(id) {
    return this.http.post(environment.apiUrl + '/admin/testimonials/delete',{
      id:id
    });
  }

  searchDate(date){
    return this.http.post(environment.apiUrl + '/admin/testimonials/search',{
      date:date
    });
  }
}
