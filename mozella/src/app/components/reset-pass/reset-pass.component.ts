import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-pass',
  standalone: true,
  imports: [ NavbarComponent, ReactiveFormsModule, CommonModule ],
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.css'
})
export class ResetPassComponent {
  resetForm!: FormGroup;

  errorMsg!: string;
  successMsg!: string;

  successDiv = false;
  errorDiv = false;

  displaySuccess(msg: string){
    this.successMsg = msg;
    this.resetForm.reset();
    this.successDiv = true;
    setTimeout(() => {
      this.successDiv = false
    }, 2000);
  }

  displayErrors(msg:string){
    this.errorMsg = msg
    this.resetForm.reset();
    this.errorDiv = true;
    setTimeout(() => {
      this.errorDiv = false
    }, 2000);
  }

  constructor(private authservice: AuthService, private fb: FormBuilder){
    this.resetForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]]
    })
  }

  resetPassword() {
    if(this.resetForm.valid){
      this.authservice.resetPassword(this.resetForm.value).subscribe(res =>{
        if(res.success){
          this.displaySuccess(res.success);
        } else if(res.error){
          this.displayErrors(res.error)
        }
      })
    }
  }
}
