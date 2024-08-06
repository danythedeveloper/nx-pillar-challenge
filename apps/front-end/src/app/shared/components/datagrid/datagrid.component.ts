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
import {
  CloseDialog,
  OpenDialog,
} from '../../../store/dashboard/states/dialog/dialog.actions';
import { FieldConfig } from '../../../model/types/fieldConfig.type';
import { DialogState } from '../../../store/dashboard/states/dialog/dialog.state';

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
  @Input() nonVisibleFields: string[] = [];
  @Input() nonEditableFields: string[] = [];
  @Input() fieldConfigs: FieldConfig[] = [];
  isCreateDialog = false;
  //Expose Object.keys function to template and component
  objectKeys = Object.keys;

  //Store values for data persistance
  private store = inject(Store);
  dialogData$ = this.store.select(DialogState.dialogData);

  constructor() {
    this.dialogData$.subscribe((dialogData) => {
      this.isCreateDialog = dialogData.isNewItem;
    });
  }

  openEditDialog(item: T) {
    this.store.dispatch(
      new OpenDialog({
        item,
        isNew: false,
        dialogTitle: `Edit ${this.title}`,
        fieldConfigs: this.fieldConfigs,
      })
    );
  }

  openAddDialog() {
    const defaultItem = this.createDefaultItem();
    this.store.dispatch(
      new OpenDialog({
        item: defaultItem,
        isNew: true,
        dialogTitle: `Add ${this.title}`,
        fieldConfigs: this.fieldConfigs,
      })
    );
  }

  onSaveDialog(modifiedItem: T) {
    this.isCreateDialog
      ? this.onCreate.emit(modifiedItem)
      : this.onEdit.emit(modifiedItem);
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

  getDisplayableFields(item: T): string[] {
    return this.objectKeys(item).filter(
      (key) => key !== 'id' && !this.nonVisibleFields.includes(key)
    );
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
