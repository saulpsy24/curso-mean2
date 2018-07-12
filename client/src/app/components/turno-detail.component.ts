import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ClienteService } from '../services/cliente.service';
import { GLOBAL } from '../services/global';
import { Turno } from '../models/turno';
import { Assistant } from '../models/assistant';
import { TurnoService } from '../services/turno.service';
import { AssistantService} from '../services/assistant.service';

@Component({
    selector: 'turno-detail',
    templateUrl: '../views/turno-detail.html',
    providers: [ClienteService, TurnoService,AssistantService]
})
export class TurnodetailComponent implements OnInit {
    public titulo: String;
    public turno: Turno;
    public assistant: Assistant;
    public identity;
    public token;
    public url: string;
    public alertMessage;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _clienteService: ClienteService,
        private _turnoservice: TurnoService,
        private _assistanService: AssistantService
    ) {
        this.titulo = 'Detalle del Turno';
        this.url = GLOBAL.url;
        this.turno = new Turno('', '', '', '', '', 50, '');
        this.assistant = new Assistant('','');

        this.identity = this._clienteService.getidentity();
        this.token = this._clienteService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit() {
        console.log('turnodetail.component.cargado');
        this.getTurno();
        //GetEventos
        console.log(this.turno);
        console.log(this.assistant);
    }

    getTurno(){
        console.log('funciona el metodo');

        this._route.params.forEach((params:Params)=>{
            let id = params['id'];

            this._turnoservice.getTurno(this.token,id).subscribe(
                response=>{
                    if(!response.turno){
                        this._router.navigate(['/mis-eventos']);
                    }else{
                        this.turno = response.turno;
                        
                        //Sacar asistencias
                        this._assistanService.getAsistencias(this.token,response.turno._id).subscribe(
                            response=>{
                                if(!response.asistencias){
                                    this.alertMessage= 'Este turno no tiene asistencias';
                                    console.log('if');
                                }else{
                                    this.assistant = response.asistencias;
                                    console.log('else');
                                }  
                            },
                            error => {
                                var errorMessage = <any>error;
                                if (errorMessage != null) {
                                    var body = JSON.parse(error._body);
                                    this.alertMessage = body.message;
                                    console.log(error);
                                }
                            });
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
        })
    }
}