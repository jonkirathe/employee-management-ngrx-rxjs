import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./services/auth.guard";

const routes: Routes = [
  { path: '*', redirectTo: 'auth/login', pathMatch: 'full'},
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'employees',
    loadChildren: () =>
      import('./components/employees/employees.module').then((m) => m.EmployeesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
