import { AlertModel } from '../models/alert.model';
import { Subject } from 'rxjs';

export class AlertsService {
  alertsChanged = new Subject<AlertModel[]>();
  alerts: AlertModel[] = [];

  addAlert(alert: AlertModel) {
    this.alerts.push(alert);
    this.alertsChanged.next(this.alerts);
  }

  removeAlert(id) {
    const index = this.alerts.findIndex((alert) => alert.id == id);
    this.alerts.splice(index, 0);
    this.alertsChanged.next(this.alerts);
  }
}
