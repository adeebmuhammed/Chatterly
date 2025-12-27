import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  subscribeToPush() {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service workers not supported');
      return;
    }

    navigator.serviceWorker.ready.then(async (reg) => {
      if (Notification.permission === 'denied') return;

      let sub = await reg.pushManager.getSubscription();

      if (!sub) {
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(
            environment.VAPID_PUBLIC_KEY
          ),
        });
      }

      this.http
        .post(
          `${environment.apiBaseUrl}/notifications/subscribe`,
          sub,
          { withCredentials: true } // if auth-based
        )
        .subscribe();
    });
  }

  private urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
  }
}
