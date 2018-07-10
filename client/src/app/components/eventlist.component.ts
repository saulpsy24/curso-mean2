import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ClienteService} from '../services/cliente.service';
import{GLOBAL} from '../services/global';
import {Evento} from '../models/evento';

@Component({
    selector: 'eventlist',
    templateUrl: '../views/eventlist.html',
    providers:[ClienteService]
})
export class EventlistComponent implements OnInit{
public titulo: String;
public eventos:Evento[];
public identity;
public token;
public url: string;

constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService:ClienteService
){
    this.titulo='Eventos';
    this.identity=this._clienteService.getidentity();
    this.token=this._clienteService.getToken();
    this.url=GLOBAL.url;

}


ngOnInit(){
    console.log('eventlist.component.cargado');

    //GetEventos
}

}