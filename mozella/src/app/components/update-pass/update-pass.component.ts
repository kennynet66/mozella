import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-pass',
  standalone: true,
  imports: [ NavbarComponent, CommonModule ],
  templateUrl: './update-pass.component.html',
  styleUrl: './update-pass.component.css'
})
export class UpdatePassComponent {
  errorMsg!:string;
  successMsg!:string;
  errorDiv = false;
  successDiv = false;

}
