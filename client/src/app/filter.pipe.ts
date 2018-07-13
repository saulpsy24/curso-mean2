import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Array<any>, term: string, brand: string, visible: string){
      if (items && items.length){
          return items.filter(item =>{
              if (term && item.province.toLowerCase().indexOf(term.toLowerCase()) === -1){
                  return false;
              }
              if (brand && item.brand.toLowerCase().indexOf(brand.toLowerCase()) === -1){
                  return false;
              }
              if (visible && item.visible.toLowerCase().indexOf(visible.toLowerCase()) === -1){
                  return false;
              }
              return true;
         })
      }
      else{
          return items;
      }
  }

}
