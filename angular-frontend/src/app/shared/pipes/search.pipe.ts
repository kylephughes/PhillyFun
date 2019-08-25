import { Pipe, PipeTransform } from '@angular/core';
import { HappyHourModel } from 'src/app/models/HappyHourModel';
@Pipe({
  name: 'filter'
})
//Search based on the resturant names
export class SearchPipe implements PipeTransform {
  transform(items: HappyHourModel[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( (hh : HappyHourModel) => {
       const name = hh.name;
       return name.toLowerCase().includes(searchText);
    });
   }
}