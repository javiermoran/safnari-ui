import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertModel } from './models/alert.model';
import { AlertsService } from './services/alerts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  alerts: AlertModel[] = [];
  alertsChanged: Subscription;
  
  constructor(private alertsService: AlertsService) {}

  ngOnInit() {
    this.alertsChanged = this.alertsService.alertsChanged
      .subscribe((alerts) => {
        this.alerts = alerts.slice();
      }, (err) => {
        console.log(err);
      });
  }

  closeAlert(id) {
    this.alertsService.removeAlert(id);
  }

  ngOnDestroy() {
    this.alertsChanged.unsubscribe();
  }
}
