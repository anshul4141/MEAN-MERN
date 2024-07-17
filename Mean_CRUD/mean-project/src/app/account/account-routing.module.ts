import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { UserlistComponent } from './userlist/userlist.component';
import { LoginComponent } from './login/login.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: 'register', 
    component: RegistrationComponent
  },
  {
    path: 'userlist',
    component: UserlistComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // Corrected route definition for edit user with parameter
  {
    path: 'edit-user/:id',
    component: EditUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
