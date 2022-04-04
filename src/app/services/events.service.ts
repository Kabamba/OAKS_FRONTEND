import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http:HttpClient) { }

  list() {
    return this.http.get(environment.apiUrl + '/admin/events/list');
  }

  limit(id) {
    return this.http.get(environment.apiUrl + `/admin/events/limit/${id}`);
  }

  show(id) {
    return this.http.get(environment.apiUrl + `/admin/events/show/${id}`);
  }
  
  ajouter(formData) {
    return this.http.post(environment.apiUrl + '/admin/events/store',formData);
  }

  editer(formData) {
    return this.http.post(environment.apiUrl + '/admin/events/update',formData);
  }

  delete(id) {
    return this.http.post(environment.apiUrl + '/admin/events/delete',{
      id:id
    });
  }

  searchDate(date){
    return this.http.post(environment.apiUrl + '/admin/events/search',{
      date:date
    });
  }

}
