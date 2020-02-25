import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TableData} from '../../data/table.data';

@Component({
  selector: 'app-component-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.css']
})
export class TableActionsComponent implements OnInit {

  @Input() data: TableData;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onClick(link: string, execute: string) {
    if (link !== undefined) {
      this.router.navigate([link]);
    } else if (execute !== undefined) {
      console.log('send request to remove');
    }
  }
}
