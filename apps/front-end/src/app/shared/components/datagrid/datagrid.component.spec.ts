import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatagridComponent } from './datagrid.component';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { StyleClassModule } from 'primeng/styleclass';
import { DropdownModule } from 'primeng/dropdown';

interface MockData {
  id: string;
  name: string;
  category: string;
  price?: number;
}

describe('DatagridComponent', () => {
  let component: DatagridComponent<MockData>;
  let fixture: ComponentFixture<DatagridComponent<MockData>>;

  const mockData: MockData[] = [
    { id: '1', name: 'Item 1', category: 'Category 1', price: 100 },
    { id: '2', name: 'Item 2', category: 'Category 2', price: 200 },
    { id: '3', name: 'Item 3', category: 'Category 3' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DatagridComponent,
        DataViewModule,
        ButtonModule,
        IconFieldModule,
        StyleClassModule,
        DropdownModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatagridComponent<MockData>);
    component = fixture.componentInstance;
    component.dialogTitle = 'Test Grid';
    component.data = mockData;
    component.editable = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const itemElements = compiled.querySelectorAll(
      '.custom-grid .grid .col-12'
    );
    expect(itemElements.length).toBe(mockData.length);
  });

  it('should emit an event when the edit button is clicked', () => {
    spyOn(component.onEdit, 'emit');
    const compiled = fixture.nativeElement as HTMLElement;
    const editButton = compiled.querySelector('.p-button-sm') as HTMLElement;
    editButton.click();
    fixture.detectChanges();
    expect(component.onEdit.emit).toHaveBeenCalledWith(mockData[0]);
  });
});
