import { Component, inject, input, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  // @Input() isLogin:boolean=true    ==> No You Can 
  isLogin = input<boolean>(true)  // This is better preformance 
  private readonly authService = inject(AuthService)
  
  // To Make LogOut
  IsLogOut():void{
    this.authService.LogOut()
  }


  isNavbarOpen = false;

  toggleNavbar():void {
    this.isNavbarOpen = !this.isNavbarOpen;
    console.log(this.isNavbarOpen)
  }


}
