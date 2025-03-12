import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-details',
  imports: [Toast, ButtonModule],
  providers:[MessageService],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);  
  private readonly messageService = inject(MessageService);  
  IsLoading:boolean = false
  MyId: any;
  ProductDetails:IProduct = {} as IProduct
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.MyId = res.get('id');
        console.log(this.MyId);
        this.productsService.getSpecificProduct(this.MyId).subscribe({
          next: (res) => {
            console.log(res.data); // product Data
            this.ProductDetails = res.data
          },
        });
      },
    });
  }
  showSuccess(Mes:string) {
    this.messageService.add({ severity: 'success', summary: 'Fresh Cart', detail: `${Mes}` });
  }
  BuyProduct():void{
    this.IsLoading=true,
    this.cartService.AddProductToCart(this.MyId).pipe(finalize(()=>{this.IsLoading=false})).subscribe({
      next:(res)=>{
        console.log(res)
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
