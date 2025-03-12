import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { Iorders } from '../../shared/interfaces/iorders';
import test from 'node:test';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  private readonly ordersService = inject(OrdersService)
  
  OrdersDetails:Iorders[]=[]
  currentPage!:number 
  totalPage!:number
  GlobalRespo!:any


  ngOnInit(): void {
    this.AllOrders() 
  }

  AllOrders():void{
    this.ordersService.GetAllOrders().subscribe({
      next:(res)=>{
        console.log(res)
        this.GlobalRespo = res
        this.OrdersDetails = res.data
        console.log(res.metadata.currentPage) // NumberPage
        console.log(res.metadata.numberOfPages) // Total Number
        this.currentPage = res.metadata.currentPage
        this.totalPage =res.metadata.numberOfPages 
      }
    })
  }

  NextPage():void{
    if(this.currentPage < this.totalPage){
      this.currentPage++
    
    }
  }
  PrevPage():void{
    if(this.currentPage < this.totalPage){
      this.currentPage--;      
    }
    
  }
  
}
