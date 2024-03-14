import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export function matchPasswordsValidator(): ValidatorFn {
    return (control: AbstractControl) => {
        let isValid = false;
        if (control && control instanceof FormGroup) {
          let group = control as FormGroup;
          if (group.controls['password'] && group.controls['repeatPassword']) {
            isValid = group.controls['password'].value == group.controls['repeatPassword'].value;
          }
        }
        if (isValid) {
          return null;
        } else {
          return { 'passwordCheck': 'failed' }
        }
      }

  
}