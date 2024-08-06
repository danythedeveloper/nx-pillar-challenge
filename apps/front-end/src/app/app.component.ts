import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessagesComponent } from './shared/components/messages/messages.component';

@Component({
  standalone: true,
  imports: [RouterModule, MessagesComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'front-end';
}
