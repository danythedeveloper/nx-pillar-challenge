import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { StyleClassModule } from 'primeng/styleclass';
import { DropdownModule } from 'primeng/dropdown';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DialogState } from '../../../store/dashboard/states/dialog/dialog.state';
import {
  CloseDialog,
  OpenDialog,
  SaveDialogState,
} from '../../../store/dashboard/states/dialog/dialog.actions';

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
    EditDialogComponent,
  ],
  templateUrl: './datagrid.component.html',
  styleUrl: './datagrid.component.scss',
})
export class DatagridComponent<T extends { [key: string]: any }> {
  @Input() title: string = '';
  @Input() data: T[] = [];
  @Input() editable: boolean = false;
  @Input() showImages: boolean = true;
  @Input() filterable: boolean = true;
  @Output() onEdit: EventEmitter<T> = new EventEmitter();
  @Output() onCreate: EventEmitter<T> = new EventEmitter();
  //Expose Object.keys function to template and component
  objectKeys = Object.keys;

  //Store values for data persistance
  private store = inject(Store);

  openEditDialog(item: T) {
    this.store.dispatch(
      new OpenDialog({ item, isNew: false, dialogTitle: 'Edit Category' })
    );
  }

  openAddDialog() {
    const defaultItem = this.createDefaultItem();
    this.store.dispatch(
      new OpenDialog({
        item: defaultItem,
        isNew: true,
        dialogTitle: 'Add Category',
      })
    );
  }

  onSaveDialog(modifiedItem: T) {
    this.onEdit.emit(modifiedItem);
    this.closeDialog();
  }

  closeDialog() {
    this.store.dispatch(new CloseDialog());
  }

  createDefaultItem(): T {
    const defaultItem: Partial<T> = {};
    for (const key of this.objectKeys(this.data[0])) {
      if (key !== 'id') {
        (defaultItem as any)[key] = '';
      }
    }
    return defaultItem as T;
  }

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
