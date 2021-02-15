import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Modulos/Interfaces/cliente';
import { DetallePedido } from 'src/app/Modulos/Interfaces/detalle-pedido';
import { EstadoPedido, Pedido, TipoRetiro } from 'src/app/Modulos/Interfaces/pedido';
import { User } from 'src/app/Modulos/Interfaces/user';
import { AuthService } from 'src/app/Modulos/Services/auth.service';
import { ClienteService } from 'src/app/Modulos/Services/clientes/cliente.service';
import { PedidoService } from 'src/app/Modulos/Services/pedidos/pedido.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  user: User = null;
  client: Cliente = null;
  listaPedido: Pedido[] = [];
  hoyNo: Pedido[] = [];
  today: Pedido[] = [];
  estadoPedido = EstadoPedido;
  retiro = TipoRetiro;


  constructor(private auth: AuthService, private router: Router, private clientS: ClienteService, private pedidoS: PedidoService) { }

  ngOnInit(): void {
    this.getUser();
    this.getOlds();
  }

  getUser() {
    this.auth.afAuth.user.subscribe((u: User) => {
      if (u) {
        this.user = u;
        this.getClient();
      }
      console.log(u);
    });
  }
  getClient() {
    this.clientS.getClientEmail(this.user.email).subscribe((c: Cliente) => {
      if (c) {
        this.client = c;
        this.getPedido();
      }
      console.log('esto es c', c);
    });
  }

  getPedido() {
    this.pedidoS.getPedidoByQuery({ cliente: this.client._id }).subscribe((p: Pedido[]) => {
      if (p) {
        this.listaPedido = p;
        this.today = this.listaPedido.filter(l =>
          new Date(l.fecha).toDateString() ===
          new Date(Date.now()).toDateString()
        );
      }
      console.log('hoy', this.today);
    });
  }

  totales(lista: DetallePedido[]) {
    return lista.map(d => d.subtotal)
      .reduce((a, b) => {
        return a + b;
      });
  }

  getOlds() {
    this.hoyNo = this.listaPedido.filter(l =>
      new Date(l.fecha).toDateString() !==
      new Date(Date.now()).toDateString());
    console.log(this.hoyNo);
  }

}
