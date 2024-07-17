import { Component, OnInit } from '@angular/core';
import { AccountserviceService } from '../accountservice.service';
import { Accountinfo } from '../accountinfo';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  userList: Accountinfo[] = [];
  errorMessage: string = '';

  constructor(private accountService: AccountserviceService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.accountService.getUsers()
      .subscribe(
        users => {
          this.userList = users;
        },
        error => {
          console.error('Error fetching users:', error);
          this.errorMessage = 'Error fetching users';
        }
      );
  }

  deleteUser(userId: string): void {
    this.accountService.deleteUser(userId)
      .subscribe(
        () => {
          // Remove the deleted user from the userList
          this.userList = this.userList.filter(user => user._id !== userId);
        },
        error => {
          console.error('Error deleting user:', error);
          // Handle error appropriately, show error message, etc.
        }
      );
  }
}
