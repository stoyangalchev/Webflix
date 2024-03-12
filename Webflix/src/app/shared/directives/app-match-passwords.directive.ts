import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {matchPasswordsValidator} from "./app-match-passwords-validator"



@Directive({
  selector: '[appAppMatchPasswords]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AppMatchPasswordsDirective, multi: true }]
})
export class AppMatchPasswordsDirective implements Validator {
  private valFn;

  constructor() {
    this.valFn = matchPasswordsValidator();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.valFn(c);
  }

}