import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatagridComponent } from './datagrid.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store, NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { StyleClassModule } from 'primeng/styleclass';
import { DropdownModule } from 'primeng/dropdown';
import { By } from '@angular/platform-browser';
import { DialogState } from '../../../store/dashboard/states/dialog/dialog.state';
import {
  OpenDialog,
  CloseDialog,
} from '../../../store/dashboard/states/dialog/dialog.actions';
import { of } from 'rxjs';

describe('DatagridComponent', () => {
  let component: DatagridComponent<any>;
  let fixture: ComponentFixture<DatagridComponent<any>>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        DataViewModule,
        ButtonModule,
        IconFieldModule,
        StyleClassModule,
        DropdownModule,
        NgxsModule.forRoot([DialogState]),
      ],
      declarations: [DatagridComponent],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatagridComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    // Mock store select to return observable
    spyOn(store, 'select').and.returnValue(
      of({
        dialogVisible: true,
        selectedItem: { id: '1', name: 'Product 1', category: 'Category 1' },
        isNewItem: false,
        dialogTitle: 'Edit Product',
        fieldConfigs: [
          { key: 'name', label: 'Name', type: 'text', hidden: false },
          {
            key: 'category',
            label: 'Category',
            type: 'dropdown',
            hidden: false,
            options: [{ label: 'Category 1', value: 'Category 1' }],
          },
        ],
      })
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    component.title = 'Products';
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toContain('Products');
  });

  it('should open edit dialog with correct item data', () => {
    spyOn(store, 'dispatch');
    const item = component.data[0];
    component.openEditDialog(item);
    expect(store.dispatch).toHaveBeenCalledWith(
      new OpenDialog({
        item,
        isNew: false,
        dialogTitle: 'Edit Products',
        fieldConfigs: component.fieldConfigs,
      })
    );
  });

  it('should open add dialog with default item', () => {
    spyOn(store, 'dispatch');
    component.openAddDialog();
    expect(store.dispatch).toHaveBeenCalledWith(
      new OpenDialog({
        item: component.createDefaultItem(),
        isNew: true,
        dialogTitle: 'Add Products',
        fieldConfigs: component.fieldConfigs,
      })
    );
  });

  it('should emit onSaveDialog event with modified item', () => {
    spyOn(component.onEdit, 'emit');
    component.isCreateDialog = false;
    const modifiedItem = {
      id: '1',
      name: 'Modified Product',
      category: 'Category 1',
    };
    component.onSaveDialog(modifiedItem);
    expect(component.onEdit.emit).toHaveBeenCalledWith(modifiedItem);
  });

  it('should emit onCreate event when isCreateDialog is true', () => {
    spyOn(component.onCreate, 'emit');
    component.isCreateDialog = true;
    const newItem = { name: 'New Product', category: 'Category 1' };
    component.onSaveDialog(newItem);
    expect(component.onCreate.emit).toHaveBeenCalledWith(newItem);
  });

  it('should close dialog on closeDialog call', () => {
    spyOn(store, 'dispatch');
    component.closeDialog();
    expect(store.dispatch).toHaveBeenCalledWith(new CloseDialog());
  });

  it('should create default item correctly', () => {
    component.data = [
      { id: '1', name: 'Product 1', category: 'Category 1', price: 100 },
      { id: '2', name: 'Product 2', category: 'Category 2', price: 200 },
    ];
    const defaultItem = component.createDefaultItem();
    expect(defaultItem).toEqual({ name: '', category: '', price: '' });
  });

  it('should filter out non-visible fields', () => {
    const item = {
      id: '1',
      name: 'Product 1',
      category: 'Category 1',
      price: 100,
    };
    component.nonVisibleFields = ['price'];
    const displayableFields = component.getDisplayableFields(item);
    expect(displayableFields).toEqual(['name', 'category']);
  });

  it('should return correct gradient based on index', () => {
    expect(component.getGradient(0)).toBe(
      'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
    );
    expect(component.getGradient(5)).toBe(
      'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
    );
    expect(component.getGradient(7)).toBe(
      'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
    );
  });
});
