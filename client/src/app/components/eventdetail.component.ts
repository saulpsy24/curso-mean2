import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { GLOBAL } from '../services/global';
import { Evento } from '../models/evento';
import { EventService } from '../services/event.service';

@Component({
    selector: 'eventdetail',
    templateUrl: '../views/eventdetail.html',
    providers: [ClienteService, EventService]
})
export class EventDetailComponente implements OnInit {
  
    public evento: Evento;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public is_edit;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _clienteService: ClienteService,
        private _eventService: EventService,
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






}