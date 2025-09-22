import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/Core/Services/products.service';
import { Category } from 'src/app/Interfaces/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  constructor(private _ProductsService:ProductsService){}

  categories:Category[] =[];

  ngOnInit(): void {
      this._ProductsService.getCategories().subscribe({
        next:(response)=>{
          this.categories = response.data;
        }
      })
  }

}
