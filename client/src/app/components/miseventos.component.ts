import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { GLOBAL } from '../services/global';
import { Evento } from '../models/evento';
import {AssistantService} from '../services/assistant.service';
import {Assistant} from '../models/assistant';

import { EventService } from '../services/event.service';
import { ImportResolver } from '@angular/compiler';
import { FORMERR } from 'dns';

@Component({
    selector: 'eventlist',
    templateUrl: '../views/miseventos.html',
    providers: [ClienteService, EventService,AssistantService]
})
export class misEventosComponent implements OnInit {
    public titulo: String;
    public eventos: Evento[];
    public identity;
    public token;
    public url: string;
    public next_page;
    public prev_page;
    public alertMessage;
    public asistencias: Assistant[];

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _clienteService: ClienteService,
        private _eventoService: EventService,
        private _asistantService:AssistantService,
    ) {
        this.titulo = 'Mis Eventos';
        this.identity = this._clienteService.getidentity();
        this.token = this._clienteService.getToken();
        this.url = GLOBAL.url;
        this.next_page = 1;
        this.prev_page = 1;

    }


    ngOnInit() {
        console.log('eventlist.component.cargado');
        this.getMisEventos();


        //GetEventos
    }
    getMisEventos() {
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
            this._asistantService.getAsistenciasCliente(this.token, this.identity._id).subscribe(
                response => {

                    if (!response.asist) {
                        this.alertMessage = 'Error en el Servidor';
                        console.log('entro aqui')

                    } else {
                        this.asistencias = response.asist;
                        console.log(this.asistencias);
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
    onCancelAsistencia(){
        this.confirmado=null;
        this.showoptions=0;
    }

    onDeleteAsistencia(id){
        this.showoptions=0;
        this._asistantService.deleteAsistencia(this.token,id).subscribe(
            response => {

                if (!response.asist) {
                    this.alertMessage ('Error en el Servidor') ;
                    

                } else {
                    this.getMisEventos();
                   
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
