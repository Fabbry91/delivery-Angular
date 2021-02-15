import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { UserService } from '../../Services/users/user.service';
import { Cliente } from '../../Interfaces/cliente';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  forma: FormGroup;
  cliente: Cliente;
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private userS: UserService) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.cliente = new Cliente();
  }
  get emailNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }
  get passwordNoValido() {
    return this.forma.get('pass').invalid && this.forma.get('pass').touched
  }



  crearFormulario() {

    this.forma = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass: ['', [Validators.required, Validators.minLength(6)]],

    });

  }

  guardar() {
    //console.log(this.forma);
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const { email, pass } = this.forma.value;
    try {
      this.auth.loginEmailUser(email, pass).then((u: User) => {
        this.userS.getPermision(u.email).then(arr => {
          if (!arr || arr.length === 0) {
            this.router.navigate(['/home']);
          } else {
            if (arr.length === 1 && arr[0] === 'cocina') {
              this.router.navigate(['/cocina']);
            } else {
              this.router.navigate(['/admin/factura']);
            }
          }
        });
      });
    } catch (err) {
      console.log('Error', err);
      this.router.navigate(['/']);
    };
  }

  async loginGO() {
    try {
      await this.auth.loginGoogleUser();
    } catch (error) {
      console.error(error);
    }
    this.router.navigate(['/home']);
  }
}
