import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataTestService} from '../../services/data-test.service';
import {Subscription} from 'rxjs';
import {PageData} from '../../data/page.data';

@Component({
  selector: 'app-page-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit, OnDestroy {

  private data: PageData;
  private routeSubscribe: Subscription;
  private entity: string;
  private serviceSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private dataTestService: DataTestService) { }

  ngOnInit() {
    this.routeSubscribe = this.route.paramMap.subscribe(params => {
      this.entity = 'tab/' + params.get('entity');
      this.serviceSubscription = this.dataTestService
        .getData('page_tab.json').subscribe(tablePageData => {
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
