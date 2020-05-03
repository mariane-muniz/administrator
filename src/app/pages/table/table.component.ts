import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EntityActionRuleData } from 'src/app/data/entity.action.rule.data';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { EventInfo } from 'src/app/data/EventInfo';
import { DataTestService } from 'src/app/services/data-test.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  public entity: string;
  public pathParams: EntityActionRuleData;
  private routeSubscribe: Subscription;
  private entityEventSubscribe: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataTestService: DataTestService
    ) { }

  ngOnInit() {
    this.changeRoute();
    this.populateTable();
    this.subscribeEvents();
  }

  private changeRoute(): void {
    const queryParams: Params = { };
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  private subscribeEvents(): void {
    this.entityEventSubscribe = EventService.event.subscribe((event: EventInfo) => { 
      if (event.action == "table-entity-delete") { console.log("delete1");
        if(EventService.sharedIds.length == 1) { console.log("delete");
          let code = EventService.sharedIds[0][0];
          this.dataTestService.deleteRemoteData(event.entity, code)
            .subscribe(r => { this.populateTable(); });
        } 
      }
    });
  }

  private populateTable(): void {
    this.routeSubscribe = this.activatedRoute.paramMap.subscribe(params => {
      this.pathParams = new EntityActionRuleData(params.get('entity'), true, true);
    });
  }

  ngOnDestroy() {
    this.routeSubscribe.unsubscribe();
    this.entityEventSubscribe.unsubscribe();
  }
}