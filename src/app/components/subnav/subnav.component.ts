import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {Link} from '../../data/Link';
import {DataTestService} from '../../services/data-test.service';

@Component({
  selector: 'app-component-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.css']
})
export class SubnavComponent implements OnInit {

  public links: Link[];

  constructor(private navigationService: NavigationService,
              private testService: DataTestService) { }

  ngOnInit() {
    // this.navigationService.getLinks('links').subscribe(links => {
    //   this.links = links;
    // });

    this.testService.getData('links.json').subscribe(links => {
      this.links = links;
    });
  }
}
