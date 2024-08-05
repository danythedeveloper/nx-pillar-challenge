import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import { SaveDialogState } from '../../../store/dashboard/states/dialog/dialog.actions';
import { DialogState } from '../../../store/dashboard/states/dialog/dialog.state';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit, OnDestroy {
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  title = '';
  form!: FormGroup;
  objectKeys = Object.keys;
  originalData: any;
  visible = false;
  data: any;
  isNew = false;
  private isFormInitialized = false;

  private store = inject(Store);
  formUnsubscribe$ = new Subject<void>();
  dialogUnsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    // Initialize the form group with an empty form
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.store
      .select(DialogState.dialogData)
      .pipe(takeUntil(this.formUnsubscribe$))
      .subscribe(({ dialogVisible, selectedItem, isNewItem, dialogTitle }) => {
        this.visible = dialogVisible;
        console.log(dialogTitle);
        if (selectedItem && !this.isFormInitialized) {
          this.data = selectedItem;
          this.originalData = { ...selectedItem };
          this.createForm();
          this.title = dialogTitle;
          this.isFormInitialized = true;
        }

        this.isNew = isNewItem;
      });
  }

  ngOnDestroy(): void {
    this.dialogUnsubscribe$.next();
    this.dialogUnsubscribe$.complete();
    this.formUnsubscribe$.next();
    this.formUnsubscribe$.complete();
  }

  createForm() {
    const formControls: { [key: string]: any } = {};
    for (const key in this.data) {
      if (key !== 'id') {
        formControls[key] = [this.data[key], Validators.required];
      }
    }
    this.form = this.fb.group(formControls);

    this.form.valueChanges
      .pipe(takeUntil(this.formUnsubscribe$))
      .subscribe((value) => {
        this.store.dispatch(
          new SaveDialogState({ item: { ...this.data, ...value } })
        );
      });
  }

  save() {
    if (this.form.valid) {
      const editedData = { ...this.data, ...this.form.value };
      if (this.isNew || this.hasChanges(editedData)) {
        console.log('new', this.isNew, this.hasChanges(editedData));
        this.onSave.emit(editedData);
      }
      this.isFormInitialized = false;
      this.onClose.emit();
    }
  }

  hasChanges(editedData: any): boolean {
    return Object.keys(this.originalData).some(
      (key) => this.originalData[key] !== editedData[key]
    );
  }

  close() {
    this.isFormInitialized = false;
    this.onClose.emit();
  }
}
