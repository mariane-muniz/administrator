import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: string;
  username: FormControl;
  password: FormControl;
  rememberMe: boolean;
  valid: boolean = true;

  constructor(private route: Router) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.form = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  onSubmit(): void {
    console.log('Send form request.', JSON.stringify(this.username));
    if (this.valid) {
      console.info('Valid form');
    } else {
      console.log('invalid form');
    }
  }
}