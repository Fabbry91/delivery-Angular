import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ArticulosService } from 'src/app/Modulos/Services/articulos/articulos.service';
import { Manofacturado } from '../../../Interfaces/manofacturado';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-articulo-mano',
  templateUrl: './articulo-mano.component.html',
  styleUrls: ['./articulo-mano.component.css']
})
export class ArticuloManoComponent implements OnInit {
  @ViewChild('table') table: ElementRef;

  forma1: FormGroup;
  forma2: FormGroup;

  data$: any;
  dataFact: any;
  keyword = 'denominacion';
  keywordFac = 'nombre';

  manoFact: Manofacturado[] = [];
  detallesArticulos: any[] = [];
  manofacturado: Manofacturado;

  Edit = false;

  p: number = 1;
  expandedI: number = -1;
  cargando = false;

  constructor(private articuloS: ArticulosService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getArticulo();
    this.cargando = true;
    this.crearFormulario();
    this.formDetalle();
    this.getArticuloManofac();
  }

  crearFormulario() {
    this.forma1 = this.fb.group({
      _id: [],
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      tiempoDeCoccion: [0, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]]
    });
  }

  formDetalle() {
    this.forma2 = this.fb.group({
      cantidad: ['', [Validators.required, Validators.min(1)]],
      articuloData: [this.data$, Validators.required]
    });
  }

  getArticulo() {
    this.articuloS.getArticulos().subscribe(res => {
      this.data$ = res;
      console.log(this.data$);
    });
  }

  getArticuloManofac() {
    this.articuloS.getArticuloManofacturado()
      .subscribe((data: any) => {
        console.log(data);
        this.manoFact = data;
        this.dataFact = data;
        this.cargando = false;
      });
  }

  deleteMano(id: string) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Estás seguro que desea borrar`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.articuloS.deleteArticuloManofacturado(id).subscribe(
          res => {
            console.log(res);
            this.getArticuloManofac();
          });
      }
    });
  }

  addDetalle() {
    console.log(this.forma2);
    const detalle = {
      cantidad: this.forma2.controls.cantidad.value,
      articulo: this.forma2.controls.articuloData.value
    };
    this.detallesArticulos.push(detalle);
    this.forma2.reset();
  }

  deleteDetalle(id: string) {
    this.detallesArticulos = this.detallesArticulos.filter(
      det => det.articulo._id !== id
    );
  }

  guardar() {

    const manoF = {
      nombre: this.forma1.controls.nombre.value,
      precio: this.forma1.controls.precio.value,
      tiempoDeCoccion: this.forma1.controls.tiempoDeCoccion.value,
      detalle: this.detallesArticulos.map(data => {
        return { cantidad: data.cantidad, articulo: data.articulo };
      })
    };
    if (this.forma1.invalid) {
      return Object.values(this.forma1.controls).forEach(control => {

        control.markAsTouched();
      });
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.articuloS.addArticuloManofacturado(manoF).subscribe((data: any) => {
      Swal.fire({
        title: this.manofacturado.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success',
        allowOutsideClick: false
      });
      // console.log(manoF);
    });
    this.detallesArticulos = [];
    location.reload();
  }

  edit(id: string) {
    const manoF = {
      _id: this.forma1.controls._id.value,
      nombre: this.forma1.controls.nombre.value,
      precio: this.forma1.controls.precio.value,
      tiempoDeCoccion: this.forma1.controls.tiempoDeCoccion.value,
      detalle: this.detallesArticulos.map(data => {
        return { cantidad: data.cantidad, articulo: data.articulo };
      })
    };
    if (this.forma1.invalid) {
      return Object.values(this.forma1.controls).forEach(control => {

        control.markAsTouched();
      });
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    id = this.forma1.controls._id.value,

      this.articuloS.actualizarManofacturado(id, manoF).subscribe((data: any) => {
        this.detallesArticulos = [];
        Swal.fire({
          title: this.manofacturado.nombre,
          text: 'Se actualizo correctamente',
          icon: 'success',
          allowOutsideClick: false
        });
        console.log(manoF);
      });
    location.reload();
  }

  showModal(manofac: Manofacturado) {
    console.log(manofac);
    this.forma1.controls._id.setValue(manofac._id);
    this.forma1.controls.nombre.setValue(manofac.nombre);
    this.forma1.controls.precio.setValue(manofac.precio);
    this.forma1.controls.tiempoDeCoccion.setValue(manofac.tiempoDeCoccion);
    this.detallesArticulos = manofac.detalle;
    this.Edit = true;
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
  }
*/
  //Validaciones form.

  get nombreNoValido() {
    return this.forma1.get('nombre').invalid && this.forma1.get('nombre').touched
  }
  get precioNoValido() {
    return this.forma1.get('precio').invalid && this.forma1.get('precio').touched
  }

  get tiempoNoValido() {
    return this.forma1.get('tiempoDeCoccion').invalid && this.forma1.get('tiempoDeCoccion').touched
  }

  get cantidadNoValido() {
    return this.forma2.get('cantidad').invalid && this.forma2.get('cantidad').touched
  }
  get articuloNoValido() {
    return this.forma2.get('articuloData').invalid && this.forma2.get('articuloData').touched
  }
}
