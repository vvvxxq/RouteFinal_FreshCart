import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/Core/Services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Core/Services/cart.service';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute, 
    private _ProductsService:ProductsService,
    private _Renderer2:Renderer2,
    private _ToastrService:ToastrService,
    private _CartService:CartService){}

  productId!:string|null;

  productDetails:any= null;

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          this.productId = params.get('id');
        }
      });

      this._ProductsService.getProductDetails(this.productId).subscribe({
        next:({data})=>{
          console.log(data);
          this.productDetails = data;
          
        }
      })


  };

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
  };

  productDetailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }
}
