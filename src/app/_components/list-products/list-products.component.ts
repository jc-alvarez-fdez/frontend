import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from '../../_interfaces/product.interface';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {

  public listProducts: Product [] = [
    { name: "Coca-cola", description: "Bebida azucarada", price: 4, stock: 200 },
    { name: "Corona", description: "Bebida con alcohol", price: 5, stock: 300 },
  ]

}
