import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { Message } from 'primeng/message';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    FloatLabel,
    PasswordModule,
    Message,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoading: boolean = false;
  ErrorMesg: string = '';
  isSuccess: string = '';
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Za-z]\w{7,}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: [this.confirmPassword] }
  );

  SubmitForm(): void {
    // console.log(this.registerForm.value)
    if (this.registerForm.valid) {
      this.isLoading = true; // start loading
      this.authService.SendRegisterData(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.ErrorMesg = ''; // To Make Message false
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 500);
            this.isSuccess = res.message;
          }
          this.isLoading = false; // stop loading after successful response
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          // Show message to User
          this.ErrorMesg = err.error.message;
          this.isLoading = false; // stop loading after error
          console.log('Hello In Error');
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(group: AbstractControl) {
    let password = group.get('password')?.value;
    let rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { mismatch: true };
    //   if( password === rePassword){
    //     return null
    //   }else{
    //     return {mismatch:true}
    //   }
  }
}
