import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
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
      error: () => {},
    });
  }
}
