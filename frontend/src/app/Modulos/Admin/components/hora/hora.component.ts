import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../../../Services/horarios/horario.service';
import { Horario } from '../../../Interfaces/horario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hora',
  templateUrl: './hora.component.html',
  styleUrls: ['./hora.component.css']
})
export class HoraComponent implements OnInit {

  forma: FormGroup;
  days: string[] = ['Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado'];
  horarioSermanal: Horario[] = [];
  horario: Horario;

  constructor(private horaS: HorarioService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getHorarios();
    this.createForm();
  }

  createForm() {
    this.forma = this.fb.group({
      _id: [],
      nrodia: ['', Validators.required],
      apertura: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$')]],
      cierre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$')]],
      especial: []
    });
  }

  getHorarios() {
    this.horaS.getHorario('').subscribe((data: Horario[]) => {
      this.horarioSermanal = data;
      console.log(this.horarioSermanal);
    });
  }

  guardar() {

    const hora = {
      _id: this.forma.controls._id.value,
      nrodia: this.forma.controls.nrodia.value,
      apertura: this.forma.controls.apertura.value,
      cierre: this.forma.controls.cierre.value,
    };
    console.log(hora);
    this.horario = hora;

    try {
      if (this.forma.invalid) {
        return Object.values(this.forma.controls).forEach(control => {
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

      if (hora._id == null) {
        this.horaS.addHorarios(hora).subscribe((data: any) => {
          this.horario = data;
          this.getHorarios();
          this.reset();
          console.log(this.horario);
        });
      } else {
        this.horaS.updateHorario(hora._id, hora).subscribe((data: any) => {
          console.log(this.horario);
          this.getHorarios();
          this.reset();
        });
      }
    } catch (error) { }


  }

  show(dia: Horario) {
    console.log(this.horario);
    this.forma.controls._id.setValue(dia._id);
    this.forma.controls.nrodia.setValue(dia.nrodia);
    this.forma.controls.apertura.setValue(dia.apertura);
    this.forma.controls.cierre.setValue(dia.cierre);
  }
  reset() {
    this.forma.reset();
  }

  get diaNoValido() {
    return this.forma.get('nrodia').invalid && this.forma.get('nrodia').touched
  }
  get appValido() {
    return this.forma.get('apertura').invalid && this.forma.get('apertura').touched
  }
  get cieNoValido() {
    return this.forma.get('cierre').invalid && this.forma.get('cierre').touched
  }
}
