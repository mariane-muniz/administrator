import { Injectable, EventEmitter } from '@angular/core';
import { EventInfo } from '../data/EventInfo';
import { Router } from '@angular/router';
import { MultiEventInfoData } from '../data/multi-event-info.data';
import { PageMessageData } from '../data/page-message.data';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  static event: EventEmitter<EventInfo> = new EventEmitter<EventInfo>();
  static eventMulti: EventEmitter<MultiEventInfoData> = new EventEmitter<MultiEventInfoData>();
  static message: EventEmitter<PageMessageData> = new EventEmitter<PageMessageData>();
  static sharedIds: Array<any> = [];

  constructor(private route: Router) { }

  navigateEvents(eventInfo: EventInfo) {
    if (eventInfo.action.includes("navigate_")) {
      let path = eventInfo.action
        .replace("navigate_", "/")
        .replace("[entity]", eventInfo.entity)
        .replace("[code]", eventInfo.code);
      console.log("redirect: ", path);
      this.route.navigate([path]);
    }
  }
}