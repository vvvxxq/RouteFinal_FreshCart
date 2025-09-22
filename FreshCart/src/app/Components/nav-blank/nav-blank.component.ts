 import { Component, ElementRef, HostListener, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/Core/Services/cart.service';
import { WishlistService } from 'src/app/Core/Services/wishlist.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {
  constructor(private _Router:Router, 
  private _CartService:CartService,
  private _Renderer2:Renderer2,
 private _WishlistService:WishlistService){}

  @ViewChild('navBar') navElement!:ElementRef;

  @HostListener('window:scroll')
  onScroll():void{
   if(scrollY > 500){
    this._Renderer2.addClass(this.navElement.nativeElement,'px-5');
    this._Renderer2.addClass(this.navElement.nativeElement,'shadow')
   }else{
    this._Renderer2.removeClass(this.navElement.nativeElement,'px-5');
    this._Renderer2.addClass(this.navElement.nativeElement,'shadow')
   }
  }

  cartNum:number = 0;
  favoriteNum:number = 0;
  prodId:string|undefined = '';

  ngOnInit(): void {
      this._CartService.cartNumber.subscribe({
        next:(data)=>{
          console.log(data);
          this.cartNum = data;
          
        }
      })

    
      this._CartService.getCartUser().subscribe({
        next:(response)=>{
          console.log('nav',response);
          this.cartNum = response.numOfCartItems;
          
        }
      })


      this._WishlistService.favoriteNum.subscribe({
        next:(data)=>{
          console.log(data);
          this.favoriteNum = data
          
        } 
      })

      this._WishlistService.getWishList().subscribe({
        next:(response)=>{
         this.favoriteNum = response.count
          
        }
      })

     
  }

  signOut():void{
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login'])
  }

}
