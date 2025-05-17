import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Message } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';


@Component({
  selector: 'app-updatepassword',
  imports: [ReactiveFormsModule , Message , InputTextModule, FloatLabel , FormsModule , Toast, ButtonModule, Ripple],
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.scss',
  providers: [MessageService]
})
export class UpdatepasswordComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly messageService = inject(MessageService)
  UpdatePasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required]),
  });

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Updated Password Done ..` });
}
  showInfo() {
  this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Welcome To Home Page .. ' });
}


  Submitform():void{
    if(this.UpdatePasswordForm.valid){
      this.authService.SendResetPassword(this.UpdatePasswordForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          localStorage.setItem("userToken" , res.token)
          if (res.token) {
            this.showSuccess()
            this.showInfo()
            setTimeout(() => {
              // 3- Navigate updatePassword Component
              this.router.navigate(['/home']);
            }, 700);
          }
        }
      })
    }
  }
}
