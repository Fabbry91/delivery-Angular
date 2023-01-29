import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Articulo } from '../../Interfaces/articulo';
import { Manofacturado } from '../../Interfaces/manofacturado';
import { map } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';



@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  url = 'https://angulardelivery.onrender.com/';
  constructor(private http: HttpClient) { }

  addArticulo(articulo: Articulo) {
    return this.http.post(`${this.url}articulo`, articulo);
  }

  getArticulos() {
    return this.http.get<Articulo[]>(`${this.url}articulo`);
  }

  getArticulo(id: string) {
    return this.http.get(`${this.url}articulo/${id}`);
  }

  getTotal() {
    return this.http.get(`${this.url}totalsales`);
  }

  decreaseStock(queries: any) {
    return this.http.post(`${this.url}articulo/decreasestock/`, queries);
  }

  deleteArticulo(_id: string) {
    return this.http.delete(`${this.url}articulo/${_id}`);
  }

  updateArticulo(id: string, articulo: Articulo) {
    return this.http.put(`${this.url}articulo/` + id, articulo);
  }
  //---------------------------------------------------------------------//

  // Manofacturado

  getArticuloManofacturado() {
    return this.http.get(`${this.url}manofacturado`);
  }

  getOneManofacturado(id: string) {
    return this.http.get(`${this.url}manofacturado/${id}`);
  }

  addArticuloManofacturado(artManofacturado: Manofacturado) {
    return this.http.post(`${this.url}manofacturado`, artManofacturado);
  }

  deleteArticuloManofacturado(id: string) {
    return this.http.delete(`${this.url}manofacturado/` + id);
  }


  actualizarManofacturado(id: string, artManofacturado: Manofacturado) {
    return this.http.put(`${this.url}manofacturado/` + id, artManofacturado);
  }
}
