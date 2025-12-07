import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private sw: SwPush, private http: HttpClient) {}

  VAPID_PUBLIC_KEY = `${environment.VAPID_PUBLIC_KEY}`;

  subscribeToNotifications() {
    this.sw.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY,
    })
      .then((sub) => {
        this.http.post(`${environment.apiBaseUrl}/notifications/subscribe`, sub).subscribe();
      })
      .catch((err) => console.error('Could not subscribe', err));
  }
}
