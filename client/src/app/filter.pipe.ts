import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: Array<any>, term: string, brand: string, visible: string,name:string,email:string,establecimiento:string,phone:string) {
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
                }if (item.name) {
                    if (name && item.name.toLowerCase().indexOf(name.toLowerCase()) === -1) {
                        return false;
                    }
                }
                if (item.email) {
                    if (email && item.email.toLowerCase().indexOf(email.toLowerCase()) === -1) {
                        return false;
                    }
                } if (item.nameEstablishment) {
                    if (establecimiento && item.nameEstablishment.toLowerCase().indexOf(establecimiento.toLowerCase()) === -1) {
                        return false;
                    }
                }if (item.phone) {
                    if (phone && item.phone.indexOf(phone) === -1) {
                        return false;
                    }
                }
                return true;
            })
        }
        else {
            return items;
        }
    }

}
