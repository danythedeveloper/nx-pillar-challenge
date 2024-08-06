import {
  ChangeDetectorRef,
  Component,
  inject,
  NgZone,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessagesComponent } from './shared/components/messages/messages.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingService } from './services/loading.service';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MessagesComponent,
    CommonModule,
    ProgressSpinnerModule,
    AsyncPipe,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'front-end';

  constructor() {}
}
