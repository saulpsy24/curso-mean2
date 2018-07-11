import{ Component, OnInit} from '@angular/core';
import{ Router, ActivatedRoute} from '@angular/router';

import{ GLOBAL } from '../services/global';
import{ ClienteService } from '../services/cliente.service';
import{ Evento } from '../models/evento';
import{Espacio} from '../models/espacio';
import { FormsModule }   from '@angular/forms';

@Component({
	selector: 'event-add',
	templateUrl: '../views/event-add.html',
	providers: [ClienteService]
})

export class EventAddComponent implements OnInit{
	public titulo: String;
	public evento: Evento;
	public identity;
	public token;
    public url: String;
    public AlertMessage;
    public filesToUpload;

	constructor(

		private _route: ActivatedRoute,
		private _router: Router,
		private _clienteService: ClienteService
	){
        this.titulo = 'Actualizar datos de Usuario';
        
		this.identity = this._clienteService.getidentity();
		this.token= this._clienteService.getToken();
		this.url= GLOBAL.url;

	}

	ngOnInit(){
		console.log('event.components.ts cargado');

		//Conseguir listado de artistas
    }
    onSubmit(){
        
        this._clienteService.update_cliente(this.evento).subscribe(
            response =>{
               // this.cliente = response.cliente;
                if(!response.cliente){
                    this.AlertMessage ='El usuario no se ha actualizado';
                }else{
                   
                    this.AlertMessage ='El usuario se ha actualizado';
                    //document.getElementById("identity_name").innerHTML =this.evento.title;
                    //document.getElementById("identity_name").innerHTML =this.cliente.surname;
                    localStorage.setItem('identity',JSON.stringify(this.evento));
                    if(!this.filesToUpload){
                        //Redireccion

                    }else{
                        //this.makeFileRequest(this.url+'upload-image-user/'+this.cliente._id,[],this.filesToUpload).then(
                           // (result:any)=>{
                             //   this.cliente.image=result.image;
                               // localStorage.setItem('identity',JSON.stringify(this.cliente));
                                //let image_path = this.url+'get-image-user/'+this.cliente.image;
                                //document.getElementById("user_image_logged").setAttribute('src',image_path);


                           // }
                       // );
                        
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
}