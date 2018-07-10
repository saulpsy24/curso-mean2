import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(variables: any, term: any): any {
   //check if search term is undefined
   if(term ===undefined) return variables;
   //return updated array
   return variables.filter(function(variable){
     return variable.province.toLowerCase().includes(term.toLowerCase());
   })
  }

}
