import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Message } from 'primeng/message';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  imports: [FormsModule, InputTextModule, FloatLabel , Message ,  ReactiveFormsModule , RouterLink] ,
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
    private readonly authService=inject(AuthService)
    private readonly router=inject(Router)
  

  ForgotForm:FormGroup=new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email ]),
  })

  SubmitForm():void{
    if(this.ForgotForm.valid){
      this.authService.SendEmailData(this.ForgotForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          if (res.statusMsg === "success") {
            setTimeout(() => {
              // 3- Navigate verifyRestCode 
              this.router.navigate(["/verifyRestCode"])
            }, 500);
          }
        }
      })
    }
  }

}
