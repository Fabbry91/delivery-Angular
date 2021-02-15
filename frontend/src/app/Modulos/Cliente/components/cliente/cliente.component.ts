import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/Modulos/Interfaces/cliente';
import { ClienteService } from 'src/app/Modulos/Services/clientes/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  @Input() cliente: Cliente = null;

  forma: FormGroup;


  constructor(private fb: FormBuilder, private clienteSer: ClienteService) { }

  ngOnInit(): void {
    this.crearFormulario();
    console.log('cliente comp', this.cliente);
    this.defect();
  }

  get emailNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }
  get passwordNoValido() {
    return this.forma.get('pass').invalid && this.forma.get('pass').touched
  }

  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }
  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get telNoValido() {
    return this.forma.get('telefono').invalid && this.forma.get('telefono').touched
  }
  get calleNoValido() {
    return this.forma.get('domicilio.calle').invalid && this.forma.get('domicilio.calle').touched
  }
  get localNoValido() {
    return this.forma.get('domicilio.localidad').invalid && this.forma.get('domicilio.localidad').touched
  }



  crearFormulario() {

    this.forma = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      apellido: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      telefono: ['', Validators.required],
      domicilio: this.fb.group({
        calle: ['', Validators.required],
        numero: [''],
        localidad: ['', Validators.required]
      })
    });

  }

  guardar() {
    //console.log(this.forma);

    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    const clientForm = this.forma.value;

    console.log(' la concha', clientForm);
    try {

      this.clienteSer.updateCliente(this.cliente._id, clientForm).subscribe(
        data => {
          console.log(data);
        }
      );
    } catch (error) { console.log(error); }
  }

  defect() {
    this.forma.setValue({
      email: this.cliente.email,
      apellido: this.cliente.apellido,
      nombre: this.cliente.nombre,
      telefono: this.cliente.telefono,
      domicilio: {
        calle: this.cliente.domicilio.calle,
        numero: this.cliente.domicilio.numero,
        localidad: this.cliente.domicilio.localidad
      }
    });
  }

}
