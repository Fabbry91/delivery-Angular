import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ArticulosService } from '../../../Services/articulos/articulos.service';
import { Articulo } from '../../../Interfaces/articulo';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {
  @ViewChild('table') table: ElementRef;
  constructor(private articuloS: ArticulosService) { }

  filterProducto = '';
  articulos: Articulo[] = [];
  stock: Articulo[] = [];
  p: number = 1;
  cargando = false;
  error: boolean;
  mensaje: string;

  ngOnInit() {
    this.getArticulos();
    this.cargando = true;
    this.error = false;
  }

  getArticulos() {
    try {
      this.articuloS.getArticulos().subscribe((data: any) => {
        this.articulos = data;
        this.cargando = false;
        console.log(this.articulos);

        for (let a of this.articulos) {
          if (a.stockActual <= 50) {
            this.stock.push(a);
          }
        }
        return this.stock;
      });
    } catch (error) {
      console.error(error);
    }
  }

  deleteArticulo(articulo: Articulo) {
    try {
      Swal.fire({
        title: '¿Está seguro?',
        text: `Estás seguro que desea borrar a ${articulo.denominacion}`,
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true
      }).then(resp => {
        if (resp.value) {
          this.articuloS.deleteArticulo(articulo._id).subscribe((data) => {
            this.getArticulos();
          }, (err) => {
            this.error = true;
            if (err && err.status === 403) {
              this.mensaje = 'No se puede eliminar!. Este articulo ya fue utlizado para un manofacturado o en un pedido';

            } else {
              this.mensaje = 'Hubo un error inesperado intente nuevamente';
            }
            console.log(err);
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  /*downloadPDF(): void {
    let DATA = this.table.nativeElement;

    let doc = new jsPDF('l', 'pt', 'a4');
    doc.text(300, 10, '');
    doc.setFont('times');
    doc.setFontType('bold');
    doc.setFontSize(20);
    doc.text(350, 20, `El Buen Sabor`);
    doc.setFont('arial');
    doc.setFontSize(12);
    doc.text(340, 30, `Ciudad de Mendoza  CP:5530`);
    doc.setFontSize(10);
    doc.text(370, 40, `Telefono:(261)4251095`);

    let handleElement = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    doc.setFontType('bold');
    doc.setFontSize(10);
    doc.fromHTML(DATA.innerHTML, 100, 50, {
      'width': 500,
      'elementHandlers': handleElement
    });

    doc.output('dataurlnewwindow');
  }*/
}
