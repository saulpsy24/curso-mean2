import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ClienteService} from '../services/cliente.service';
import{GLOBAL} from '../services/global';
import {Evento} from '../models/evento';

@Component({
    selector: 'eventadd',
    templateUrl: '../views/eventadd.html',
    providers:[ClienteService]
})
export class EventaddComponent implements OnInit{
public titulo: String;
public evento:Evento;
public identity;
public token;
public url: string;

constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService:ClienteService
){
    this.titulo='Nuevo Evento';
    this.url=GLOBAL.url;
    this.evento= new Evento('','','','','');
    
    this.identity=this._clienteService.getidentity();
    this.token=this._clienteService.getToken();


}


ngOnInit(){
    
    this.identity=this._clienteService.getidentity();
    this.token=this._clienteService.getToken();
    console.log('eventadd.component.cargado');

    //GetEventos
}
onSubmit()
{
    console.log(this.evento);
}
}