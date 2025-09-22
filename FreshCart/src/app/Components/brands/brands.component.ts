import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/Core/Services/products.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export default class BrandsComponent {
  constructor(private _ProductsService:ProductsService){}

  brands:any[]=[];

  ngOnInit(): void {
      this._ProductsService.getAllBrands().subscribe({
        next:(response)=>{
          console.log(response.data);
          this.brands = response.data;
        }
      })
  }
}
