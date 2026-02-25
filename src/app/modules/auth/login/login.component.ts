import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    ToastModule,
    CommonModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  showPassword: boolean = false;
  isloading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private messageService: MessageService,
    private _router: Router,
  ) {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  toggleButton(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isloading = true;
    this._loginService.login(this.loginForm.value).subscribe(
      (res) => {
        this.isloading = false;
        this._loginService.user = res;
        this._router.navigate(['./home']);
      },
      (error) => {
        this.isloading = false;
        this.messageService.add({
          severity: 'error',
          summary: error.error.message,
          styleClass: 'bg-red-100',
        });
      },
    );
  }
}
