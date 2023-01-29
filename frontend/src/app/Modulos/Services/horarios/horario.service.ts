import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Horario } from '../../Interfaces/horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  url = 'https://angulardelivery.onrender.com/apertura';
  constructor(private http: HttpClient) { }

  getHorario(id?: string) {
    id = id ? id : '';
    return this.http.get(this.url + id);
  }
  updateHorario(id: string, dia: any) {
    return this.http.put(`${this.url}/` + id, dia);
  }

  /*getHorarioByQuery(query: any) {
    return this.http
      .post<Horario>(this.url + 'byquery/', query)
      .toPromise()
      .then(data => {
        if (data) {
          return data;
        }
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }*/

  addHorarios(horario: Horario) {
    return this.http.post(`${this.url}`, horario);
  }
}
