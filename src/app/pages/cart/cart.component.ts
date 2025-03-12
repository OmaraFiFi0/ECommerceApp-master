import { finalize, Observable } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe , RouterLink , ConfirmDialog, ToastModule, ButtonModule , Toast, ButtonModule, Ripple , ] , 
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers:[ConfirmationService, MessageService]
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  cartDetails: ICart = {} as ICart;
  isLoading:boolean = false
   
  
  ngOnInit(): void {
    this.getCartData();
  }
  showAddSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Append', detail: `You Add an Item` });
  }
  showSubtractSuccess() {
    this.messageService.add({ severity: 'warn', summary: 'Drop', detail: `You drop an Item` });
  }

  getCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data), 
        this.cartDetails =res.data;// { Total Cart price , products[{}] }

      }, 
    });
  }
  
  upadteCount(id:string , count:number , action:string):void{
    this.isLoading=true
    this.cartService.updateCartProductQuantity(id,count).pipe(finalize(()=>{this.isLoading = false; })).subscribe({
      next:(res)=>{console.log(res)
        this.cartDetails = res.data
        if (action === 'add') {
        this.showAddSuccess();
      } else if (action === 'subtract') {
        this.showSubtractSuccess();
      }
      this.isLoading = false
      }
      
    })
  }

  deleteAllCartItems(event:Event):void{
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to Delete All items ?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
          label: 'No',
          severity: 'info',
          outlined: true,
      },
      acceptButtonProps: {
          label: 'Yes',
      },
      accept: () => {
        this.cartService.ClearAllCartItems().subscribe({
          next:(res)=>{
            console.log(res)
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'All Items Deleted ... ' });
            if(res.message === "success"){
              this.cartDetails = {} as ICart;
              setTimeout(() => {
                this.router.navigate(['/products']);  // untill Now Will Navigate To Home in fututre Make product Component 
              }, 2000);
            }
          }
        })
      },
      reject: () => {
          this.messageService.add({
              severity: 'info',
              summary: 'Rejected',
              detail: 'All Items Still In Cart',
              life: 3000,
          });
      },
  });

  }
  removeCartItem(event:Event ,id:string ):void{
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to Delete This Product ?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
          label: 'No',
          severity: 'info',
          outlined: true,
      },
      acceptButtonProps: {
          label: 'Yes',
      },
      accept: () => {
        this.cartService.removeSpecificCartItem(id).subscribe({
          next:(res)=>{
            console.log(res)
            if(res.status === "success"){
              this.cartDetails=res.data // To Edit On HTML Design 
              this.messageService.add({ severity: 'warn', summary: 'Confirmed', detail: ' This Item Deleted ... ' });
              if(res.numOfCartItems == 0){
                setTimeout(() => {
                  this.router.navigate(['/products']);  // untill Now Will Navigate To Home in fututre Make product Component 
                }, 2000);
              }
            }
          }
        })
      },
      reject: () => {
          this.messageService.add({
              severity: 'info',
              summary: 'Rejected',
              detail: ' Item Still In Cart',
              life: 3000,
          });
      },
  });

  }
  
  

  
}
