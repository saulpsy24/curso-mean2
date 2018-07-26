import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { GLOBAL } from '../services/global';
import { Evento } from '../models/evento';
import { EventService } from '../services/event.service';

import { TurnoService } from '../services/turno.service';
import { TurnoAddComponent } from './turnoadd.component';
import { Turno } from '../models/turno'

@Component({
    selector: 'eventdetail',
    templateUrl: '../views/eventdetail.html',
    providers: [ClienteService, EventService, TurnoService]
})
export class EventDetailComponente implements OnInit {

    public evento: Evento;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public is_edit;
    public turnos: Turno[];
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _clienteService: ClienteService,
        private _eventService: EventService,
        private _turnoService: TurnoService
    ) {
        this.is_edit = true;
        this.url = GLOBAL.url;
        this.identity = this._clienteService.getidentity();
        this.token = this._clienteService.getToken();


    }



    ngOnInit() {
        console.log('artistedit.component.cargado');
        //lamar evento por id
        this.getEvento();
    }

    getEvento() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._eventService.getEvento(this.token, id).subscribe(
                response => {
                    if (!response.event) {
                        this._router.navigate(['/']);

                    } else {

                        this.evento = response.event;
                        //sacar los turnos del evento
                        this._turnoService.getTurnos(this.token, id).subscribe(
                            response => {

                                if (!response.turnos) {
                                    this.alertMessage = 'Este evento no tiene turnos';


                                } else {
                                    this.turnos = response.turnos;

                                }

                            },
                            error => {
                                var errorMessage = <any>error;
                                if (errorMessage != null) {
                                    var body = JSON.parse(error._body);
                                    // this.alertMessage=body.message
                                    console.log(error);
                                }
                            }
                        );

                    }
                },
                error => {
                    var errorMessage = <any>error;
                    if (errorMessage != null) {
                        var body = JSON.parse(error._body);
                        // this.alertMessage=body.message
                        console.log(error);
                    }

                }
            )

        });

    }

public acciones = null;
MostrarAcciones(id){
    this.acciones=id;
}


    public confirmado;
    public showoptions = 0;
    onDeleteConfirm(id) {
        this.confirmado = id;
        this.showoptions = 1;
        

    }
    onCancelTurno() {
        this.confirmado = null;
        this.showoptions = 0;
        this.acciones=null;
    }

    onDeleteTurno(id) {
        this.acciones=null;
        this.showoptions = 0;
        this._turnoService.deleteTurno(this.token, id).subscribe(
            response => {

                if (!response.turno) {
                    this.alertMessage('Error en el Servidor');


                } else {
                    this.getEvento();

                }

            },
            error => {
                var errorMessage = <any>error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    this.alertMessage = body.message;
                    console.log(error);
                }
            }

        );

    }






}