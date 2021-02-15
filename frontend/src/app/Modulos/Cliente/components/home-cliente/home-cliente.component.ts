import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../../../Services/articulos/articulos.service';
import { PedidoService } from '../../../Services/pedidos/pedido.service';
import { Manofacturado } from '../../../Interfaces/manofacturado';
import { Articulo } from '../../../Interfaces/articulo';
import { Pedido } from 'src/app/Modulos/Interfaces/pedido';
import { User } from '../../../Interfaces/user';
import { Cliente } from 'src/app/Modulos/Interfaces/cliente';
import { AuthService } from 'src/app/Modulos/Services/auth.service';
import { ClienteService } from 'src/app/Modulos/Services/clientes/cliente.service';
import { UserService } from 'src/app/Modulos/Services/users/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css']
})
export class HomeClienteComponent implements OnInit {

  user: User = null;
  cliente: Cliente = null;

  totalPedido = 0;
  entrega = true;
  data: any;
  listManofacturado: Manofacturado[] = [];
  listArticulo: Articulo[] = [];
  listDetallePed = [];
  carroSduplicar = [];
  prueba: Pedido;

  filterProducto = '';

  constructor(private articuloS: ArticulosService, private activated: ActivatedRoute,
    private pedidoS: PedidoService,
    private auth: AuthService,
    private clienteSer: ClienteService,
    private userSer: UserService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.getAllManoFacturado();
    this.getUserandCliente();
    this.getAllArticulo();
    this.calcularTotal();
    this.pedido();
  }
  // usuario y Cliente
  getUserandCliente() {
try{
    this.auth.afAuth.user.subscribe((u: User) => {
      if (u) {
        this.user = u,
          this.getCliente(u.email);
      } else {
        this.user = null;
        this.cliente = null;
      }
    });
  }catch(error){}
  }

  getCliente(email: string) {
    this.clienteSer.getClientEmail(email).subscribe(c => {
      if (c) {
        this.cliente = c as Cliente;
      } else {
        this.userSer.getPermision(this.user.email)
          .then(a => {
            if (a.length === 0) {
              this.auth.afAuth.signOut();
            } else {
              if (a.includes('admin')) {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/cocina']);
              }
            }
          }).catch();
      }
    });
  }


  // Manofacturado
  getAllManoFacturado() {
    this.articuloS.getArticuloManofacturado().subscribe((data: any) => {
      this.listManofacturado = data;
      console.log(this.listManofacturado);
    });
  }
  //Articulos
  getAllArticulo() {
    this.articuloS.getArticulos().subscribe((data: any) => {
      this.listArticulo = data;
      console.log(this.listArticulo);
    });
  }
  // Dettalle Pedido

  anadir(obj: any, type: string) {

    const sub = type === 'articulo'
      ? Number.parseFloat(obj.precioVenta)
      : Number.parseFloat(obj.precio);
    const detalle = {
      cantidad: 1,
      subtotal: sub,
      articulo: obj,
      onModel: type
    };

    this.listDetallePed.push(detalle);

    this.carroSduplicar = this.listDetallePed.reduce((acumulador, valorActul) => {
      const existe = acumulador.find(detalle => detalle.articulo._id === valorActul.articulo._id);
      if (existe) {
        return acumulador.map((detalle) => {
          if (detalle.articulo._id === valorActul.articulo._id) {
            return {
              ...detalle,
              cantidad: detalle.cantidad + valorActul.cantidad,
              subtotal: detalle.subtotal + valorActul.subtotal,
              tiempoDeCoccion: detalle.articulo.tiempoDeCoccion + valorActul.articulo.tiempoDeCoccion
            };
          }
          return detalle;
        });
      }
      return [...acumulador, valorActul];
    }, []);
    this.calcularTotal();
    console.log(this.carroSduplicar);
  }

  calcularTotal() {
    this.totalPedido =
      this.carroSduplicar.length > 0
        ? (this.carroSduplicar
          .map(a => a.subtotal)
          .reduce((a, b) => {
            return a + b;
          })
        ) : 0;
    console.log('total', this.totalPedido);
  }

  delete(i: number) {
    this.carroSduplicar.splice(i, 1);
    console.log("Borra", this.carroSduplicar);
    this.calcularTotal();
  }

  pedido() {
    if (!this.entrega) {
      this.entrega = true;
    } else {
      this.entrega = false;
    }
    console.log(this.entrega);
  }

  pedidoCompleto() {
    //const now = new Date(Date.now());
    const cockTime = this.carroSduplicar
      .filter(x => x.onModel !== 'articulo').map(a => a.articulo.tiempoDeCoccion);
    const ma = Math.max(...cockTime);
    console.log(cockTime);
    console.log('smayor', ma);

    let now = new Date(Date.now());
    now.setMinutes(now.getMinutes() + ma);

    if(this.user==null){
      Swal.fire('Error','Debe estar registrado para ralizar el pedido','error');
      this.router.navigate(['/login']);  
    }


    if (this.verifyCliente()) {
      const pedido: Pedido = {

        fecha: new Date(Date.now()),
        numero: 0,
        estado: 0,
        horaEstimadaFin: now,
        tipoEnvio: deliveryType[this.entrega.toString()],
        cliente: this.cliente,
        detalles: this.carroSduplicar.map(d => {
          return {
            cantidad: d.cantidad,
            subtotal: d.subtotal,
            articulo: d.articulo,
            onModel: d.onModel
          };
        })
      };
      console.log(pedido);
      this.pedidoS.addPedido(pedido).subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/cliente-pedido']);
        this.clear();
      });
    }
  }

  clear() {
    this.listDetallePed = [];
    this.totalPedido = 0;
    this.entrega = false;
  }

  verifyCliente() {
    if (this.cliente) {
      return true;
    } else {
      return this.clienteSer.getClientEmail(this.user.email)
        .toPromise()
        .then((c: Cliente) => {
          if (!c) {
            return false;
          }
          if (c.domicilio.calle.length === 0) {
            return false;
          }
          this.cliente = c;
          return true;
        })
        .catch(err => {
          console.log(err);
          return false;
        });
    }
  }

}

export enum deliveryType {
  'true' = 0,
  'false' = 1
}