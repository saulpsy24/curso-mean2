import { Component, OnInit } from '@angular/core';
import{ Router, ActivatedRoute} from '@angular/router';

import{ GLOBAL } from '../services/global';
import{ ClienteService } from '../services/cliente.service';
import{ Evento } from '../models/evento';
import{ EventoService } from '../services/espacio.service';

@Component({
	selector: 'add-espacio',
	 templateUrl: '../views/addespacio.html',
	providers: [ClienteService, EventoService]
})

export class AddespComponent implements OnInit{
	public titulo: String;
	public evento: Evento;
	public identity;
	public token;
	public url: String;
	public alertMessage;

	constructor(

		private _route: ActivatedRoute,
		private _router: Router,
		private _clienteService: ClienteService,
		private _espacioService: EventoService

	){
		this.titulo = 'Crear Evento';
		this.identity = this._clienteService.getidentity();
		this.token= this._clienteService.getToken();
        this.url= GLOBAL.url;
        this.evento = new Evento('','','','','');
	}

	ngOnInit(){
		console.log('addevento.components.ts cargado');
	}

	onSubmit(){
		console.log(this.evento);
		this._espacioService.addEspacio(this.token,this.evento).subscribe(
			response=>{
				this.evento =response.evento;

				if(!response.evento){
					this.alertMessage= 'Error en el servidor';
				}else{
					console.log('daniel');
					this.alertMessage= 'El evento se ha creado correctamente';
					this.evento = response.evento;
					this._router.navigate(['event',response.evento._id]);

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