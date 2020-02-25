import { Component, OnInit } from '@angular/core';
import {AdComponent} from '../../ad.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AdComponent {

  data: any;
  link: string;
  isModalVisible = false;

  constructor() { }

  ngOnInit() {
  }

}
