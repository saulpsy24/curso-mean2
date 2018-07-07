import{ Component, OnInit} from '@angular/core';
import{ Router, ActivatedRoute,Params} from '@angular/router';

import{ GLOBAL } from '../services/global';
import{ ClienteService } from '../services/cliente.service';
import{ EspacioService } from '../services/espacio.service';
import{ Espacio } from '../models/espacio';

@Component({
	selector: 'detail-espacio',
	templateUrl: '../views/detailespacio.html',
	providers: [ClienteService,EspacioService]
})

export class DetailespacioComponent implements OnInit{
	public titulo: String;
	public espacios: Espacio[];
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
		this.identity = this._clienteService.getidentity();
		this.token= this._clienteService.getToken();
		this.url= GLOBAL.url;

	}

	ngOnInit(){
		console.log('espacio.components.ts cargado');
		this.getEspacio();
		//Conseguir listado de artistas
	}

	getEspacio(){
		this._route.params.forEach((params:Params)=>{
			let id =  params['id'];
			
			this._espacioService.getEspacios(this.token,id).subscribe(
				response=>{
					if(!response.espacios){
						this._router.navigate(['/'])
					}else{
						this.espacios = response.espacios;
					}
				},
				error=>{
					var errorMessage = <any>error;
					if (errorMessage != null) {
						var body = JSON.parse(error._body);
						console.log(error);
					}
				}
			);
		});
	}
}