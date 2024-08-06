import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [],
  imports: [CommonModule, MessagesModule, MessagesModule],
  exports: [MessagesModule],
  providers: [MessageService],
})
export class SharedModule {}
