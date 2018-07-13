import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente';
import {GLOBAL} from '../services/global'

@Component({

    selector: 'cliente-edit',
    templateUrl: '../views/cliente-edit.html',
    providers: [ClienteService]
})

export class ClienteEditComponent implements OnInit {
    public titulo: String;
    public cliente: Cliente;
    public identity;
    public token;
    public AlertMessage;
    public url : string;

    constructor(
        private _clienteService: ClienteService
    ) {
        this.titulo = 'Usuario';
        this.url=GLOBAL.url;

        
        this.cliente = this.identity;

    }

    ngOnInit() {
        this.token = this._clienteService.getToken();
        this.identity = this._clienteService.getidentity();

        this.cliente=this.identity;
    }
    onSubmit(){
        
        this._clienteService.update_cliente(this.cliente).subscribe(
            response =>{
               // this.cliente = response.cliente;
                if(!response.cliente){
                    this.AlertMessage ='El usuario no se ha actualizado';
                }else{
                   
                    this.AlertMessage ='El usuario se ha actualizado';
                    document.getElementById("identity_name").innerHTML =this.cliente.name;
                    //document.getElementById("identity_name").innerHTML =this.cliente.surname;
                    localStorage.setItem('identity',JSON.stringify(this.cliente));
                    if(!this.filesToUpload){
                        //Redireccion

                    }else{
                        this.makeFileRequest(this.url+'upload-image-user/'+this.cliente._id,[],this.filesToUpload).then(
                            (result:any)=>{
                                this.cliente.image=result.image;
                                localStorage.setItem('identity',JSON.stringify(this.cliente));
                                let image_path = this.url+'get-image-user/'+this.cliente.image;
                                document.getElementById("user_image_logged").setAttribute('src',image_path);


                            }
                        );
                        
                    }
                   
                }


            },
            error=>{
                
                var errorMessage = <any>error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    this.AlertMessage = body.message;
                    console.log(error);
            }
        }
        );
    }
    public filesToUpload: Array<File>;

    fileChangeEvent(fileInput:any){
        
        this.filesToUpload=<Array<File>>fileInput.target.files;
        
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