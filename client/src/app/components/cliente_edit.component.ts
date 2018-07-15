import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente';
import {GLOBAL} from '../services/global';

import { UploadService } from '../services/upload.service';

@Component({

    selector: 'cliente-edit',
    templateUrl: '../views/cliente-add.html',
    providers: [ClienteService,UploadService]
})

export class ClienteEditComponent implements OnInit {
    public titulo: String;
    public cliente: Cliente;
    public identity;
    public token;
    public errorMessage;
    public url : string;
    public is_edit;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _clienteService: ClienteService,
        private _uploadService: UploadService
    ) {
        this.titulo = 'Actualiza Usuario';
        
        this.is_edit = true;
        this.url=GLOBAL.url;
        // this.cliente = this.identity;

    }
    public filesToUpload:Array<File>;
    fileChangeEvent(fileInput:any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    ngOnInit() {
        
        console.log('clienteedit.component.cargado');
        //lamar usuario por id
        this.getUsuario();
    }

    getUsuario(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._clienteService.getCliente(this.token, id).subscribe(
                response => {
                    if (!response.cliente) {
                        this._router.navigate(['/']);

                    } else {

                        this.cliente = response.cliente;

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

    onSubmit(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._clienteService.editCliente(this.token,id, this.cliente).subscribe(
                response => {

                    if (!response.event) {
                        this.errorMessage = 'Error en el Servidor';

                    } else {
                       // this.evento = response.event;
                        //this._router.navigate(['/editar-evento'],response.evento._id);
                        this.errorMessage = 'Evento Actualizado Correctamente';
                        //subir foto
                        this._uploadService.makeFileRequest(this.url+'upload-image-user/'+id,[],this.filesToUpload,this.token,'image')
                        .then(
                            (result)=>{
                                this._router.navigate(['/adminpanel']);

                                
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
                        this.errorMessage = body.message
                        console.log(error);
                    }
                }
            )


        });
        console.log(this.cliente);
    }

   
    makeFileRequest(url:string,params:Array<string>,files:Array<File>){
        var token = this.token;
        return new Promise(function(resolve,reject){
            var formData:any=new FormData();
            var xhr = new XMLHttpRequest();
            for(var i=0; i< files.length;i++){
                formData.append('image',files[i],files[i].name);
            }
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4){if(xhr.status==200){
                    
                    resolve(JSON.parse(xhr.response));
                }else{
                    reject(xhr.response);
                }
                }
            }
            xhr.open('POST',url,true);
            xhr.setRequestHeader('Authorization',token);
            xhr.send(formData);
        });

    }

}