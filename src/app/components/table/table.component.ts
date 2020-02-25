import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TableData} from '../../data/table.data';
import {DataTestService} from '../../services/data-test.service';
import {Subscription} from 'rxjs';
import {AdComponent} from '../../ad.component';

@Component({
  selector: 'app-component-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy, AdComponent {

  @Input() link: string;
  data: TableData;
  private subscription: Subscription;

  constructor(private dataTestService: DataTestService) { }

  ngOnInit(): void {
    this.subscription = this.dataTestService
      .getData(this.link).subscribe((tableData: TableData) => {
        this.data = tableData;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription = null;
  }
}
