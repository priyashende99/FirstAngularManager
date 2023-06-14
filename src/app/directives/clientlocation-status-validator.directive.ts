import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appClientlocationStatusValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: ClientlocationStatusValidatorDirective, multi: true}]
})
export class ClientlocationStatusValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    let isValid = true;
    if(control.value.ClientLocation == 4 && control.value.Status == "Support"){
      isValid = false;
    }

    if(isValid){
      return null;
    } else {
      return {clientLocationStatus: { valid: false }}
    }
  }
}
