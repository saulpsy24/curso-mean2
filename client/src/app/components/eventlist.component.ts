import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { GLOBAL } from '../services/global';
import { Evento } from '../models/evento';

import { EventService } from '../services/event.service';

@Component({
    selector: 'eventlist',
    templateUrl: '../views/eventlist.html',
    providers: [ClienteService, EventService]
})
export class EventlistComponent implements OnInit {
    public titulo: String;
    public eventos: Evento[];
    public identity;
    public token;
    public url: string;
    public next_page;
    public prev_page;
    public alertMessage;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _clienteService: ClienteService,
        private _eventoService: EventService
    ) {
        this.titulo = 'Eventos';
        this.identity = this._clienteService.getidentity();
        this.token = this._clienteService.getToken();
        this.url = GLOBAL.url;
        this.next_page = 1;
        this.prev_page = 1;

    }


    ngOnInit() {
        console.log('eventlist.component.cargado');
        this.getEventos();


        //GetEventos
    }
    getEventos() {
        this._route.params.forEach((params: Params) => {
            let page = +params['page'];
            if (!page) {
                page = 1;
            } else {
                this.next_page = page + 1;
                this.prev_page = page - 1;
                if (this.prev_page == 0) {
                    this.prev_page = 1;
                }
            }
            this._eventoService.getEventos(this.token, page).subscribe(
                response => {

                    if (!response.event) {
                        this.alertMessage = 'Error en el Servidor';
                        console.log('entro aqui')

                    } else {
                        this.eventos = response.event;
                        console.log(this.eventos);
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
        });

}
public confirmado;
public showoptions=0;
    onDeleteConfirm(id){
        this.confirmado=id;
        this.showoptions=1;
    }
    onCancelEvento(){
        this.confirmado=null;
        this.showoptions=0;
    }

    onDeleteEvento(id){
        this.showoptions=0;
        this._eventoService.deleteEvento(this.token,id).subscribe(
            response => {

                if (!response.event) {
                    this.alertMessage ('Error en el Servidor') ;
                    

                } else {
                    this.getEventos();
                   
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
