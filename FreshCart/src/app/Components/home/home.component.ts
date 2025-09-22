import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/Core/Services/products.service';
import { Products } from 'src/app/Interfaces/products';
import { CuttextPipe } from 'src/app/Core/Pipes/cuttext.pipe';
import { Category } from 'src/app/Interfaces/category';
import { CarouselModule,  OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/Core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/Core/Pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/Core/Services/wishlist.service';
 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CuttextPipe,CarouselModule,RouterLink,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private _ProductsService:ProductsService, 
    private _CartService:CartService, 
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService){}
  products:Products[] = [];
  categories:Category[]=[];
  term:string = '';
  wishListData:string[] = [];
  

  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next:(response) =>{
        console.log('products',response.data);
        this.products = response.data;
        
      }
    });

    this._ProductsService.getCategories().subscribe({
      next:(response) =>{
        console.log('categories',response.data);
        this.categories = response.data;
      }
    });

    this._WishlistService.getWishList().subscribe({
      next:(response)=>{
        console.log('wishlist',response.data);
      

        const newData = response.data.map((item:any)=>item._id);
        this.wishListData = newData;
         
      }
    })

  };

  addProduct(id:any,element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element,'disabled','true')


    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        console.log('addProduct',response);
      
        

        
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element,'disabled');
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(element,'disabled')
      }
    })
  };

  addFav(prodId:string|undefined):void{
    this._WishlistService.addToWishList(prodId).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
        this._WishlistService.favoriteNum.next(response.count) 

        this._WishlistService.getWishList().subscribe({
          next:(response)=>{
           this._WishlistService.favoriteNum.next(response.count) 
          }
        })
        
      }
    })
  }

  removeWishList(prodId:string|undefined):void{
    this._WishlistService.deleteWishList(prodId).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
        this._WishlistService.favoriteNum.next(response.count) 

        this._WishlistService.getWishList().subscribe({
          next:(response)=>{
           this._WishlistService.favoriteNum.next(response.count) 
          }
        })

        
      }
    })

   
  }

  categoryOptions:OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout:3000,
    autoplaySpeed:1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  mainSlidOptions:OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplaySpeed:1000
  }
  }
  


