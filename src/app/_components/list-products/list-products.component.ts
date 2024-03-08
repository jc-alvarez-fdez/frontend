import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Product } from '../../_interfaces/product.interface';
import { ProductoService } from '../../-services/producto.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {

  public listProducts: Product [] = [];

  constructor (
    private http: HttpClient,
    private _productoService: ProductoService) {}


  ngOnInit(): void {
    this.getListProductos();
  }

  getListProductos() {
    this._productoService.getListProductos().subscribe((data) => {
      this.listProducts = data;
    })
  }

}
