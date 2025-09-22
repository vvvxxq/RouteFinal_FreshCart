import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/Core/Services/wishlist.service';
import { Products } from 'src/app/Interfaces/products';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/Core/Pipes/cuttext.pipe';
import { CartService } from 'src/app/Core/Services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,RouterLink,CuttextPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
constructor(private _WishlistService:WishlistService,
  private _ToastrService:ToastrService,
  private _Renderer2:Renderer2,
  private _CartService:CartService){}

products:Products[] = [];
wishListData:string[] = [];

ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next:(response)=>{
        console.log(response);
        this.products = response.data;
        
      }
    })

    this._WishlistService.getWishList().subscribe({
      next:(response)=>{
        console.log('wishlist',response.data);

        const newData = response.data.map((item:any)=>item._id);
        this.wishListData = newData
        
      }
    })
}

addFav(prodId:string|undefined):void{
  this._WishlistService.addToWishList(prodId).subscribe({
    next:(response)=>{
      console.log(response);
      this._ToastrService.success(response.message);
      this.wishListData = response.data;
      
    }
  })
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

removeWishList(prodId:string|undefined):void{
  this._WishlistService.deleteWishList(prodId).subscribe({
    next:(response)=>{
      console.log(response);
      this._ToastrService.success(response.message);
      this.wishListData = response.data;

      const newProductData = this.products.filter((item:any) => this.wishListData.includes(item._id));
      this.products = newProductData;

      this._WishlistService.favoriteNum.next(response.count) 

      this._WishlistService.getWishList().subscribe({
        next:(response)=>{
         this._WishlistService.favoriteNum.next(response.count) 
        }
      })
    }
  })

 
}
}
