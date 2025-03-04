import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/categories/category.service';
import { ICategories } from '../../shared/interfaces/icategories';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
    categories:ICategories[]=[]
    SPcate:ICategories[] = []
    myId:any 
    CategoryDetails:ICategories = {} as ICategories
    

private readonly categoryService = inject(CategoryService)
  private readonly activatedRoute = inject(ActivatedRoute);

  
  ngOnInit(): void {
    this.getAllCategory()




    
  }
  getAllCategory():void{
    this.categoryService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.categories = res.data
      }
    })
  }


 


}
