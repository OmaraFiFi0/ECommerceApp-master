import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Message } from 'primeng/message';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-forgotpassword',
  imports: [FormsModule, InputTextModule, FloatLabel , Message ,  ReactiveFormsModule , RouterLink , Toast, ButtonModule, Ripple] ,
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
  providers: [MessageService]
})
export class ForgotpasswordComponent {
    private readonly authService=inject(AuthService)
    private readonly router=inject(Router)
    private readonly messageService = inject(MessageService)
    GlobalMess!:string

  ForgotForm:FormGroup=new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email ]),
  })
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Your Email Is ${this.GlobalMess}` });
}

  SubmitForm():void{
    if(this.ForgotForm.valid){
      this.authService.SendEmailData(this.ForgotForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          if (res.statusMsg === "success") {
            this.GlobalMess =res.statusMsg 
            this.showSuccess()
            setTimeout(() => {
              // 3- Navigate verifyRestCode 
              this.router.navigate(["/verifyRestCode"])
            }, 1000);
          }
        }
      })
    }
    
  }
  

}
