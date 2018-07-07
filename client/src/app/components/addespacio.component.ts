import { Component, OnInit } from '@angular/core';
import{ Router, ActivatedRoute} from '@angular/router';

import{ GLOBAL } from '../services/global';
import{ ClienteService } from '../services/cliente.service';
import{ Espacio } from '../models/espacio';
import{ EspacioService } from '../services/espacio.service';

@Component({
	selector: 'add-espacio',
	 templateUrl: '../views/addespacio.html',
	providers: [ClienteService, EspacioService]
})

export class AddespComponent implements OnInit{
	public titulo: String;
	public espacio: Espacio;
	public identity;
	public token;
	public url: String;
	public alertMessage;

	constructor(

		private _route: ActivatedRoute,
		private _router: Router,
		private _clienteService: ClienteService,
		private _espacioService: EspacioService

	){
		this.titulo= 'Crear Espacio';
		this.identity = this._clienteService.getidentity();
		this.token= this._clienteService.getToken();
        this.url= GLOBAL.url;
        this.espacio = new Espacio('','','','','','','','',);
	}

	ngOnInit(){
		console.log('addespacio.components.ts cargado');
	}

	onSubmit(){
		console.log(this.espacio);
		this._espacioService.addEspacio(this.token,this.espacio).subscribe(
			response=>{
				this.espacio =response.espacio;

				if(!response.espacio){
					this.alertMessage= 'Error en el servidor';
				}else{
					console.log('daniel');
					this.alertMessage= 'El espacio se ha creado correctamente';
					this.espacio = response.espacio;
					this._router.navigate(['edit-espacio',response.espacio._id]);

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
	}


}