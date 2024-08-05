import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { StyleClassModule } from 'primeng/styleclass';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-datagrid',
  standalone: true,
  imports: [
    CommonModule,
    DataViewModule,
    ButtonModule,
    IconFieldModule,
    StyleClassModule,
    DropdownModule,
  ],
  templateUrl: './datagrid.component.html',
  styleUrl: './datagrid.component.scss',
})
export class DatagridComponent {
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Input() editable: boolean = false;
  @Input() showImages: boolean = true;
  @Input() filterable: boolean = true;

  objectKeys = Object.keys;

  gradients: string[] = [
    'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  ];

  getGradient(index: number): string {
    return this.gradients[index % this.gradients.length];
  }
}
