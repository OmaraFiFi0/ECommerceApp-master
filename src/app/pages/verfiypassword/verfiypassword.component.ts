import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';

import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-verfiypassword',
  imports: [ ReactiveFormsModule, FormsModule, InputTextModule, FloatLabel,Message,Toast, ButtonModule, RouterLink],
  providers: [MessageService],
  templateUrl: './verfiypassword.component.html',
  styleUrl: './verfiypassword.component.scss',
})
export class VerfiypasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService)
  GlobalMess!:string
  VerfiyForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, Validators.required),
  });

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `The Code Is  ${this.GlobalMess}` });
}

  Submitform(): void {
    if (this.VerfiyForm.valid) {
      this.authService.SendCodeVerfiyPassword(this.VerfiyForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'Success') {
            this.GlobalMess =res.status
            this.showSuccess()
            setTimeout(() => {
              // 3- Navigate updatePassword Component
              this.router.navigate(['/updatePassword']);
            }, 1000);
          }
        },
      });
    }
  }
}
