import { Component, OnInit } from '@angular/core';
import { CommonModule, NumberFormatStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Product } from '../../_interfaces/product.interface';
import { ProductoService } from '../../_services/producto.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgressComponent } from '../../_shared/progress/progress.component';


@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProgressComponent
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {


  public listProducts: Product [] = [];
  loading: boolean = false;
  constructor (
    private http: HttpClient,
    private _productoService: ProductoService,
    private toastr: ToastrService) {}


  ngOnInit(): void {
    this.getListProductos();
  }

  getListProductos() {

    this.loading = true;
    this._productoService.getListProductos().subscribe((data: Product[]) => {
    this.listProducts = data;
    this.loading = false;
    })
  }

  deleteProduct(id: NumberFormatStyle) {
    this.loading = true;
    this._productoService.deleteProduct(id).subscribe(data => {
      console.log(data);
      this.getListProductos();
      this.toastr.warning('El producto se ha eliminado de la base de datos', 'Producto eliminado')
    });
    }

}
