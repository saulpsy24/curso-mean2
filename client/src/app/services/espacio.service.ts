import{Injectable}from '@angular/core';
import{Http,Response,Headers,RequestOptions}from'@angular/http';
import 'rxjs/add/operator/map';
import{Observable} from 'rxjs/Observable';
import{GLOBAL}from './global';
import {Espacio} from '../models/espacio';

@Injectable()
export class EspacioService{
    public url: string;
    
   constructor(
       private _http:Http
    ){
        this.url = GLOBAL.url;
    }

    getEspacios(token,page){
        let headers = new Headers({
            'Content-type' : 'application/json',
            'authorization' : token
        });
        let options = new RequestOptions({headers:headers});
        return this._http.get(this.url+'spaces/'+page,options)
                        .map(res=>res.json());
    }

    getEspacio(token,id:string){
        let headers = new Headers({
            'Content-type' : 'application/json',
            'authorization' : token
        });
        let options = new RequestOptions({headers:headers});
        return this._http.get(this.url+'space/'+id,options)
                        .map(res=>res.json());
    }

    addEspacio(token,espacio:Espacio){

        let params = JSON.stringify(espacio);
        let headers = new Headers({
            'Content-type' : 'application/json',
            'authorization' : token
        });
        return this._http.post(this.url+'space',params,{headers:headers})
                            .map(res => res.json());
    }
    editEspacio(token,id:string, espacio:Espacio){

        let params = JSON.stringify(espacio);
        let headers = new Headers({
            'Content-type' : 'application/json',
            'authorization' : token
        });
        return this._http.put(this.url+'space/'+id,params,{headers:headers})
                            .map(res => res.json());
    }
    borrarEspacio(token,id:string){
        let headers = new Headers({
            'Content-type' : 'application/json',
            'authorization' : token
        });
        let options = new RequestOptions({headers:headers});
        return this._http.delete(this.url+'space/'+id,options)
                        .map(res=>res.json());
    }
}//llave final de todo