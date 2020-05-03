import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DataTestService } from 'src/app/services/data-test.service';
import { EventService } from 'src/app/services/event.service';
import { EventInfo } from 'src/app/data/EventInfo';
import { EntityActionRuleData } from 'src/app/data/entity.action.rule.data';
import { Subscription } from 'rxjs';
import { MultiEventInfoData } from 'src/app/data/multi-event-info.data';
import { ActionService } from 'src/app/services/action.service';
import { ActionParameterData } from 'src/app/data/action-parameter.data';

@Component({
  selector: 'fragment-btn-menu',
  templateUrl: './btn-menu.component.html',
  styleUrls: ['./btn-menu.component.css']
})
export class BtnMenuComponent implements OnInit, OnDestroy {

  @Input('path') public params: EntityActionRuleData;

  private ACTION_PATH: string = 'entity-action/search/find-by-entity';
  private dataSubscription: Subscription;
  private multiEventSubscribe: Subscription;
  public availableValues = new Map();
  public actions: EntityActionRuleData[];

  constructor(
    private dataTestService: DataTestService,
    private actionService: ActionService) {
  }

  ngOnInit() {
    this.getRemoteData(this.ACTION_PATH, this.params);
    this.subscribeEvent();
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.multiEventSubscribe.unsubscribe();
  }

  subscribeEvent() {
    this.multiEventSubscribe = EventService.eventMulti.subscribe((event: MultiEventInfoData) => {
      if (event instanceof MultiEventInfoData) this.evaluateActions(event.items.length);
    });
  }

  evaluateActions(size: number) {
    for (let index = 0; index < this.actions.length; index++) { 
      let parameter = new ActionParameterData();
      parameter.action = this.actions[index];
      parameter.size = size;
      this.changeActionState(parameter);
    } 
  }

  changeActionState(parameter: ActionParameterData) {
    let r = this.actionService.validateAction(parameter);
    parameter.action.disabled = r;
  }

  emitEvent(eventCode: string): void {
    if(EventService.sharedIds.length == 1) {
      let code = EventService.sharedIds[0][0];
      eventCode = eventCode.replace('[code]', code);
    } 
    let event = new EventInfo(this.params.entity, this.params.code, eventCode);
    console.info("event emitted: ", event);
    EventService.event.emit(event);
  }

  private getRemoteData(path: string, params: EntityActionRuleData): void {
    this.dataSubscription = this.dataTestService
      .getRemoteDataWithParams(path, params).subscribe(data => {
        console.info("buttons: ", data._embedded.entityActionModels);
        this.actions = data._embedded.entityActionModels;
        this.evaluateActions(0);
      });
  }
}