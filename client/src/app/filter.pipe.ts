import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: Array<any>, term: string, brand: string, visible: string,busca: string) {
        if (items && items.length) {
            return items.filter(item => {
                if(item.province){
                    if (term && item.province.toLowerCase().indexOf(term.toLowerCase()) === -1) {
                        return false;
                    }

                }
                
                if (item.brand) {
                    if (brand && item.brand.toLowerCase().indexOf(brand.toLowerCase()) === -1) {
                        return false;
                    }
                }
                if (item.visible) {
                    if (visible && item.visible.toLowerCase().indexOf(visible.toLowerCase()) === -1) {
                        return false;
                    }
                }
                if(item.name){
                    console.log(busca)
                if (busca && item.email.toLowerCase().indexOf(busca.toLowerCase()) === -1) {
                    
                    return false;
                }}
                return true;
            })
        }
        else {
            return items;
        }
    }

}
