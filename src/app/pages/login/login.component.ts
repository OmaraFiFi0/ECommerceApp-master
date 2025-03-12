import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule , FormsModule, Validators, AbstractControl  } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { Message } from 'primeng/message';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,FormsModule, InputTextModule, FloatLabel ,PasswordModule,Message , RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)
  private readonly toastrService=inject(ToastrService)
  isLoading:boolean = false;
  ErrorMesg:string=""
  isSuccess:string=""
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email ]),
    password:new FormControl(null , [Validators.required ]),
  })

  SubmitForm(): void {
    // console.log(this.loginForm.value)
    if (this.loginForm.valid) {
      this.isLoading = true; // start loading
      this.authService.SendLoginData(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === "success") {
            this.ErrorMesg="" // To Make Message false
            this.toastrService.success(`Welcome ${res.user.name}`, `Login Success`)
            setTimeout(() => {
              // 1- Save Token 
              localStorage.setItem("userToken" , res.token)
              //2- Decode Token
              this.authService.saveUserData()
              // 3- Navigate Home 
              this.router.navigate(["/home"])
            }, 500);
            this.isSuccess=res.message
          }
          this.isLoading = false; // stop loading after successful response
        },
        error: (err:HttpErrorResponse) => {
          console.log(err);
            // Show message to User
            this.ErrorMesg =err.error.message 
            
            this.isLoading = false; // stop loading after error
            console.log("Hello In Error")
        },
      });
    }
  }



  
}
