import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountserviceService } from '../accountservice.service';
import { Accountinfo } from '../accountinfo';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId: string | null = null;
  editForm!: FormGroup;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get the user ID from the route parameters
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId = id;
        this.initEditForm();
      } else {
        // Handle error: user ID not provided
        console.error('User ID not provided');
        // Redirect or display error message as needed
      }
    });
  }

  initEditForm(): void {
    this.editForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });

    // Fetch user details and populate the form
    if (this.userId) {
      this.accountService.getUserById(this.userId)
        .subscribe(
          (user: Accountinfo) => {
            this.editForm.patchValue({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              password: user.password,
              gender: user.gender,
              dob: user.dob,
              address: user.address
            });
          },
          error => {
            console.error('Error fetching user details:', error);
            // Handle error: show error message, redirect, etc.
          }
        );
    }
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const userInfo = this.editForm.value;
    if (this.userId) {
      this.updateUserAccount(userInfo);
    } else {
      // Handle error: user ID not provided
      console.error('User ID not provided');
      // Redirect or display error message as needed
    }
  }

  updateUserAccount(userInfo: Accountinfo): void {
    if (!this.userId) return;
    this.accountService.updateAccount(this.userId, userInfo)
      .subscribe(
        () => {
          this.message = "User Updated Successfully";
          // Redirect or display success message as needed
          this.router.navigate(['/userlist']);
        },
        error => {
          console.error('Error updating user:', error);
          this.message = "Error: Unable to update user";
          // Handle error: show error message, redirect, etc.
        }
      );
  }
}
