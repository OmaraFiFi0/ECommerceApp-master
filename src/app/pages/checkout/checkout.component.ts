import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule , TextareaModule , FormsModule , FloatLabel ,Message ,InputTextModule ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
  checkOutForm!:FormGroup
  cartId:string = ""
  isLoading:boolean=false
  private readonly formBuilder = inject(FormBuilder)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly ordersService = inject(OrdersService)
  private readonly router = inject(Router)


  ngOnInit(): void {
    this.initForm()
    this.getCartId()
  }
  initForm():void{
    this.checkOutForm = this.formBuilder.group({
      details:[null , [Validators.required]],
      phone:[null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city:[null , [Validators.required]],
    })
  }
  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(para)=>{
        this.cartId = para.get('id')!
        console.log(this.cartId)
      }
    })
  }
  subimtForm():void{
    console.log(this.checkOutForm.value) // {details , city , phone}
    console.log(this.cartId )
    console.log(this.checkOutForm )
    this.ordersService.checkOutPayMent(this.cartId , this.checkOutForm.value).pipe(finalize(()=>{this.isLoading=false})).subscribe({
      next:(res)=>{
        this.isLoading  = true
        console.log(res)
        if(res.status === "success"){
          open(res.session.url, "_self")
        }
      }
    })
  }
  
  CheckDeliverySubmit():void{
    this.ordersService.checkOutPayMent(this.cartId , this.checkOutForm.value).pipe(finalize(()=>{this.isLoading=false})).subscribe({
      next:(res)=>{
        this.isLoading  = true
        console.log(res)
        if(res.status === "success"){
          this.router.navigate(['/allorders']);  // IF Click Check Delivery 
        }
      }
    })
  }

}

