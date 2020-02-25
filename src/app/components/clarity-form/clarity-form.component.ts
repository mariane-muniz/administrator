import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AdComponent} from '../../binding/ad.component';
import {DataTestService} from '../../services/data-test.service';
import {Subscription} from 'rxjs';
import {FormData} from '../../data/form.data';

@Component({
  selector: 'app-clarity-form',
  templateUrl: './clarity-form.component.html',
  styleUrls: ['./clarity-form.component.css']
})
export class ClarityFormComponent implements OnInit, OnDestroy, AdComponent {

  @Input() link: string;
  data: FormData;
  private subscribe: Subscription;

  constructor(private dataTestService: DataTestService) {
  }

  ngOnInit() {
    this.subscribe = this.dataTestService.getData(this.link).subscribe(data => {
      this.data = data;
    });
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
    this.subscribe = null;
  }
}
