import { Injectable } from '@angular/core';
import { FormControl,  ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadorminmaxService {

  constructor() { }

  static max(max: number): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {
    
         let val: number = control.value;
    
         if (control.pristine || control.pristine) {
           return null;
         }
         if (val <= max) {
           return null;
         }
         return { 'max': true };
        }
    }

    static min(min: number): ValidatorFn {
      return (control: FormControl): { [key: string]: boolean } | null => {
      
           let val: number = control.value;
      
           if (control.pristine || control.pristine) {
             return null;
           }
           if (val >= min) {
             return null;
           }
           return { 'min': true };
           }
      }

      
}
