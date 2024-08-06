import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, ConfirmDialogModule],
  providers: [DialogService, ConfirmationService],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  @Output() onConfirm: EventEmitter<void> = new EventEmitter();
  @Output() onReject: EventEmitter<void> = new EventEmitter();

  constructor(private confirmationService: ConfirmationService) {}

  confirm(message: string) {
    this.confirmationService.confirm({
      message,

      reject: () => {
        this.onReject.emit();
      },
      accept: () => {
        this.onConfirm.emit();
      },
    });
  }
}
