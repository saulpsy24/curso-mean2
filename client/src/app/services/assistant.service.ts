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
}