import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AccountserviceService } from '../accountservice.service';
import { Accountinfo } from '../accountinfo';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  regForm!: FormGroup;
  datasaved = false;
  message: string = '';
  
  constructor(private formbuilder: FormBuilder, private accountservice: AccountserviceService) { }
 
  ngOnInit() {
    this.setFormState();
  }
  
  setFormState(): void {
    this.regForm = this.formbuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['',[Validators.required]],
      dob: ['',[Validators.required]],
      address: ['',[Validators.required]]
    });
  }
 
  onSubmit() {
    if (this.regForm.invalid) {
      // If form is invalid, mark all fields as touched to display validation messages
      this.regForm.markAllAsTouched();
      return;
    }
    
    let userInfo = this.regForm.value;
    this.createuserAccount(userInfo);
    this.regForm.reset();
  }
  
  createuserAccount(accinfo: Accountinfo) {
    this.accountservice.createaccount(accinfo).subscribe(
      () => {
        this.datasaved = true;
        this.message = "User Registered Successfully";
      },
      (error) => {
        console.error('Error creating user:', error);
        this.message = "Error: Unable to register user";
      }
    );
  }
}
