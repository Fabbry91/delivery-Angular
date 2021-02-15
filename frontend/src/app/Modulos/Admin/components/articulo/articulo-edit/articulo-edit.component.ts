import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulo } from 'src/app/Modulos/Interfaces/articulo';
import { Rubro } from 'src/app/Modulos/Interfaces/rubro';
import { ArticulosService } from 'src/app/Modulos/Services/articulos/articulos.service';
import { RubroService } from 'src/app/Modulos/Services/rubros/rubro.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulo-edit',
  templateUrl: './articulo-edit.component.html',
  styleUrls: ['./articulo-edit.component.css']
})
export class ArticuloEditComponent implements OnInit {

  formas: FormGroup;
  articulo: Articulo = new Articulo();
  rubroSelect = null;
  rubros: Rubro[] = [];

  constructor(private rubroS: RubroService, private fb: FormBuilder,
    private artiuloS: ArticulosService, private route: ActivatedRoute, private router: Router) {
    this.crearFormulario();
  }

  ngOnInit() {
    this.getOneArticulo();
    this.getRubros();
  }

  get denoNoValido() {
    return this.formas.get('denominacion').invalid && this.formas.get('denominacion').touched
  }
  get pCNoValido() {
    return this.formas.get('precioCompra').invalid && this.formas.get('precioCompra').touched
  }
  get pVNoValido() {
    return this.formas.get('precioVenta').invalid && this.formas.get('precioVenta').touched
  }
  get stockNoValido() {
    return this.formas.get('stockActual').invalid && this.formas.get('stockActual').touched
  }
  get unNoValido() {
    return this.formas.get('unidadMedidad').invalid && this.formas.get('unidadMedidad').touched
  }
  get insumoNoValido() {
    return this.formas.get('esInsumo').invalid && this.formas.get('esInsumo').touched
  }
  get rubroNoValido() {
    return this.formas.get('rubro').invalid && this.formas.get('rubro').touched
  }

  crearFormulario() {

    this.formas = this.fb.group({
      denominacion: ['', Validators.required],
      precioCompra: ['', [Validators.required, Validators.min(0)]],
      precioVenta: ['', [Validators.required, Validators.min(0)]],
      stockActual: ['', [Validators.required, Validators.min(0)]],
      unidadMedidad: ['', [Validators.required, Validators.maxLength(2)]],
      esInsumo: ['', Validators.required],
      rubro: ['', Validators.required],
    });

  }

  addArticulo() {

    // console.log(this.formas);
    const arti = {
      denominacion: this.formas.controls.denominacion.value,
      precioCompra: this.formas.controls.precioCompra.value,
      precioVenta: this.formas.controls.precioVenta.value,
      stockActual: this.formas.controls.stockActual.value,
      unidadMedidad: this.formas.controls.unidadMedidad.value,
      esInsumo: this.formas.controls.esInsumo.value,
      rubro: this.formas.controls.rubro.value,
    };

    try {
      if (this.formas.invalid) {
        return Object.values(this.formas.controls).forEach(control => {

          control.markAsTouched();
        });
      }

      Swal.fire({
        title: 'Espere',
        text: 'Guardando informacion',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();
      let peticion: Observable<any>;

      if (this.articulo._id==null) {
        peticion = this.artiuloS.addArticulo(arti); // .subscribe((resp: any) => {console.log(resp);});
      } else {
        peticion = this.artiuloS.updateArticulo(this.articulo._id, arti); // .subscribe(resp => {console.log(resp);});}
      }

      peticion.subscribe(resp => {
        Swal.fire({
          title: this.articulo.denominacion,
          text: 'Se actualizo correctamente',
          icon: 'success',
          allowOutsideClick: false
        });
      });

      this.formas.reset();
      this.router.navigate(['/admin/articulos']);
    } catch (err) {
      // console.log(err);
    }
  }

  getOneArticulo() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.artiuloS.getArticulo(id).subscribe(((res: any) => {
        // console.log(res);
        this.articulo = res;
        this.formas.patchValue(res);
      }));
    }
  }

  getRubros() {
    try {
      this.rubroS.getRubro().subscribe((data: any) => {
        this.rubros = data;
        // console.log(this.rubros);
      });
    } catch (error) {
      // console.error(error);
    }
  }

}
