import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './services/notification/notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Chatterly';
  private notificationService = inject(NotificationService);
  private loggedInUserId: string | null = localStorage.getItem('userId');
  ngOnInit(): void {
    this.notificationService.subscribeToPush();
  }
}
