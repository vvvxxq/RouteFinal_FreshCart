import { CartService } from 'src/app/Core/Services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute,
    private _CartService:CartService){}

  cartId:string|null = '';
  isLoading:boolean=false;

  orderForm:FormGroup = new FormGroup({
    details : new FormControl(''),
    phone : new FormControl(''),
    city : new FormControl(''),

  })

  handleForm():void{
    console.log(this.orderForm.value);
    this._CartService.checkOut(this.cartId,this.orderForm.value).subscribe({
    next:(response)=>{
    console.log(response);
    if(response.status == 'success'){
      this.isLoading = true;
      window.open(response.session.url, '_self');
    }
    },
    })
    
  }

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(parms)=>{
         this.cartId = parms.get('id');
        }
      })
  }

}
