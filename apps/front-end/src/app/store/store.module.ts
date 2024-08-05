import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { STATES_MODULES } from './store.config';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot(STATES_MODULES),
    NgxsStoragePluginModule.forRoot({
      keys: ['auth', 'dialog'],
      storage: StorageOption.LocalStorage,
    }),
  ],
  exports: [NgxsModule, NgxsStoragePluginModule],
})
export class NgxsStoreModule {}
