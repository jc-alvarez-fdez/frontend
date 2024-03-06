import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { ListProductsComponent } from './_components/list-products/list-products.component';
import { AddEditProductComponent } from './_components/add-edit-product/add-edit-product.component';

export const routes: Routes = [
  { path: "", component: ListProductsComponent },
  { path: "add", component: AddEditProductComponent },
  { path: "edit/:id", component: AddEditProductComponent },
  { path: "**", redirectTo: "", pathMatch:"full" }
];
