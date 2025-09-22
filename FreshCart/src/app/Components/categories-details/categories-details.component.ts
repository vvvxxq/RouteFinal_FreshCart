import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from 'src/app/Core/Services/products.service';
import { Category } from 'src/app/Interfaces/category';
import { CuttextPipe } from 'src/app/Core/Pipes/cuttext.pipe';

@Component({
  selector: 'app-categories-details',
  standalone: true,
  imports: [CommonModule,RouterLink,CuttextPipe],
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.scss']
})
export class CategoriesDetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductsServic:ProductsService){}

  categoryId:string|null = '';
  categoryDetails: Category = {
    name: '',
    image: '',
  }

 

  // or 
  // catogoryDetails:Category = {} as Category

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.categoryId = params.get('id')
      }
    })

      this._ProductsServic.getCategoriesDetails(this.categoryId).subscribe({
        next:(response)=>{
          this.categoryDetails = response.data
        }
      })
  }



}
