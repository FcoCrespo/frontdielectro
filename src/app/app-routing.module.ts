import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RecoverpassComponent } from './components/recoverpass/recoverpass.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recoverpass', component: RecoverpassComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
