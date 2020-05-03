import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTestService } from '../../services/data-test.service';
import { PageData } from '../../data/page.data';
import { AlertType } from 'src/app/fragments/alert/AlertTypes';
import { EntityActionRuleData } from 'src/app/data/entity.action.rule.data';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { EventInfo } from 'src/app/data/EventInfo';
import { PageMessageData } from 'src/app/data/page-message.data';

@Component({
  selector: 'app-page-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit, OnDestroy {

  public data: PageData;
  public actionsUrl: EntityActionRuleData;
  
  // Page message variables
  public active: boolean = false;
  public message: string;
  public alertType: AlertType = AlertType.ERROR;
  
  routeSubscribe: Subscription;
  messageSubscribe: Subscription;
  eventSubscribe: Subscription;

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private dataTestService: DataTestService) {
  }

  ngOnInit() {

    // this.active = true;
    // this.message = "message";
    // this.alertType = AlertType.SUCCESS;

    this.subscribeData();
    this.subscribeEvents();
    this.subscribeMessage();
  }

  private subscribeData(): void {
    this.routeSubscribe = this.activeRoute.paramMap.subscribe(params => {
      this.actionsUrl = new EntityActionRuleData(
        params.get('entity'), false, params.get('code') != undefined);
      this.actionsUrl.code = params.get('code');
      this.dataTestService.getData('page_tab.json').subscribe(tablePageData => {
          this.data = tablePageData;
        });
    });
  }

  private subscribeMessage(): void {
    this.messageSubscribe = EventService.message.subscribe((messageEvent: PageMessageData) => {
      this.active = messageEvent.active;
      this.message = messageEvent.message;
      this.alertType = messageEvent.alertType;
    });
  } 

  private subscribeEvents(): void {
    this.eventSubscribe = EventService.event.subscribe((event: EventInfo) => {
      if (event.action == 'form-entity-delete') {
        this.dataTestService.deleteRemoteData(this.actionsUrl.entity, this.actionsUrl.code)
          .subscribe(r => { this.route.navigate(['/table/' + this.actionsUrl.entity]); });
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscribe.unsubscribe();
    this.eventSubscribe.unsubscribe();
    this.messageSubscribe.unsubscribe();
  }
}