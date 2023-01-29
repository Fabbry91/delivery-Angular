import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxPaginationModule } from 'ngx-pagination';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routes } from './app-routing.module'; // Exportar las class approuting
import { AppComponent } from './app.component';



import { LoginComponent } from './Modulos/Login/login/login.component';
import { RegistroComponent } from './Modulos/Login/registro/registro.component';
import { HeaderComponent } from './Modulos/Headers/header/header.component';
import { HomeClienteComponent } from './Modulos/Cliente/components/home-cliente/home-cliente.component';
import { environment } from 'src/app/environments/environment';
import { AdmindComponent } from './Modulos/Admin/components/admind/admind.component';
import { NavbarComponent } from './Modulos/Shared/navbar/navbar.component';
import { AlertasComponent } from './Modulos/Shared/alertas/alertas.component';
import { VerificacionEmailComponent } from './Modulos/Shared/verificacion-email/verificacion-email.component';
import { CocineroComponent } from './Modulos/Cocina/cocinero/cocinero.component';
import { AuthService } from './Modulos/Services/auth.service';
import { ArticuloComponent } from './Modulos/Admin/components/articulo/articulo.component';
import { AdminGuard } from './Modulos/Services/guard/admin.guard';
import { ArticuloManoComponent } from './Modulos/Admin/components/articulo-mano/articulo-mano.component';
import { ClientesComponent } from './Modulos/Admin/components/clientes/clientes.component';
import { FacturasComponent } from './Modulos/Admin/components/facturas/facturas.component';
import { PedidosComponent } from './Modulos/Admin/components/pedidos/pedidos.component';
import { RubroComponent } from './Modulos/Admin/components/rubro/rubro.component';
import { UserComponent } from './Modulos/Admin/components/user/user.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ArticuloEditComponent } from './Modulos/Admin/components/articulo/articulo-edit/articulo-edit.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormComponent } from './Modulos/Cliente/components/form/form.component';
import { ClienteComponent } from './Modulos/Cliente/components/cliente/cliente.component';
import { MasVendidosComponent } from './Modulos/Admin/components/mas-vendidos/mas-vendidos.component';
import { HoraComponent } from './Modulos/Admin/components/hora/hora.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HeaderComponent,
    HomeClienteComponent,
    AdmindComponent,
    NavbarComponent,
    AlertasComponent,
    VerificacionEmailComponent,
    CocineroComponent,
    ArticuloComponent,
    ArticuloManoComponent,
    ClientesComponent,
    FacturasComponent,
    PedidosComponent,
    RubroComponent,
    UserComponent,
    FilterPipe,
    ArticuloEditComponent,
    FormComponent,
    ClienteComponent,
    MasVendidosComponent,
    HoraComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, { useHash: true }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxPaginationModule,
    AutocompleteLibModule
  ],
  providers: [AuthService, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
