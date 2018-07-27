import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from './global';

@Injectable()
export class ConsultaService {

    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }
  
    getConsultaC(token,cliente=null) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token

        });
        let options = new RequestOptions({ headers: headers });
        if(cliente==null){
            return this._http.get(this.url +'consultasc/', options).map(
                res => res.json()
            );

        }else{
            return this._http.get(this.url + 'consultasc/' + cliente, options).map(
                res => res.json()
            );

        }
        

    }
    getConsulta(token,cliente=null) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token

        });
        let options = new RequestOptions({ headers: headers });
        if(cliente==null){
            return this._http.get(this.url +'consultas/', options).map(
                res => res.json()
            );

        }else{
            return this._http.get(this.url + 'consultas/' + cliente, options).map(
                res => res.json()
            );

        }
        

    }

  

}