import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDialogComponent } from './edit-dialog.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store, NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogState } from '../../../store/dashboard/states/dialog/dialog.state';
import { of } from 'rxjs';
import { FieldConfig } from '../../../model/types/fieldConfig.type';
import { SaveDialogState } from '../../../store/dashboard/states/dialog/dialog.actions';

describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        DialogModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        NgxsModule.forRoot([DialogState]),
      ],
      declarations: [EditDialogComponent],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogComponent);
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the selected item data', () => {
    fixture.detectChanges();
    expect(component.form.value).toEqual({
      name: 'Product 1',
      category: 'Category 1',
    });
  });

  it('should call onSave.emit with modified item on save', () => {
    spyOn(component.onSave, 'emit');
    fixture.detectChanges();
    component.form.setValue({
      name: 'Updated Product',
      category: 'Category 1',
    });
    component.save();
    expect(component.onSave.emit).toHaveBeenCalledWith({
      id: '1',
      name: 'Updated Product',
      category: 'Category 1',
    });
  });

  it('should call onClose.emit on close', () => {
    spyOn(component.onClose, 'emit');
    component.close();
    expect(component.onClose.emit).toHaveBeenCalled();
  });

  it('should filter out hidden fields in createForm', () => {
    fixture.detectChanges();
    const hiddenFieldConfig: FieldConfig = {
      key: 'hiddenField',
      label: 'Hidden Field',
      type: 'text',
      hidden: true,
    };
    component.fieldConfigs.push(hiddenFieldConfig);
    component.data['hiddenField'] = 'hiddenValue';
    component.createForm();
    expect(component.form.contains('hiddenField')).toBeFalsy();
  });

  it('should dispatch SaveDialogState on form value changes', () => {
    spyOn(store, 'dispatch');
    fixture.detectChanges();
    component.form.setValue({
      name: 'Updated Product',
      category: 'Category 1',
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      new SaveDialogState({
        item: { id: '1', name: 'Updated Product', category: 'Category 1' },
      })
    );
  });
});
