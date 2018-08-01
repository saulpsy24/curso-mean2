import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { GLOBAL } from '../services/global';
import { EventService } from '../services/event.service';
import { Turno } from '../models/turno';

import { TurnoService } from '../services/turno.service';
@Component({
    selector: 'turnoedit',
    templateUrl: '../views/turnoadd.html',
    providers: [ClienteService, EventService, TurnoService]
})
export class TurnoEditComponent implements OnInit {
    public titulo: String;
    public boton: String;
    public turno: Turno;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public is_edit=true;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _clienteService: ClienteService,
        private _eventService: EventService,
        private _turnoservice: TurnoService
    ) {
        this.titulo = 'EDITAR TURNO';
        this.boton = 'Actualizar';
        this.url = GLOBAL.url;
        this.turno = new Turno('', '', '', '', '', 50, '');

        this.identity = this._clienteService.getidentity();
        this.token = this._clienteService.getToken();


    }



    ngOnInit() {
        console.log('turno.component.cargado');
        this.getTurno();


        //conseguir el album
    }
    getTurno(){
        this._route.params.forEach((params:Params)=>{
            let id=params['id'];
            this._turnoservice.getTurno(this.token,id).subscribe(
                response=>{
                    if(!response.turno){
                        this._router.navigate(['/']);
                    }else{
                        this.turno=response.turno;
                    }

                },
                error=>{
                    var errorMessage =<any>error;
                    if(errorMessage!=null){
                        var body =JSON.parse(error.body);
                        this.alertMessage =body.message;
                        console.log(error);
                    }

                }

            )            

        });
    }
    onSubmit() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            
            console.log(this.turno);
            this._turnoservice.editTurno(this.token,id, this.turno).subscribe(
                response => {
                    if(!response.turno){
                        this.alertMessage='Error en el servidor';

                    }else{
                        this.alertMessage='El turno se actualizo correctamente!';
                        this._router.navigate(['/detalle-evento',response.turno.event])
                        
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