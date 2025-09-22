import { Pipe, PipeTransform } from '@angular/core';
import { Products } from 'src/app/Interfaces/products';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products:Products[], trem:string): Products[] {
    return products.filter((item)=> item.title.toLowerCase().includes(trem.toLowerCase()));
  }

}
