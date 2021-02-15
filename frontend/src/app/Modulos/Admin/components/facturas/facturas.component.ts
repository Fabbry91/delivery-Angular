import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Factura } from 'src/app/Modulos/Interfaces/factura';
import { FacturaService } from '../../../Services/factura/factura.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  @ViewChild('table') table: ElementRef;

  fact: Factura[] = [];
  arreglo: any[] = [];
  client: any;
  cargando = false;

  p: number = 1;
  expandedI: number = -1;


  constructor(private factraS: FacturaService) {
  }

  ngOnInit(): void {
    this.getFacturas();
    this.cargando = true;
    this.getTotalFact();
  }

  getFacturas() {
    this.factraS.getFacturas().subscribe((dato: any) => {
      this.fact = dato;
      this.cargando = false;
      console.log('facturas', this.fact);
    });
  }
  getTotalFact() {
    const a = this.fact.map(t => t.total).reduce((a, b) => a + b, 0);
    // console.log('esto es', a);
    return a;
  }
  getDescuento() {
    const b = this.fact.map(t => t.montoDescuento).reduce((a, b) => a + b, 0);
    //console.log('esto es', b);
    return b;
  }

  showClient(cliente: Factura) {
    this.client = cliente;
    this.arreglo = cliente.detalles;
    console.log(this.arreglo);
    console.log(cliente);
  }

 /* downloadPDF(): void {
    let DATA = this.table.nativeElement;

    let doc = new jsPDF('p', 'pt', 'a4');
    doc.text(200, 10, '');
    doc.setFont('times');
    doc.setFontType('bold');
    doc.setFontSize(20);
    doc.text(250, 20, `El Buen Sabor`);
    doc.setFontSize(12);
    doc.text(500, 20, `Fecha:  ${this.client.fecha}`);
    doc.setFont('arial');
    doc.setFontSize(12);
    doc.text(240, 30, `Ciudad de Mendoza  CP:5530`);
    doc.setFontSize(10);
    doc.text(270, 40, `Telefono:(261)4251095`);
    doc.setFontSize(12);
    doc.text(100, 55, `Cliente: ${this.client.pedido.cliente.apellido} ${this.client.pedido.cliente.nombre}`);
    doc.text(100, 68, `Email: ${this.client.pedido.cliente.email}`);
    doc.text(100, 82, `Telefono: ${this.client.pedido.cliente.telefono}`);

    doc.text(400, 55, `Domicilio cliente:`);
    doc.text(400, 68, `Calle: ${this.client.pedido.cliente.domicilio.calle} ${this.client.pedido.cliente.domicilio.numero}`);
    doc.text(400, 82, `Localidad: ${this.client.pedido.cliente.domicilio.localidad}`);

    doc.setFontSize(10);
    doc.text(100, 98, `Pedido N°: ${this.client.pedido.numero}`);

    let handleElement = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    doc.setFontType('bold');
    doc.setFontSize(10);
    doc.fromHTML(DATA.innerHTML, 100, 100, {
      'width': 500,
      'elementHandlers': handleElement
    });

    doc.output('dataurlnewwindow');
  }*/

}
