import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {TableData} from '../../data/table.data';
import {DataTestService} from '../../services/data-test.service';
import { BehaviorSubject, Subscription} from 'rxjs';
import { EntityActionRuleData } from 'src/app/data/entity.action.rule.data';
import { EventService } from 'src/app/services/event.service';
import { MultiEventInfoData } from 'src/app/data/multi-event-info.data';

@Component({
  selector: 'app-component-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  @Input() path: EntityActionRuleData;
  data: TableData;
  lock = true;
  dataSubscribe: Subscription;

  constructor(
    private dataTestService: DataTestService) { }

  ngOnInit(): void {
    this.populate();
  }

  ngOnDestroy(): void {
    this.dataSubscribe.unsubscribe();
  }

  selectionChanged(event) {
    EventService.sharedIds = event;
    EventService.eventMulti.emit(new MultiEventInfoData(this.path.entity, event));
  }

  populate(): void {
    let path: string = 'table/' + this.path.entity;
    this.dataSubscribe = this.dataTestService.getRemoteData(path).subscribe((tableData: TableData) => {
        this.data = tableData;
    },
    (error) => {
      console.warn(error);
      this.lock = true;
    },
    () => {
      console.log("requisicao de tabela");
    });
  }
}
