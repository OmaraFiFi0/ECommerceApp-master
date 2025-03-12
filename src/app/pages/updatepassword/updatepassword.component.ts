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

@Component({
  selector: 'app-updatepassword',
  imports: [ReactiveFormsModule , Message , InputTextModule, FloatLabel , FormsModule],
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.scss',
})
export class UpdatepasswordComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  UpdatePasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required]),
  });

  Submitform():void{
    if(this.UpdatePasswordForm.valid){
      this.authService.SendResetPassword(this.UpdatePasswordForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          localStorage.setItem("userToken" , res.token)
          if (res.token) {
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
