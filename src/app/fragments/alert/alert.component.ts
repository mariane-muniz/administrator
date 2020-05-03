import { Component, OnInit, Input } from '@angular/core';
import { AlertType } from './AlertTypes';

@Component({
  selector: 'fragment-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent {

  @Input("message")
  public message: string;
  @Input("type")
  public type: AlertType;
  @Input("active")
  public active: boolean = false;
  protected templateType: string = "alert-info 1";

  close() {
    this.active = false;
  }
}