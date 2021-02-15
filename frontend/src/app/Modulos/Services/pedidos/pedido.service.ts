import { Injectable } from '@angular/core';
import { Pedido } from '../../Interfaces/pedido';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  url = 'https://delivery-fabbry-mean.herokuapp.com/pedido/';

  constructor(private http: HttpClient) { }

  getPedidos() {
    return this.http.get(this.url);
  }

  getOnePedido(id: string) {
    return this.http.get(this.url + id);
  }

  getPedidoByQuery(query: any) {
    return this.http.post<Pedido[]>(this.url + 'byquery', query);
  }

  addPedido(pedido: Pedido) {
    return this.http.post(this.url, pedido);
  }

  updatePedido(id: string, pedido: any) {
    return this.http.put(this.url + id, pedido);
  }

  deletePedido(id: string) {
    return this.http.delete(this.url + id);
  }


}
