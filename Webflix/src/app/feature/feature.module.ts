import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from './comment/comment.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    MovieDetailsComponent,
    LoginComponent,
    RegisterComponent,
    MyProfileComponent,
    MovieCreateComponent,
    MovieEditComponent,
    CommentComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MyProfileComponent,
    MovieCreateComponent,
    MovieDetailsComponent,
    MovieEditComponent,
    CommentComponent,
    ModalComponent
  ]
})
export class FeatureModule { }
