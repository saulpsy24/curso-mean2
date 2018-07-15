import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { GLOBAL } from '../services/global';
import { Evento } from '../models/evento';
import {Cliente} from '../models/cliente';
import {AssistantService} from '../services/assistant.service';
import {Assistant} from '../models/assistant';

import { EventService } from '../services/event.service';
import { ImportResolver } from '@angular/compiler';
import { FORMERR } from 'dns';

@Component({
    selector: 'adminpanel',
    templateUrl: '../views/adminpanel.html',
    providers: [ClienteService, EventService,AssistantService]
})
export class adminPanelComponent implements OnInit {
    public titulo: String;
    public eventos: Evento[];
    public identity;
    public token;
    public url: string;
    public next_page;
    public prev_page;
    public alertMessage;
    public asistencias: Assistant[];
    public clientes:Cliente[];
    public busca:String;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _clienteService: ClienteService,
        private _eventoService: EventService,
        private _asistantService:AssistantService,
    ) {
        this.titulo = 'Panel Administrativo';
        this.identity = this._clienteService.getidentity();
        this.token = this._clienteService.getToken();
        this.url = GLOBAL.url;
        this.next_page = 1;
        this.prev_page = 1;
        this.busca="Cliente"
        

    }


    ngOnInit() {
        console.log('paneladmin.component.cargado');
        this.getclientes();


        //GetEventos
    }
    getclientes() {
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
            this._clienteService.getClientes(this.token).subscribe(
                response => {

                    if (!response.cliente) {
                        this.alertMessage = 'Error en el Servidor';
                        console.log('entro aqui')

                    } else {
                        this.clientes = response.cliente;
                        console.log(this.clientes);
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
        this._clienteService.onDeleteEvento(this.token,id).subscribe(
            response => {

                if (!response.cliente) {
                    this.alertMessage ('Error en el Servidor') ;
                    console.log('if delete');
                    

                } else {
                    this.getclientes();
                    console.log('daniel'+response.cliente);
                    console.log('else delete');
                }

                
            },
            error => {
                var errorMessage = <any>error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    this.alertMessage = body.message;
                    console.log(error);
                    console.log('error daniel');
                }
            }

        );

    }

    onSearchName(searchText){
        console.log(searchText);
        this._clienteService.filterName(this.token,searchText).subscribe(
            response => {

                if (!response.cliente) {
                    this.alertMessage ('Error en el Servidor') ;
                    console.log('if delete');
                    

                } else {
                    this.clientes=response.cliente;
                    console.log('daniel'+response.cliente);
                    console.log('else delete');
                }

                
            },
            error => {
                var errorMessage = <any>error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    this.alertMessage = body.message;
                    console.log(error);
                    console.log('error daniel');
                }
            }

        );


    }

    

}
