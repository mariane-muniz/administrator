import {Component, Input, OnInit} from '@angular/core';
import {AdComponent} from '../../binding/ad.component';
import {DataTestService} from '../../services/data-test.service';
import {TabData} from '../../data/tab.data';
import { EntityActionRuleData } from 'src/app/data/entity.action.rule.data';

@Component({
  selector: 'app-component-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit, AdComponent {

  @Input() link: EntityActionRuleData;
  public data: TabData[];
  firstTab = true;

  constructor(
    private dataTestService: DataTestService) {
  }

  ngOnInit() {
    let path = 'tab/' + this.link.entity;
    if (this.link.code != null) path += '/' + this.link.code;
    this.updateComponent(path);
  }

  private updateComponent(path: string): void {
    this.dataTestService.getRemoteData(path).subscribe(data => {
      this.data = data;
    });
  }
}