import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { GLOBAL } from '../services/global';
import { Evento } from '../models/evento';
import { EventService } from '../services/event.service';
import { Turno } from '../models/turno';

import { TurnoService } from '../services/turno.service';
@Component({
    selector: 'turnoadd',
    templateUrl: '../views/turnoadd.html',
    providers: [ClienteService, EventService, TurnoService]
})
export class TurnoAddComponent implements OnInit {
    public titulo: String;
    public turno: Turno;
    public identity;
    public token;
    public url: string;
    public alertMessage;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _clienteService: ClienteService,
        private _eventService: EventService,
        private _turnoservice: TurnoService
    ) {
        this.titulo = 'Nuevo Turno';
        this.url = GLOBAL.url;
        this.turno = new Turno('', '', '', '', '', 50, '');

        this.identity = this._clienteService.getidentity();
        this.token = this._clienteService.getToken();


    }


    ngOnInit() {
        console.log('turno.component.cargado');

        //GetEventos
    }
    onSubmit() {
        this._route.params.forEach((params: Params) => {
            let event_id = params['evento'];
            this.turno.event = event_id;
            console.log(this.turno);
            this._turnoservice.addTurno(this.token, this.turno).subscribe(
                response => {
                    if(!response.turno){
                        this.alertMessage='Error en el servidor';

                    }else{
                        this.alertMessage='El turno se creo correctamente!';
                        this.turno=response.turno;
                        
                    }


                },error => {
                    var errorMessage =<any>error;
                    if(errorMessage!=null){
                        var body =JSON.parse(error.body);
                        this.alertMessage =body.message;
                        console.log(error);
                    }

                }

            );
        })

    }

}