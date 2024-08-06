import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validations : Allow Alphanumeric char and space only
export class TextFieldValidator {
  static validTextField(fc: FormControl) {
    if (fc.value != undefined && fc.value != '' && fc.value != null) {
      const regex = /^[0-9a-zA-Z ]+$/;
      if (regex.test(fc.value)) {
        return null;
      } else {
        return { validTextFieldError: true };
      }
    } else {
      return null;
    }
  }
}
// Allow Numeric Char
export class NumericFieldValidator {
  static validNumericField(fc: FormControl) {
    if (fc.value != undefined && fc.value != '' && fc.value != null) {
      const regex = /[0-9]+/;
      if (regex.test(fc.value)) {
        return null;
      } else {
        return { validNumericFieldError: true };
      }
    } else {
      return null;
    }
  }
}
// Validations : Allow char and space only
export class CharFieldValidator {
  static validCharField: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Check if the value is null, undefined, or empty
    if (value === null || value === undefined || value === '') {
      return null;
    }

    // Regular expression to test for valid characters (alphabetic and spaces)
    const regex = /^[a-zA-Z ]+$/;
    const valid = regex.test(value);

    return valid ? null : { validCharFieldError: true };
  };
}
// Email Validators
export class EmailFieldValidator {
  static validEmailField(fc: FormControl) {
    if (fc.value != undefined && fc.value != '' && fc.value != null) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (regex.test(fc.value)) {
        return null;
      } else {
        return { validEmailFieldError: true };
      }
    } else {
      return null;
    }
  }
}
// Not Allowed Whitespace only
export class NoWhiteSpaceValidator {
  static noWhiteSpaceValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Check if the value is null, undefined, or empty
    if (value === null || value === undefined || value === '') {
      return null;
    }

    // Check if the trimmed value is empty (indicating whitespace only)
    const isWhiteSpace = value.toString().trim().length === 0;
    return isWhiteSpace ? { noWhiteSpaceValidatorError: true } : null;
  };
}
// validations: To check if two fieled have same values
// export function MustMatchValidator(
//   controlName: string,
//   matchingControlName: string
// ) {
//   return (formGroup: FormGroup) => {
//     // const control = formGroup.get(controlName);
//     const control = formGroup.controls[controlName];
//     const matchingControl = formGroup.controls[matchingControlName];

//     // Return if another validator has already found an error on the matchingControl
//     if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
//       return;
//     }

//     // Set error on matchingControl if validation fails
//     if (control.value !== matchingControl.value) {
//       matchingControl.setErrors({ mustMatch: true });
//     } else {
//       matchingControl.setErrors(null);
//     }
//   };
// }
export function MustMatchValidator(
  controlName: string,
  matchingControlName: string
) : ValidatorFn {
  return (ctrl : AbstractControl) : ValidationErrors | null => {
    // const control = formGroup.get(controlName);
    const control = ctrl.get([controlName]);
    const matchingControl = ctrl.get([matchingControlName]);

    // Return if another validator has already found an error on the matchingControl
    if (matchingControl!.errors && !matchingControl!.errors['mustMatch']) {
      return null;
    }

    // Set error on matchingControl if validation fails
    if (control!.value !== matchingControl!.value) {
      matchingControl!.setErrors({ mustMatch: true });
    } else {
      matchingControl!.setErrors(null);
    }

    return null;
  };
}
