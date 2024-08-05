import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatagridComponent } from '../../shared/components/datagrid/datagrid.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, DatagridComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products = [
    {
      id: 1000,
      title: 'Phone',
      price: 1,
      categoryId: 2,
      categoryName: 'Electronics',
    },
  ];
}
