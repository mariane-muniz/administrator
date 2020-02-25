import {Component, OnInit} from '@angular/core';
import {DataTestService} from '../../services/data-test.service';
import {AccordionData} from '../../data/accordion.data';

@Component({
  selector: 'app-root',
  templateUrl: './action-editor.component.html',
  styleUrls: ['./action-editor.component.css']
})
export class ActionEditorComponent implements OnInit {

  title: string;
  panels: any[];

  constructor(private dataTestService: DataTestService) { }

  ngOnInit(): void {
    this.dataTestService.getData('accordion.json').subscribe((data: AccordionData) => {
      this.title = data.title;
      this.panels = data.panels;
    });
  }
}
