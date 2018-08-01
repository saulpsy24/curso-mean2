import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { GLOBAL } from '../services/global';
import { Evento } from '../models/evento';
import { EventService } from '../services/event.service'
import { UploadService } from '../services/upload.service'

@Component({
    selector: 'eventedit',
    templateUrl: '../views/eventadd.html',
    providers: [ClienteService, EventService, UploadService]
})
export class EventeditComponent implements OnInit {
    public titulo: String;
    public boton: String;
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
        private _uploadService:UploadService
    ) {
        this.titulo = 'EDITAR EVENTO';
        this.boton = 'Actualizar';
        this.is_edit = true;
        this.url = GLOBAL.url;
        this.evento = new Evento('', '', '', '', '','','','','','','','','');

        this.identity = this._clienteService.getidentity();
        this.token = this._clienteService.getToken();


    }
    public filesToUpload:Array<File>;
    fileChangeEvent(fileInput:any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
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



    onSubmit() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._eventService.editEvento(this.token,id, this.evento).subscribe(
                response => {

                    if (!response.event) {
                        this.alertMessage = 'Error en el Servidor';

                    } else {
                       // this.evento = response.event;
                        //this._router.navigate(['/editar-evento'],response.evento._id);
                        this.alertMessage = 'Evento Actualizado Correctamente';
                        //subir foto
                        this._uploadService.makeFileRequest(this.url+'upload-image-event/'+id,[],this.filesToUpload,this.token,'image')
                        .then(
                            (result)=>{
                                this._router.navigate(['/evento/1']);

                            },
                            (error)=>{
                                console.log(error);

                            }

                        );
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


        });
        console.log(this.evento);

    }

    
}