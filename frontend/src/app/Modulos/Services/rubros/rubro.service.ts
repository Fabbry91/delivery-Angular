import { Injectable } from '@angular/core';
import { Rubro } from '../../Interfaces/rubro';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RubroService {

  url = 'https://angulardelivery.onrender.com/rubro';

  constructor(private http: HttpClient) { }
  rubros: Rubro[] = [];

  getRubro() {
    return this.http.get<Rubro[]>(this.url);
  }

  addRubro(data: Rubro) {
    return this.http.post(this.url, data);
  }

  deleteRubro(id: string) {
    return this.http.delete(this.url + '/' + id);
  }

}
