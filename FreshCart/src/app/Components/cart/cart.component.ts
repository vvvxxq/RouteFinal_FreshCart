import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/Core/Services/cart.service';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/Core/Pipes/cuttext.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink,CuttextPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  constructor(private _CartService:CartService, private _Renderer2:Renderer2){}

  cartDetails:any = null;

  ngOnInit(): void {
      this._CartService.getCartUser().subscribe({
        next:(response)=>{
          console.log('getItem',response.data);
          this.cartDetails = response.data;
          
        }
      })
  }

  removeItem(id:string,element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element,'disabled','true')

    this._CartService.removeCartItem(id).subscribe({
      next:(response)=>{
        console.log('removeItem',response.data);
        this.cartDetails = response.data
        this._Renderer2.removeAttribute(element,'disabled');
        this._CartService.cartNumber.next(response.numOfCartItems);
        
      },

      error:(err)=>{
        this._Renderer2.removeAttribute(element,'disabled')
      }
    })
  }

  changeCount(id:string , count:number , el1:HTMLButtonElement , el2:HTMLButtonElement):void{

    if(count >= 1){
      this._Renderer2.setAttribute(el1,'disabled','true');
      this._Renderer2.setAttribute(el2,'disabled','true');
      this._CartService.updateCartCount(id,count).subscribe({
        next:(response)=>{
          this.cartDetails = response.data;
          console.log(response.data);
          this._Renderer2.removeAttribute(el1,'disabled');
          this._Renderer2.removeAttribute(el2,'disabled');
          
        },
        error:()=>{
          this._Renderer2.removeAttribute(el1,'disabled');
          this._Renderer2.removeAttribute(el2,'disabled');
        }
      })
      
    }
   
  }

  clear():void{
    this._CartService.clearCart().subscribe({
      next:(response)=>{
        console.log(response);
        if(response.message === "success"){
          this.cartDetails = null;
          this._CartService.cartNumber.next(0)
        }
        
      }
    })
  }
}
