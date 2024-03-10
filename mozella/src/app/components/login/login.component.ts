import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ RouterLink, ReactiveFormsModule, CommonModule, NavbarComponent ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  errorMsg!: string;
  successMsg!: string;

  successDiv = false;
  errorDiv = false;

  displaySuccess(msg: string, route: string){
    this.successMsg = msg;
    this.loginForm.reset();
    this.successDiv = true;
    setTimeout(() => {
      this.successDiv = false
      this.router.navigate([route])
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

  constructor(private fb: FormBuilder, private authservice: AuthService, private router: Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    })

  }
  loginUser(){
    if(this.loginForm.valid){
      this.authservice.loginUser(this.loginForm.value).subscribe(res => {
        if(res.success){
          this.authservice.checkUserDetails(res.token).subscribe(response =>{
            if(response.info.isAdmin){
              this.displaySuccess(res.success, 'admin')
            } else if(!response.info.isAdmin){
              this.displaySuccess(res.success, 'user')
            } else if(response.error){
              this.displayErrors(response.error)
            } else(
              this.displayErrors('Errors trying to login please try again later')
            )
          })
        } else if(res.error) {
          this.displayErrors(res.error)
        }
      })
    } else {
      this.displayErrors('Please fill in all the fields as required')
    }
  }
}
