import { Component, OnInit } from '@angular/core';
import {AdComponent} from '../../binding/ad.component';
import { EntityActionRuleData } from 'src/app/data/entity.action.rule.data';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AdComponent {

  data: any;
  link: EntityActionRuleData;
  isModalVisible = false;

  constructor() { }

  ngOnInit() {
  }
}