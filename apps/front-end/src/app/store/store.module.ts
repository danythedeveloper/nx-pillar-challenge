import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { STATES_MODULES } from './store.config';

@NgModule({
  imports: [CommonModule, NgxsModule.forRoot(STATES_MODULES)],
  exports: [NgxsModule],
})
export class NgxsStoreModule {}
