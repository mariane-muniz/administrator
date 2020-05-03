import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AdComponent } from '../../binding/ad.component';
import { DataTestService } from '../../services/data-test.service';
import { Subscription } from 'rxjs';
import { FormData } from '../../data/form.data';
import { EventService } from 'src/app/services/event.service';
import { EventInfo } from 'src/app/data/EventInfo';
import { FormEntryData } from 'src/app/data/form.entry.data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EntityActionRuleData } from 'src/app/data/entity.action.rule.data';
import { PageMessageData } from 'src/app/data/page-message.data';
import { AlertType } from 'src/app/fragments/alert/AlertTypes';

@Component({
  selector: 'app-clarity-form',
  templateUrl: './clarity-form.component.html',
  styleUrls: ['./clarity-form.component.css']
})
export class ClarityFormComponent implements OnInit, OnDestroy, AdComponent {

  @Input() link: EntityActionRuleData;
  
  public form: FormGroup;

  private formSubscribe: Subscription;
  private eventSubscribe: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private dataTestService: DataTestService) {
  }

  ngOnInit() {
    this.bindingData();
    this.bindingEvents();
  }

  ngOnDestroy(): void {
    this.formSubscribe.unsubscribe();
    this.eventSubscribe.unsubscribe();
  }

  bindingData() {
    let path: string = 'form/' + this.link.entity;
    if (this.link.code != null) path += "/" + this.link.code;
    this.formSubscribe = this.dataTestService.getRemoteData(path).subscribe((data: FormData) => {
      let elements = {};
      data.entries.forEach((entry: FormEntryData) => {
        let split = entry.code.split('_');
        let code = split[1];
        elements[code] = [null];
      });
      this.form = this.formBuilder.group(elements);
      
      data.entries.forEach((entry: FormEntryData) => {
        let split = entry.code.split('_');
        let code = split[1];
        this.form.controls[code].setValue(entry.value);
        this.form.controls[code]['type'] = entry.type;
        this.form.controls[code]['label'] = entry.code;
      });
    });
  }

  bindingEvents() {
    this.eventSubscribe = EventService.event.subscribe((event: EventInfo) => {
      if (event.action.includes('create_')) {
        this.dataTestService.postRemoteData(this.form.value, this.link.entity).subscribe(r => {
          EventService.message.emit(new PageMessageData("Solicitacao de cadastro enviada.", true, AlertType.SUCCESS));
        });
      }
      if (event.action.includes('update_')) {
        if (this.form.valid) {
          this.dataTestService.putRemoteData(this.form.value, this.link.entity, this.link.code).subscribe(r => {
            console.log("fio");
            EventService.message.emit(new PageMessageData("Solicitacao de atualizacao enviada.", true, AlertType.SUCCESS));
          });
        } 
        else {
          console.error("form nao valido");
        }
      }
    });
  }
}