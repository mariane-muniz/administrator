import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {Link} from '../../data/Link';
import {DataTestService} from '../../services/data-test.service';

@Component({
  selector: 'app-component-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public links: Link[];

  constructor(private navigationService: NavigationService,
              private dataTestService: DataTestService) { }

  ngOnInit() {
    // this.navigationService.getLinks('links').subscribe(links => {
    //   this.links = links;
    // });
    this.dataTestService.getData('links.json').subscribe(links => {
      this.links = links;
    });
  }
}
