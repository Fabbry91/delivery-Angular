import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Factura } from '../../Interfaces/factura';
@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  url = 'https://delivery-fabbry-mean.herokuapp.com/factura/';

  constructor(private http: HttpClient) { }

  getFactura(id: string) {
    return this.http.get(this.url + id);
  }

  getFacturas() {
    return this.http.get(this.url);
  }

  getByQuery(query: any) {
    return this.http.post<Factura[]>(
      this.url + "byquery/",
      query
    );
  }

  addFactura(factura: Factura) {
    return this.http.post<Factura>(this.url, factura);
  }
}
