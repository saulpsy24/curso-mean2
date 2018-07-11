import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ClienteService} from '../services/cliente.service';
import{GLOBAL} from '../services/global';
import {Evento} from '../models/evento';
import{EventService} from '../services/event.service';
import {Turno} from '../models/turno';

@Component({
    selector: 'turnoadd',
    templateUrl: '../views/turnoadd.html',
    providers:[ClienteService,EventService]
})
export class TurnoAddComponent implements OnInit{
public titulo: String;
public turno:Turno;
public identity;
public token;
public url: string;
public alertMessage;

constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService:ClienteService,
    private _eventService:EventService
){
    this.titulo='Nuevo Turno';
    this.url=GLOBAL.url;
    this.turno= new Turno('','','','','',50,'');
    
    this.identity=this._clienteService.getidentity();
    this.token=this._clienteService.getToken();


}


ngOnInit(){
    console.log('turno.component.cargado');

    //GetEventos
}

}