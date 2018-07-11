import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Turno } from '../models/turno';

@Injectable()
export class TurnoService {

    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }
    addTurno(token, turno: Turno) {
        let params = JSON.stringify(turno);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token

        });
        return this._http.post(this.url + '/turno', params, { headers: headers }).map(res => res.json());

    }
    getEventos(token, eventId) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token

        });
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this.url + 'events/' + eventId, options).map(
            res => res.json()
        );

    }

    getEvento(token, id: string) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token

        });
        let options = new RequestOptions({ headers: headers });
        return this._http.get(this.url + '/event/' + id, options).map(
            res => res.json()
        );

    }

    editEvento(token, id: string, turno: Turno) {
        let params = JSON.stringify(turno);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token

        });
        return this._http.put(this.url + '/event/' + id, params, { headers: headers }).map(res => res.json());

    }
    deleteEvento(token, id: string) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token

        });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(this.url + '/event/' + id, options).map(
            res => res.json()
        );

    }
}