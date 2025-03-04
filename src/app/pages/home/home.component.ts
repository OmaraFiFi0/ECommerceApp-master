import { OwlOptions } from './../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model.d';
import { CategoryService } from './../../core/services/categories/category.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ICategories } from '../../shared/interfaces/icategories';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CurrencyPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-home',
  imports: [CarouselModule ,RouterLink ,InputTextModule  ,CurrencyPipe   , SearchPipe ,FormsModule , Toast, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers:[MessageService]
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoryService = inject(CategoryService)
  private readonly cartService = inject(CartService)
  private readonly messageService = inject(MessageService)
  products:IProduct[]=[]
  categories:ICategories[]=[]
  SearchText:string = "" // To Make Search Two Way Data Binding 
  IsLoading:boolean = false
  customMainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:5000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  }  
customOptions: OwlOptions = {
  loop: true, // هif arrive To End Of Elements Start again
  mouseDrag: true, // if mouseDrag give next element
  touchDrag: true, // if on mobile touch give next element
  pullDrag: false, // No Make Any Thing
  dots: false, // All Dots Under Silder
  autoplay:true, // To make AutoPlay If Open Component
  autoplayHoverPause:true, // If Mouse Hove Make It Stop
  autoplayTimeout:3000, // Time To make Next Element
  navSpeed: 700,
  navText: ['<i class="fa-solid fa-backward-fast text-[#415a77]  text-2xl"></i>', '<i class="fa-solid fa-forward-fast text-[#415a77] text-2xl"></i>'],
  // This Is Icons Or Any Thing To Make Next , Prev
  responsive: { // This is Responsive 
    0: { // on 0 to 400px Show one Element
      items: 1
    },
    400: {// on 400px to 740px Show Two Element
      items: 2
    },
    740: {// on 740px to 940px Show Three Element
      items: 3
    },
    940: {// in All Screen From 940px to unlimted Show 6 Element
      items: 6
    }
  },
  nav: true // this To Show Prev,Next Buttons
}


getProductData():void{
  this.productsService.getAllProducts().subscribe({
    next: (res) => {
      console.log(`Products${res}`)
      this.products = res.data
      console.log(this.products)
    },
    
  });
}

  getCategoryData():void{
    this.categoryService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res)
        this.categories = res.data

      }
    })
  }
  ngOnInit():void {
    this.getProductData()
    this.getCategoryData()
  }

  showSuccess(Mes:string) {
    this.messageService.add({ severity: 'success', summary: 'Fresh Cart', detail: `${Mes}` });
}

  AddProductToCart(id:string):void{
    this.IsLoading = true
    this.cartService.AddProductToCart(id).subscribe({
      next:(res)=>{console.log(res)
        if(res.status === "success"){
          this.showSuccess(res.message)
          
        }
      },complete:() => {
        this.IsLoading = false;  // إعادة تفعيل الزر بعد الانتهاء من العملية
      }
      
    })
  }
}

