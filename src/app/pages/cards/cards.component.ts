import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  selected: any[] = [];
  values: any[] = [];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i <= 11; i++) {
      this.values.push({
        id: i,
        name: 'Nome do produto ' + i,
        active: false
      });
    }
  }

  selectItem(index: number) {
    if (this.selected.includes(index)) {
      // tslint:disable-next-line:only-arrow-functions
      this.selected = this.selected.filter(function(item) {
        return index !== item;
      });
    } else {
      this.selected.push(index);
    }
    this.values[index].active = !this.values[index].active;
  }
}
