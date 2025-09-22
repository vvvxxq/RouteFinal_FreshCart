import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/Core/Services/products.service';
import { Products } from 'src/app/Interfaces/products';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/Core/Pipes/cuttext.pipe';
import { CartService } from 'src/app/Core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from 'src/app/Core/Pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink,CuttextPipe,NgxPaginationModule,SearchPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit { 
  constructor(private _ProductsService:ProductsService,
    private _Renderer2:Renderer2,
    private _CartService:CartService,
    private _ToastrService:ToastrService){}

  products:Products[] = [];
  pageSize:number = 0;
  currentPage:number = 1;
  total:number =0;
  term:string = '';
  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next:(response) =>{
        console.log('products',response.data);
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results
        
      }
    });
  }

  addProduct(id:any,element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element,'disabled','true')
    
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element,'disabled');
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(element,'disabled')
      }
    })
  }

  pageChanged(event:any):void{
    this._ProductsService.getProducts(event).subscribe({
      next:(response) =>{
        console.log('products',response.data);
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results
        
      }
    });
  }
}
