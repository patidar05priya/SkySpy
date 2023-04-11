import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AuthGuard} from './guards/auth.guard';
import {AppGuard} from './guards/app.guard';
import {AddComponent} from './pages/add/add.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AppGuard]},
  {path: 'add', component: AddComponent, canActivate: [AppGuard]},
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
