import{Injectable}from '@angular/core';
import{Http,Response,Headers,RequestOptions}from'@angular/http';
import 'rxjs/add/operator/map';
import{Observable} from 'rxjs/Observable';
import{GLOBAL}from './global';
import {Evento} from '../models/evento';

@Injectable()
export class EventoService{
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
        return this._http.get(this.url+'events/'+page,options)
                        .map(res=>res.json());
    }

    getEspacio(token,id:string){
        let headers = new Headers({
            'Content-type' : 'application/json',
            'authorization' : token
        });
        let options = new RequestOptions({headers:headers});
        return this._http.get(this.url+'event/'+id,options)
                        .map(res=>res.json());
    }

    addEspacio(token,evento:Evento){

        let params = JSON.stringify(evento);
        let headers = new Headers({
            'Content-type' : 'application/json',
            'authorization' : token
        });
        return this._http.post(this.url+'event',params,{headers:headers})
                            .map(res => res.json());
    }
    editEspacio(token,id:string, evento:Evento){

        let params = JSON.stringify(evento);
        let headers = new Headers({
            'Content-type' : 'application/json',
            'authorization' : token
        });
        return this._http.put(this.url+'event/'+id,params,{headers:headers})
                            .map(res => res.json());
    }
    borrarEspacio(token,id:string){
        let headers = new Headers({
            'Content-type' : 'application/json',
            'authorization' : token
        });
        let options = new RequestOptions({headers:headers});
        return this._http.delete(this.url+'event/'+id,options)
                        .map(res=>res.json());
    }
}//llave final de todo