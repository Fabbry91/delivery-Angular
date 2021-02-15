import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetallePedido } from '../../Interfaces/detalle-pedido';
import { Pedido, TipoRetiro } from '../../Interfaces/pedido';
import { User } from '../../Interfaces/user';
import { ArticulosService } from '../../Services/articulos/articulos.service';
import { AuthService } from '../../Services/auth.service';
import { PedidoService } from '../../Services/pedidos/pedido.service';
import { UserService } from '../../Services/users/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cocinero',
  templateUrl: './cocinero.component.html',
  styleUrls: ['./cocinero.component.css']
})
export class CocineroComponent implements OnInit {
  user: User = null;
  listPedido: Pedido[] = [];
  tipoRetiro = TipoRetiro;

  constructor(private pedidoS: PedidoService, private auth: AuthService, private userS: UserService, private router: Router, private articuloS: ArticulosService) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.auth.afAuth.user.subscribe((u: User) => {
      if (u) {
        this.userS.getPermision(u.email).then(arr => {
          if (!arr || !arr.includes('cocina')) {
            console.log('no tiene permisos de acceso');
            this.auth.logoutUser();
            this.router.navigate(['/login']);
          } else {
            this.getPedidos();
            //console.log('usuario', u);
          };
        });
      }
    });
  }
  getPedidos() {
    this.pedidoS.getPedidoByQuery({ estado: 0 }).subscribe(p => {
      if (p) {
        //console.log(p);
        this.listPedido = p.sort((a, b) => {
          if (a.fecha > b.fecha) {
            return 1;
          }
          if (a.fecha < b.fecha) {
            return -1;
          }
          return 0;
        });
      }
    });
  }

  updatePedido(pedido: Pedido) {

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.pedidoS.updatePedido(pedido._id, { estado: 1 }).subscribe(a => {
      Swal.fire({
        title: `Pedido N°:${pedido.numero}`,
        text: 'Fue terminado',
        icon: 'success',
        allowOutsideClick: false
      });
      this.decreaseStock(pedido.detalles),
        this.getPedidos();
    });
  }

  async decreaseStock(details: DetallePedido[]) {
    const list: any[] = [];
    for (const det of details) {
      if (det.onModel === 'articulo') {
        const q = await {
          _id: det.articulo._id,
          cantidad: det.cantidad
        };
        await list.push(q);
      } else {
        for (const a of det.articulo.detalle) {
          const q2 = await {
            _id: a.articulo,
            cantidad: a.cantidad * det.cantidad
          };
          await list.push(q2);
        }
      }
    }
    await this.articuloS.decreaseStock(list)
      .toPromise()
      .then(() => {
        console.log('Actualizado');
      });
  }
}
