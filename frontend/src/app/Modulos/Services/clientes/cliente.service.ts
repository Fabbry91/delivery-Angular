import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../../Interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url = 'https://angulardelivery.onrender.com/cliente/';

  constructor(private http: HttpClient) { }

  getClient(id?: string) {
    return this.http.get(this.url + id);
  }

  getClients() {
    return this.http.get(this.url);
  }

  getClientEmail(email: string) {
    return this.http.get(this.url + 'byemail/' + email);
  }

  getClientByQuery(query: any) {
    return this.http.post<Cliente[]>(this.url + 'byquery/', query);
  }

  addCliente(client: any) {
    return this.http.post(this.url, client);
  }

  updateCliente(id: string, client: any) {
    return this.http.put(this.url + id, client);
  }

  deleteCliente(id: string) {
    return this.http.delete(this.url + id);
  }
}
