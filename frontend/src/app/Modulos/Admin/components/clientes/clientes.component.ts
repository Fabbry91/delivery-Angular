import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Modulos/Interfaces/user';
import { UserService } from 'src/app/Modulos/Services/users/user.service';
import { Cliente } from '../../../Interfaces/cliente';
import { ClienteService } from '../../../Services/clientes/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  client: any[] = [];
  usuario: any[] = [];
  varios: any[] = [];
  p: number = 1;
  cliente: Cliente;

  constructor(private clienteS: ClienteService, private userS: UserService) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this.clienteS.getClients().subscribe((dato: any) => {
      this.client = dato;
      this.userS.getUsers().subscribe(dato => {
        this.usuario = dato;
        for (let u of this.usuario) {
          for (let c of this.client) {
            if (u.email === c.email) {
              //console.log(c);
              this.varios.push(u);
              console.log('varios', this.varios);
            }
          }
        }
      });
    });
  }

  deleteClient(id: string) {
    console.log(id);
    this.clienteS.deleteCliente(id).subscribe((data: any) => {
      console.log(data);
      this.getClientes();
    });
  }

  showCliente(cliente: Cliente) {
    this.cliente = cliente;
    console.log(cliente);
  }

  compare() {
  }
}
