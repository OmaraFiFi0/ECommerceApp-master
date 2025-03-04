import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/categories/category.service';
import { ActivatedRoute } from '@angular/router';
import { ICategories } from '../../shared/interfaces/icategories';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details-category',
  imports: [DatePipe],
  templateUrl: './details-category.component.html',
  styleUrl: './details-category.component.scss',
})
export class DetailsCategoryComponent implements OnInit {
  myId: any;
  CategoryDetails: ICategories = {} as ICategories;

  private readonly categoryService = inject(CategoryService);
  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.myId = res.get('id');
        console.log(this.myId);
        this.categoryService.getSpecificCategory(this.myId).subscribe({
          next: (res) => {
            this.CategoryDetails = res.data;
          },
        });
      },
    });
  }
}
