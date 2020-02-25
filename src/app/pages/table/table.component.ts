import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataTestService} from '../../services/data-test.service';
import {Subscription} from 'rxjs';
import {PageData} from '../../data/page.data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  private data: PageData;
  private entity: string;
  private routeSubscribe: Subscription;
  private serviceSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private dataTestService: DataTestService) {
  }

  ngOnInit() {
    this.routeSubscribe = this.route.paramMap.subscribe(params => {
      this.entity = 'table/' + params.get('entity');
      this.serviceSubscription = this.dataTestService
        .getData('page_table.json').subscribe(tablePageData => {
          this.data = tablePageData;
      });
    });
  }

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
    this.serviceSubscription = null;
    this.routeSubscribe.unsubscribe();
    this.routeSubscribe = null;
  }
}

