import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NoMoviesComponent } from './no-movies/no-movies.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { AppMatchPasswordsDirective } from './directives/app-match-passwords.directive';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    NoMoviesComponent,
    ErrorMessageComponent,
    AppMatchPasswordsDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingSpinnerComponent,
    NoMoviesComponent,
    ErrorMessageComponent,
    AppMatchPasswordsDirective
  ]
})
export class SharedModule { }
