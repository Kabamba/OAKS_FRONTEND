import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  constructor(private http:HttpClient) { }

  totEvent() {
    return this.http.get(environment.apiUrl + '/admin/stats/event');
  }

  totGalerie() {
    return this.http.get(environment.apiUrl + '/admin/stats/galerie');
  }

  totSermon() {
    return this.http.get(environment.apiUrl + '/admin/stats/sermon');
  }

  totMinistry() {
    return this.http.get(environment.apiUrl + '/admin/stats/ministries');
  }

}
