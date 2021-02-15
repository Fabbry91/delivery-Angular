import { Component, OnInit } from '@angular/core';
import { Rubro } from '../../../Interfaces/rubro';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { RubroService } from '../../../Services/rubros/rubro.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.css']
})
export class RubroComponent implements OnInit {
  forma: FormGroup;
  filter: '';
  rubro: Rubro[] = [];
  ruBusqueda: any[] = [];
  cargando = false;

  selectRubro: Rubro = {
    denominacion: '',
  };


  constructor(private rubroSer: RubroService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getRubros();
    this.crearForm();
    this.cargando = true;
  }

  get denoNoValido() {
    return this.forma.get('denominacion').invalid && this.forma.get('denominacion').touched
  }

  crearForm() {
    this.forma = this.fb.group({
      denominacion: ['', Validators.required]
    });
  }

  getRubros() {
    this.rubroSer.getRubro().subscribe((data: any) => {
      this.rubro = data;
      this.cargando = false;
    });
  }

  addRubro() {

    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const rubro = this.forma.value;
    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    let parcial: Observable<any>;

    parcial = this.rubroSer.addRubro(rubro); //.subscribe(res => {console.log(res),this.getRubros(),this.forma.reset();},err => console.error(err));

    parcial.subscribe(resp => {
      Swal.fire({
        title: 'Se actualizo correctamente',
        text: '',
        icon: 'success'
      });
      this.getRubros(),
        this.forma.reset();
    });
  }

  delete(id: string) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Estás seguro que desea borrar`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.rubroSer.deleteRubro(id).subscribe(res => {
          // console.log(res),
          this.getRubros();
        },
          error => console.error(error));
      }
    });
  }

}
