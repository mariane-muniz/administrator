import {Component, Input, OnInit} from '@angular/core';
import {AdComponent} from '../../binding/ad.component';
import {DataTestService} from '../../services/data-test.service';
import {TabData} from '../../data/tab.data';

@Component({
  selector: 'app-component-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit, AdComponent {

  @Input() link: string;
  private data: TabData[];
  firstTab = true;

  constructor(private dataTestService: DataTestService) {
  }

  ngOnInit() {
    this.dataTestService.getData('component_tab.json').subscribe(data => {
      this.data = data;
    });
  }
}
