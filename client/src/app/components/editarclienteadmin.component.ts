import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente';
import {GLOBAL} from '../services/global';

import { UploadService } from '../services/upload.service';

@Component({

    selector: 'editarcliente',
    templateUrl: '../views/cliente-add.html',
    providers: [ClienteService,UploadService]
})

export class ClienteEditarComponent implements OnInit {
    public title: String;
    public cliente: Cliente;
    public identity;
    public token;
    public errorMessage;
    public url : string;
    public is_edit;
    public checked;
    public admin;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _clienteService: ClienteService,
        private _uploadService: UploadService
    ) {
        this.title = 'Actualiza Usuario';
        

        this.is_edit = true;
        this.url=GLOBAL.url;
        this.cliente = new Cliente('','','', '', '', '', '', '', '', '', '', '', '', '', '','','', '','ROLE_USER','');
        
        this.token=_clienteService.getToken();
        this.identity=_clienteService.getidentity();
        if(this.identity.role=='ROLE_ADMIN'){
        this.admin=true;
        console.log(this.identity);
        }else{
            this.admin=null;
            console.log(this.identity);
        }

    }
    public filesToUpload:Array<File>;
    fileChangeCliente(fileInput:any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    ngOnInit() {
        this.token=this._clienteService.getToken();
        this.identity=this._clienteService.getidentity();
        
        console.log('clienteedit.component.cargado');
        //lamar usuario por id
        this.getUsuario();
    }
    handleChange(e) {
        var isChecked = e.target.checked;
        if (isChecked) {
            console.log(isChecked);
            this.checked=true;
        }
        else {
            console.log(isChecked);
            this.checked=null;
           
        }
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
                        response.cliente.password='';
                        

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
            if(this.cliente.password==""){
                delete this.cliente.password;
            }

            this._clienteService.editCliente(this.token,id, this.cliente).subscribe(
                response => {

                    if (!response.cliente) {
                        this.errorMessage = 'Error en el Servidor';

                    } else {
                       // this.evento = response.event;
                        //this._router.navigate(['/editar-evento'],response.evento._id);
                        console.log(this.cliente);
                        this.errorMessage = 'Cliente Actualizado Correctamente';
                        //subir foto
                        if(this.filesToUpload){
                        this._uploadService.makeFileRequest(this.url+'upload-ficha/'+id,[],this.filesToUpload,this.token,'file')
                        .then(
                            (result)=>{
                                this._router.navigate(['/panel-admin']);

                                
                            },
                            (error)=>{
                                console.log(error);

                            }

                        );}
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