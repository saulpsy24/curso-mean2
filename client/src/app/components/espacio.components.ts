import{ Component, OnInit} from '@angular/core';
import{ Router, ActivatedRoute,Params} from '@angular/router';

import{ GLOBAL } from '../services/global';
import{ ClienteService } from '../services/cliente.service';
import{ EspacioService } from '../services/espacio.service';
import{ Espacio } from '../models/espacio';

@Component({
	selector: 'espacio',
	templateUrl: '../views/espacio.html',
	providers: [ClienteService,EspacioService]
})

export class EspacioComponent implements OnInit{
	public titulo: String;
	public espacios: Espacio[];
	public identity;
	public token;
	public url: String;
	public next_page;
	public prev_page;

	constructor(

		private _route: ActivatedRoute,
		private _router: Router,
		private _clienteService: ClienteService,
		private _espacioService: EspacioService
	){
		this.titulo= 'Espacio';
		this.identity = this._clienteService.getidentity();
		this.token= this._clienteService.getToken();
		this.url= GLOBAL.url;
		this.prev_page=1;
		this.next_page=1;

	}

	ngOnInit(){
		console.log('espacio.components.ts cargado');
		this.getEspacios();
		//Conseguir listado de artistas
	}

	getEspacios(){
		this._route.params.forEach((params:Params)=>{
			let page = + params['page'];
			if(!page){
				page=1;
			}else{
				this.next_page= page+1;
				this.prev_page=page-1;

				if(this.prev_page==0){
					this.prev_page=1;
				}
				// if(this.next_page==page+1){
				// 	this.next_page=page;
				// }

			}
			this._espacioService.getEspacios(this.token,page).subscribe(
				response=>{
					if(!response.espacios){
						this._router.navigate(['/']);
					}else{
						this.espacios = response.espacios;
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
			);
		});
	}
	public confirmado;
	onDeleteConfirm(id){
		this.confirmado =id;
	}
	onCancelEspacio(){
		this.confirmado=null;
	}
	onDeleteEspacio(id){
		this._espacioService.borrarEspacio(this.token,id).subscribe(
			response=>{
				if(!response.espacios){
					this._router.navigate(['/espacio',1]);
				}
					this.getEspacios();
			},
			error=>{
				var errorMessage = <any>error;
				if (errorMessage != null) {
					var body = JSON.parse(error._body);
					//this.alertRegister = body.message;
					console.log(error);
				}
			}
		);
	}
}