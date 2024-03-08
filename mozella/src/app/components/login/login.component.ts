import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ RouterLink, ReactiveFormsModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  errorMsg!: string;
  successMsg!: string;

  successDiv = false;
  errorDiv = false;

  displaySuccess(msg: string){
    this.successMsg = msg;
    this.loginForm.reset();
    this.successDiv = true;
    setTimeout(() => {
      this.successDiv = false
    }, 2000);
  }

  displayErrors(msg:string){
    this.errorMsg = msg
    this.loginForm.reset();
    this.errorDiv = true;
    setTimeout(() => {
      this.errorDiv = false
    }, 2000);
  }

  constructor(private fb: FormBuilder, private authservice: AuthService){
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    })

  }
  loginUser(){
    if(this.loginForm.valid){
      this.authservice.loginUser(this.loginForm.value).subscribe(res => {
        if(res.success){
          this.displaySuccess(res.success)
        } else if(res.error) {
          this.displayErrors(res.error)
        }
      })
    } else {
      this.displayErrors('Please fill in all the fields as required')
    }
  }
}
