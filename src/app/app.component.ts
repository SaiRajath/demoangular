import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  validateForm! : FormGroup
  title = 'FormValidation';


  submitted =false;

   forbiddenCharacters(control: AbstractControl): { [key: string]: any } | null {
    const forbiddenPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/;
    const value = control.value;

    if (forbiddenPattern.test(value)) {
      return { forbiddenCharacters: true };
    }

    return null;
  }

  constructor (private formBuilder:FormBuilder){
    this.validateForm = this.formBuilder.group({
      FirstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), this.forbiddenCharacters]],
      LastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), this.forbiddenCharacters]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(4)]]

    });

   }



  submitForm() {
    console.log(this.validateForm.get('FirstName')!.getError('minLength'))
    if (this.validateForm.valid) {
      console.log('Form submitted successfully:', this.validateForm.value);
      alert('Success')

      this.validateForm = this.formBuilder.group({
        FirstName: [''],
        LastName: [''],
        email:[''],
        password:['']

      });
      window.location.reload();
    } else {
      console.log('Form has validation errors.');
      alert('Error')
    }
  }


}







