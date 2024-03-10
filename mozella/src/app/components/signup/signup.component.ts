import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages'
import { AuthService } from '../../Services/auth.service';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, MessagesModule, RouterLink, NavbarComponent ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;

  errorMsg!: string;
  successMsg!: string;

  successDiv = false;
  errorDiv = false;

  displaySuccess(msg: string){
    this.successMsg = msg;
    this.signupForm.reset();
    this.successDiv = true;
    setTimeout(() => {
      this.successDiv = false
    }, 2000);
  }

  displayErrors(msg:string){
    this.errorMsg = msg
    this.signupForm.reset();
    this.errorDiv = true;
    setTimeout(() => {
      this.errorDiv = false
    }, 2000);
  }

  constructor(private fb: FormBuilder, private authservice: AuthService){
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  registerUser(){
    if(this.signupForm.valid){
      this.authservice.registerUser(this.signupForm.value).subscribe(res =>{
        if(res.success){
          this.displaySuccess(res.success)
        } else if(res.error){
          this.displayErrors(res.error)
        }
      })
    } else {
      this.displayErrors("Fill in all the fields correctly")

    }
  }
}
