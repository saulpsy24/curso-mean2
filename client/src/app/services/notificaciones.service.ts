import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from './global';

@Injectable()
export class NotificationsService {

    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }
  
    getNoty(token, eventId=null) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token

        });
        let options = new RequestOptions({ headers: headers });
        if(eventId==null){
            return this._http.get(this.url + 'notify/', options).map(
                res => res.json()
            );

        }else{
            return this._http.get(this.url + 'notify/' + eventId, options).map(
                res => res.json()
            );

        }
        

    }

  

}