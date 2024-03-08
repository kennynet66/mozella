import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, MessagesModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  // value!: string
  signupForm!: FormGroup;
  messages: Message[] | undefined;

    ngOnInit() {
        this.messages = [{ severity: 'success', summary: 'Success', detail: 'Message Content' }];
    }
  constructor(private fb: FormBuilder){
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  registerUser(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      console.log("Invalid form");

    }
  }
}
