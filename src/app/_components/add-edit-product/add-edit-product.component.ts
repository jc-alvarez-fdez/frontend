import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


import { Product } from '../../_interfaces/product.interface';
import { ProductoService } from '../../_services/producto.service';
import { ProgressComponent } from '../../_shared/progress/progress.component';


@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ProgressComponent
  ],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})


export class AddEditProductComponent implements OnInit{

  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = "Añadir"

  constructor(
    private fb: FormBuilder,
    private _productoService: ProductoService,
    private router: Router,
    private toastr: ToastrService,
    private activRouter: ActivatedRoute) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    })
    this.id = Number (activRouter.snapshot.paramMap.get('id'));
    console.log(this.id);
  }

  ngOnInit(): void{
    if(this.id !=0) {
      // es editar
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }
  }

  addProduct() {
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock,
    }

    this.loading = true;

    if (this.id !==0) { // es editar
      product.id = this.id;
      this._productoService.updateProduct(this.id, product).subscribe(() => {
        this.loading = false;
        this.toastr.info(`El producto ${product.name} se ha actualizado`, 'Actualizar producto');
      this.loading = false;
      this.router.navigate(['/']);
        })

    } else { // es añadir
      this._productoService.saveProduct(product).subscribe(() => {
        this.toastr.success(`El producto ${product.name} se ha añadido`, 'Nuevo producto');
      this.loading = false;
      this.router.navigate(['/']);
      })
    }






  }

  getProduct(id:number) {
    this.loading = true;
    this._productoService.getProduct(id).subscribe((data: Product) => {
      console.log(data);
      this.loading = false;
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      })
    })
  }

}
