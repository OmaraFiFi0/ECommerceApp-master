import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';

import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-verfiypassword',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    FloatLabel,
    Message,
  ],
  templateUrl: './verfiypassword.component.html',
  styleUrl: './verfiypassword.component.scss',
})
export class VerfiypasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  VerfiyForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, Validators.required),
  });

  Submitform(): void {
    if (this.VerfiyForm.valid) {
      this.authService.SendCodeVerfiyPassword(this.VerfiyForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'Success') {
            setTimeout(() => {
              // 3- Navigate updatePassword Component
              this.router.navigate(['/updatePassword']);
            }, 500);
          }
        },
      });
    }
  }
}
