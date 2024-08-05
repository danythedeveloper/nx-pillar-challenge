import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatagridComponent } from '../../shared/components/datagrid/datagrid.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, DatagridComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categories = [
    { id: 1, category: 'Electronics' },
    { id: 2, category: 'Video Games' },
    { id: 3, category: 'Sports' },
    { id: 4, category: 'Camping' },
  ];
}
