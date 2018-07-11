import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ClienteService } from '../services/cliente.service';
import { GLOBAL } from '../services/global';
import { Assistant } from '../models/assistant';

@Component({
    selector: 'assistant-add',
    templateUrl: '../views/assistant-add.html',
    providers: [ClienteService]
})
export class AssistantaddComponent implements OnInit {
    public titulo: String;
    public assistant: Assistant;
    public identity;
    public token;
    public url: string;
    public alertMessage;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _clienteService: ClienteService,
    ) {
        this.titulo = 'Crear Asistencia';
        this.url = GLOBAL.url;
        this.assistant = new Assistant('','');

        this.identity = this._clienteService.getidentity();
        this.token = this._clienteService.getToken();

    }
   
    ngOnInit() {
        console.log('Assistantadd.component.cargado');
    }

    onSumit(){
        console.log(this.assistant);

        this._route.params.forEach((params:Params) =>{
            let turno_id =params['turno'];
            this.assistant.turno = turno_id;
            console.log(this.assistant);
        }
    )
    }
}