import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
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


export class AddEditProductComponent {

  form: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _productoService: ProductoService,
    private router: Router,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    })
  }

  addProduct() {

    //console.log(this.form.get("name")?.value);

    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock,
    }
    this.loading = true;
    this._productoService.saveProduct(product).subscribe(() => {
      this.loading = false;
      this.toastr.success(`El producto ${product.name} se ha añadido`, 'Nuevo producto');
      this.router.navigate(['/']);
    })
  }

}
