import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/Core/Services/cart.service';
import { CuttextPipe } from 'src/app/Core/Pipes/cuttext.pipe';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { Allorders } from 'src/app/Interfaces/allorders';




@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule,CuttextPipe],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {
constructor(private _CartService:CartService,
  private _ActivatedRoute:ActivatedRoute,
  private _AuthService:AuthService){}

userData:any;
userId:string|null = '';
allOrdersDetails:Allorders[]= [];


ngOnInit(): void {
  this._AuthService.userDeCode();
  this.userData = this._AuthService.userInfo;
  this.userId = this.userData.id;

    this._CartService.getAllOrders(this.userId).subscribe({
      next:(response)=>{
        console.log(response);
        this.allOrdersDetails = response;
        
      }
      
    })
}






}
