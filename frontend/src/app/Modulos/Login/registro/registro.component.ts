import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../Services/validators.service';
import { AuthService } from '../../Services/auth.service';
import { Cliente } from '../../Interfaces/cliente';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { ClienteService } from '../../Services/clientes/cliente.service';
import { UserService } from '../../Services/users/user.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  forma: FormGroup;
  cliente: Cliente;

  constructor(private fb: FormBuilder, private validadorS: ValidatorsService, private auth: AuthService,
    private router: Router, private userS: UserService, private clienteSer: ClienteService) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.cliente = new Cliente();
  }

  get emailNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }
  get passwordNoValido() {
    return this.forma.get('password').invalid && this.forma.get('password').touched
  }
  get password2NoValido() {

    const password = this.forma.get('password').value;
    const password2 = this.forma.get('password2').value;
    return (password === password2) ? false : true;
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
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
      apellido: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      telefono: ['', Validators.required],
      domicilio: this.fb.group({
        calle: ['', Validators.required],
        numero: [''],
        localidad: ['', Validators.required]
      })

    }, {
      validators: this.validadorS.passwordsIguales('password', 'password2')
    });

  }

  guardar() {
    console.log(this.forma);

    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    const { email, password } = this.forma.value;
    const client = this.forma.value;
    console.log();
    try {

      this.clienteSer.addCliente(client).subscribe(
        (data) => {
          console.log(data);
        });
      const user = this.auth.register(email, password);
      if (user) {
        this.router.navigate(['/admin/facturas'] || ['/cocina'] || ['/home']);
      } else {
        this.router.navigate(['/registro']);
      }
    } catch (error) { console.log('hola', error); }
  }
};