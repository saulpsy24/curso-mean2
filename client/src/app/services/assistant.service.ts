import{Injectable}from '@angular/core';
import{Http,Response,Headers, RequestOptions}from'@angular/http';
import 'rxjs/add/operator/map';
import{Observable}from 'rxjs/Observable';
import{GLOBAL}from './global';
import { Assistant } from '../models/assistant';

@Injectable()
export class AssistantService{
    
    public url: string;
    constructor(private _http: Http){
        this.url=GLOBAL.url;
    }
    addAssistant(token, assistant: Assistant){
        let params = JSON.stringify(assistant);
        let headers= new Headers({
            'Content-Type':'application/json',
            'Authorization':token

        });
        return this._http.post(this.url+'/asist',params,{headers:headers})
                            .map(res=>res.json());

    }
    getAsistencias(token,idturno){
        let headers= new Headers({
            'Content-Type':'application/json',
            'Authorization':token

        });
        let options = new RequestOptions({headers:headers});
        return this._http.get(this.url+'asistencias/'+idturno,options).map(
            res=>res.json()
        );

    }
    getAsistenciasCliente(token,iduser){
        let headers= new Headers({
            'Content-Type':'application/json',
            'Authorization':token

        });
        let options = new RequestOptions({headers:headers});
        return this._http.get(this.url+'asistenciasc/'+iduser,options).map(
            res=>res.json()
        );

    }
}