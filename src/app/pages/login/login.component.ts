import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  sendingForm: boolean = false;
  message: string;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['username', Validators.required],
      password: ['password', Validators.required]
    })
  }

  onSubmit(): void {
    this.sendingForm = true;
    this.message = undefined;
    this.authService.login(
      this.form.controls.username.value,
      this.form.controls.password.value
    )
      .subscribe(response => {
        let token = response.headers.get('Authorization');
        localStorage.setItem('access_token', token);
        setTimeout(() => {
          this.route.navigate(['/']);  
        }, 5000);
      }, error => {
          switch (error.status) {
            case 401:
              this.message = 'Nao e possivel logar com esses dados.';
              break;
            default:
              this.message = 'Nao e possivel conectar nesse momento. [' + error.message + ']';
              break;
          }
          this.sendingForm = false;
      });
  }
}