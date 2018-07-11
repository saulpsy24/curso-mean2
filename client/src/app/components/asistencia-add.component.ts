import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ClienteService } from '../services/cliente.service';
import { AssistantService } from '../services/assistant.service';
import { GLOBAL } from '../services/global';
import { Assistant } from '../models/assistant';
import {AssistantService} from '../services/assistant.service'

@Component({
    selector: 'assistant-add',
    templateUrl: '../views/assistant-add.html',
    providers: [ClienteService,AssistantService]
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
<<<<<<< HEAD
        private _assistantService:AssistantService
=======
        private _assistantService : AssistantService,
>>>>>>> c1172d9ce5edcd2ff1748d4ffb3047fd79bdd9fc
    ) {
        this.titulo = 'Verifica Tus Datos y Confirma tu Asistencia';
        this.url = GLOBAL.url;
        this.assistant = new Assistant('', '');

        this.identity = this._clienteService.getidentity();
        this.token = this._clienteService.getToken();

    }

    ngOnInit() {
        console.log('Assistantadd.component.cargado');
<<<<<<< HEAD
        
        console.log(this.assistant);
    }

    onSubmit(){
        // console.log(this.assistant);
=======

    }

    onSubmit() {
        console.log(this.assistant);
>>>>>>> c1172d9ce5edcd2ff1748d4ffb3047fd79bdd9fc

        this._route.params.forEach((params: Params) => {
            let turno_id = params['turno'];
            this.assistant.cliente = this.identity._id;
            this.assistant.turno = turno_id;

            this._router.navigate(['/crear-turno',turno_id]);

            console.log(this.assistant);

            // this._assistantService.addAssistant(this.token,this.assistant).subscribe(
            //     response=>{
                    
            //         if(!response.assistant){
            //            this.alertMessage='Error en el Servidor';
        
            //         }else{
            //             this.assistant =response.assistant;
            //             this.alertMessage='Asistencia Creada Correctamente';
            //             // this._router.navigate(['/crear-turno',response.turno._id]);
                        
            //         }
        
            //     },
            //     error=>{
            //         var errorMessage= <any> error;
            //         if(errorMessage!=null){
            //             var body = JSON.parse(error._body);
            //             this.alertMessage=body.message
            //             console.log(error);
            //         }  
            //   }
            // )
        }

        )
        console.log(this.assistant);
        this._assistantService.addAssistant(this.token, this.assistant).subscribe(
            response => {

                if (!response.asistSaved) {
                    this.alertMessage = 'Error en el Servidor';

                } else {
                    this.assistant = response.asistSaved;
                    this.alertMessage = 'Evento Creado Correctamente';
                    this._router.navigate(['/evento', 1]);

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
}