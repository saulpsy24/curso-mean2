import { Component, OnInit } from '@angular/core';
import{ Router, ActivatedRoute,Params} from '@angular/router';

import{ GLOBAL } from '../services/global';
import{ ClienteService } from '../services/cliente.service';
import{ Espacio } from '../models/espacio';
import{ EventoService } from '../services/espacio.service';
import{ UploadService } from '../services/upload.service';
import { Evento } from '../models/evento';

@Component({
	selector: 'edit-espacio',
	 templateUrl: '../views/addespacio.html',
	providers: [ClienteService, EventoService,UploadService]
})

export class EditespComponent implements OnInit{
	public titulo: String;
	public evento: Evento;
	public identity;
	public token;
	public url: String;
    public alertMessage;
    public is_edit;

	constructor(

		private _route: ActivatedRoute,
		private _router: Router,
		private _clienteService: ClienteService,
		private _espacioService: EventoService,
		private _uploadService: UploadService
	){
		this.titulo= 'Editar Espacio';
		this.identity = this._clienteService.getidentity();
		this.token= this._clienteService.getToken();
        this.url= GLOBAL.url;
        this.evento = new Evento('','','','','');
        this.is_edit = true;
	}

	ngOnInit(){
        console.log('Editespacio.components.ts cargado');
        //Llamar metodo api para traer Espacio por su id
        this.getEspacio();
    }
    
    getEspacio(){
        this._route.params.forEach(( params : Params) =>{
            let id = params ['id'];

            this._espacioService.getEspacio(this.token,id).subscribe(
                response=>{
                    if(!response.espacio){
                        this._router.navigate(['/']);
                    }else{
                        this.evento = response.evento;
                    }

                },
                error=>{
                    var errorMessage = <any>error;
                    if (errorMessage != null) {
                        var body = JSON.parse(error._body);
                        // this.alertRegister = body.message;
                        console.log(error);
                    }

                }
            );
        });
}

	onSubmit(){
        console.log(this.evento);
        this._route.params.forEach(( params : Params) =>{
            let id = params ['id'];

		this._espacioService.editEspacio(this.token,id,this.evento).subscribe(
			response=>{
				if(!response.evento){
					this.alertMessage= 'Error en el servidor';
				}else{
                    this.alertMessage= 'El Evento se ha actualizado correctamente';
                    
                    this._uploadService.makeFileRequest(this.url+'/upload-image-event/'+id,[],this.filesToUpload,this.token,'image')
                        .then(
                            (result)=>{
                                this._router.navigate(['/evento',1]);
                            },(error)=>{
                                console.log(error);
                            }
                        );
                    
                    // this.espacio = response.espacio;
					// this._router.navigate(['editar-espacio'],response.espacio._id);

				}

			},
				error=>{
					var errorMessage = <any>error;
                            if (errorMessage != null) {
                                var body = JSON.parse(error._body);
                                //this.alertRegister = body.message;
                                console.log(error);
                            }
				}
		)
	});
    }
    public filesToUpload: Array<File>
	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}
}