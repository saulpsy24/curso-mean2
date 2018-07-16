import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { GLOBAL } from '../services/global';
import { Evento } from '../models/evento';
import { EventService } from '../services/event.service';
import {Cliente} from '../models/cliente'

import { TurnoService } from '../services/turno.service';
import {AssistantService} from '../services/assistant.service';
import {Assistant} from '../models/assistant';
import { Turno } from '../models/turno';
@Component({
    selector: 'detalle-cliente',
    templateUrl: '../views/detalle-cliente.html',
    providers: [ClienteService, EventService, TurnoService,AssistantService]
})
export class ClienteDetailComponent implements OnInit {

    public evento: Evento;
    public identity;
    public cliente:Cliente;
    public token;
    public url: string;
    public alertMessage;
    public next_page;
    public prev_page;
    public is_edit;
    public oculto;
    public eventos:Evento[];
    public turnos:Turno[];
    public asistencias: Assistant[];
    public asistencia:Assistant;
    public selected;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _clienteService: ClienteService,
        private _turnoService: TurnoService,
        private _assistantService:AssistantService,
        private _eventoService:EventService,
    ) {
        this.is_edit = true;
       this.asistencia=new Assistant('','',null);
        this.url = GLOBAL.url;
        this.identity = this._clienteService.getidentity();
        this.token = this._clienteService.getToken();


    }
    GeneraAsistencia(turno){
        console.log(turno);
        this.asistencia.cliente=this.cliente._id;
        this.asistencia.turno=turno._id;
        this._assistantService.addAssistant(this.token, this.asistencia).subscribe(
            response => {

                if (!response.asistSaved) {
                    var body =response._body;
                    this.alertMessage =body;
                    console.log(response);
                    this.alertMessage = 'Ya te habias inscrito anteriormente';


                } else {
                    this.asistencia = response.asistSaved;
                    this.alertMessage = 'Asistencia creada Correctamente';
                    this.oculto=null;
                 this.getCliente();

                }

            },
            error => {
                var errorMessage = <any>error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    this.alertMessage = body.message
                    console.log(error);
                }
            }
        )

    }
    mostrarEventos(){
        this.oculto=true;
        this.getEventos();
    }
    mostrarTurnos(event){
        this.selected=true;
        let id = event._id;
        console.log(event);
        this.obtenerTurnos(id);
    }




    ngOnInit() {
        console.log('artistedit.component.cargado');
        //lamar evento por id
        this.getCliente();
    }

    getCliente() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            
            this._clienteService.getCliente(this.token, id).subscribe(
                response => {
                    if (!response.cliente) {
                        this._router.navigate(['/']);

                    } else {

                        this.cliente = response.cliente;
                        console.log( this.cliente)
                        //sac-ar los turnos del evento
                        this._assistantService.getAsistenciasCliente(this.token, id).subscribe(
                            response => {

                                if (!response.asist) {
                                    this.alertMessage = 'Este usuario no tiene Inscripciones';
                                    alert('No hay asistencias');


                                } else {
                                    this.asistencias = response.asist;

                                }

                            },
                            error => {
                                var errorMessage = <any>error;
                                if (errorMessage != null) {
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
                        // this.alertMessage=body.message
                        console.log(error);
                    }

                }
            )

        });

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
    }

    onDeleteAsistencia(id) {
        this.showoptions = 0;
        this._assistantService.deleteAsistencia(this.token, id).subscribe(
            response => {

                if (!response.asist) {
                    this.alertMessage('Error en el Servidor');


                } else {
                    this.getCliente();

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
obtenerTurnos(id){
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




}