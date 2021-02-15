import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../Services/pedidos/pedido.service';
import { Pedido, EstadoPedido, TipoRetiro } from '../../../Interfaces/pedido';
import { DetallePedido } from '../../../Interfaces/detalle-pedido';
import { Factura } from '../../../Interfaces/factura';
import { FacturaService } from '../../../Services/factura/factura.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  listPedido: Pedido[] = [];
  estadoPedido = EstadoPedido;
  tipoRetiro = TipoRetiro;
  cargando = false;

  constructor(private pedidoS: PedidoService, private facturaS: FacturaService) { }

  ngOnInit(): void {
    this.getPedidos();
    this.cargando = true;
  }
  getPedidos() {
    this.pedidoS.getPedidoByQuery({ estado: 1 }).subscribe(p => {
      if (p) {
        console.log(p);
        this.listPedido = p.sort((a, b) => {
          if (a.fecha > b.fecha) {
            return -1;
          }
          return 0;
        });
        this.cargando = false;
      }
    });
  }

  crearFactura(pedido: Pedido) {
    this.pedidoS.updatePedido(pedido._id, { estado: 2 }).toPromise()
      .then(() => this.addFactura(pedido));
  }
  addFactura(pedido: Pedido) {

    const descuentoPedido =
      (pedido.tipoEnvio) === 0
        ? (this.getTotal(pedido.detalles) * 10) / 100
        : 0;
    const totalPedido =
      (this.getTotal(pedido.detalles)) - descuentoPedido;

    const factura: Factura = {
      fecha: new Date(Date.now()),
      montoDescuento: descuentoPedido,
      total: totalPedido,
      detalles: pedido.detalles,
      pedido: pedido
    };
    console.log(factura);
    this.facturaS.addFactura(factura).subscribe(data => {
      Swal.fire({
        title: `Pedido N°:${pedido.numero}`,
        text: 'Facturado exitosamente',
        icon: 'success',
        allowOutsideClick: false
      });
      console.log('la factura', data)
    });
    this.getPedidos();
  }

  getTotal(details: DetallePedido[]) {
    return details.map(d => d.subtotal).reduce((a, b) => {
      return a + b;
    });
  }
}
