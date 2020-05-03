import {Component, OnInit, OnDestroy} from '@angular/core';
import { EventService } from './services/event.service';
import { EventInfo } from './data/EventInfo';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'backoffice';

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    EventService.event.subscribe((event: EventInfo) => {
        this.eventService.navigateEvents(event);
    })
  }

  ngOnDestroy(): void {

  }
}
