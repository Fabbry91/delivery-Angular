import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { Cliente } from '../../Interfaces/cliente';
import { AuthService } from '../../Services/auth.service';
import { ClienteService } from '../../Services/clientes/cliente.service';
import { UserService } from '../../Services/users/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  public user$: Observable<any> = this.auth.afAuth.user;
  datos: any;
  cargando=false;
  constructor(private auth: AuthService, private router: Router, private userS: UserService, private clienteS: ClienteService) { }

  ngOnInit() {
    this.getUserandCliente();
  }

  getUserandCliente() {

    this.auth.afAuth.user.subscribe((u: User) => {
      if (u) {
        this.userS.getPermision(u.email).then((data: any) => {
          this.datos = data;
          this.cargando=true;
          // console.log(this.datos);
        }
        );
      }
    });
  }
  async onLogout() {
    try {
      await this.auth.logoutUser();
      this.router.navigate(['#']);
    } catch (error) {
      // console.log(error);
    }
  }
}
