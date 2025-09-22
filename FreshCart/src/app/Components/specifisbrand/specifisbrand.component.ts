import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/Core/Services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specifisbrand',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specifisbrand.component.html',
  styleUrls: ['./specifisbrand.component.scss']
})
export class SpecifisbrandComponent {
  constructor(private _ProductsService:ProductsService,private _ActivatedRoute:ActivatedRoute){}

  brandId:string|null='';
  brands:any = null;

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.brandId = params.get("id")
      }
    })

      this._ProductsService.getSpecificBrand(this.brandId).subscribe({
        next:(response)=>{
          console.log(response.data);
          this.brands = response.data;
          
        }
      })
  }
}
