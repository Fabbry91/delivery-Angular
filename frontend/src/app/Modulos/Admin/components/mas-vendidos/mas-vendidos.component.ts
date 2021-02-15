import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ArticulosService } from '../../../Services/articulos/articulos.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-mas-vendidos',
  templateUrl:'./mas-vendidos.component.html',
  styleUrls: ['./mas-vendidos.component.css']
})
export class MasVendidosComponent implements OnInit {
  @ViewChild('table') table: ElementRef;
  vendidos: any[] = [];
  p: number = 1;
  expandedI: number = -1;
  cargando = false;
  constructor(private articuloS: ArticulosService) { }

  ngOnInit(): void {
    this.masVendidos();
    this.cargando = true;
  }
  masVendidos() {
    this.articuloS.getTotal().subscribe((data: any[]) => {
      if (data) {
        this.vendidos = data;
        console.log(this.vendidos);
        this.cargando = false;
      }
    });
  }

 /* downloadPDF(): void {
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

    doc.setFontSize(20);
    doc.text(100, 49, `Productos más vendidos`);

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
