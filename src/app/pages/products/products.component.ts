import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../core/services/cart/cart.service';
import { finalize } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-products',
  imports: [SearchPipe , CurrencyPipe , FormsModule , Toast ,RouterLink , InputTextModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers:[MessageService ,  ButtonModule]
})
export class ProductsComponent implements OnInit {
  products:IProduct[]=[]
  currentImage: string | null = null;
    SearchText:string = "" // To Make Search Two Way Data Binding 
    IsLoading:boolean = false
    
  private readonly activatedRoute = inject(ActivatedRoute )
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly messageService = inject(MessageService)
ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe({
    next:(res)=>{
      console.log(res)
    },error:()=>{}
  })
  this.getAllProd()
}

getAllProd():void{
  this.productsService.getAllProducts().subscribe({
    next: (res) => {
      console.log(`Products${res}`)
      this.products = res.data
      console.log(this.products)
    },
  });
}

showSuccess(Mes:string) {
  this.messageService.add({ severity: 'success', summary: 'Fresh Cart', detail: `${Mes}` });
}
AddProductToCart(id:string):void{
  this.IsLoading = true
  this.cartService.AddProductToCart(id).pipe(finalize(()=>{
    this.IsLoading = false;  // إعادة تفعيل الزر بعد الانتهاء من العملية
  })).subscribe({
    next:(res)=>{console.log(res)
      if(res.status === "success"){
        this.showSuccess(res.message)
      }
    }
  })
}

ChangeImageCoverUrl(prod: IProduct, newImage: string): void {
  prod.imageCover = newImage;  // تغيير صورة الـ cover للمنتج المعين
}
}