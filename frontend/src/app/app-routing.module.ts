import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './Modulos/Headers/header/header.component';
import { AdminGuard } from './Modulos/Services/guard/admin.guard';

import { HomeClienteComponent } from './Modulos/Cliente/components/home-cliente/home-cliente.component';
import { LoginComponent } from './Modulos/Login/login/login.component';
import { RegistroComponent } from './Modulos/Login/registro/registro.component';
import { VerificacionEmailComponent } from './Modulos/Shared/verificacion-email/verificacion-email.component';

import { AdmindComponent } from './Modulos/Admin/components/admind/admind.component';
import { ArticuloComponent } from './Modulos/Admin/components/articulo/articulo.component';
import { ArticuloEditComponent } from './Modulos/Admin/components/articulo/articulo-edit/articulo-edit.component';
import { ArticuloManoComponent } from './Modulos/Admin/components/articulo-mano/articulo-mano.component';
import { ClientesComponent } from './Modulos/Admin/components/clientes/clientes.component';
import { FacturasComponent } from './Modulos/Admin/components/facturas/facturas.component';
import { PedidosComponent } from './Modulos/Admin/components/pedidos/pedidos.component';
import { RubroComponent } from './Modulos/Admin/components/rubro/rubro.component';
import { UserComponent } from './Modulos/Admin/components/user/user.component';
import { FormComponent } from './Modulos/Cliente/components/form/form.component';
import { CocineroComponent } from './Modulos/Cocina/cocinero/cocinero.component';
import { MasVendidosComponent } from './Modulos/Admin/components/mas-vendidos/mas-vendidos.component';
import { HoraComponent } from './Modulos/Admin/components/hora/hora.component';




export const routes: Routes = [
  { path: 'bienvenidos', component: HeaderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  //{ path: 'verificacion', component: VerificacionEmailComponent },
  {
    path: 'admin',
    component: AdmindComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'hora', component: HoraComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'articulos', component: ArticuloComponent },
      { path: 'articulo/:id', component: ArticuloEditComponent },
      { path: 'manofacturado', component: ArticuloManoComponent },
      { path: 'usuarios', component: UserComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'factura', component: FacturasComponent },
      { path: 'rubro', component: RubroComponent },
      { path: 'vendidos', component: MasVendidosComponent },
    ]
  },
  { path: 'home', component: HomeClienteComponent },
  { path: 'cocina', component: CocineroComponent },
  { path: 'cliente-pedido', component: FormComponent },
  { path: '', pathMatch: 'full', redirectTo: 'bienvenidos' },
  { path: '**', pathMatch: 'full', redirectTo: 'bienvenidos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
