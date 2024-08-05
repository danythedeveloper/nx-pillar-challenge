import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { STATES_MODULES } from './store.config';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot(STATES_MODULES),
    NgxsStoragePluginModule.forRoot({
      keys: ['auth'],
    }),
  ],
  exports: [NgxsModule, NgxsStoragePluginModule],
})
export class NgxsStoreModule {}
