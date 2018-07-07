import{ Component, OnInit} from '@angular/core';
import{ Router, ActivatedRoute} from '@angular/router';

import{ GLOBAL } from '../services/global';
import{ ClienteService } from '../services/cliente.service';
import{ Evento } from '../models/evento';
import{Espacio} from '../models/espacio';

@Component({
	selector: 'events',
	templateUrl: '../views/event-list.html',
	providers: [ClienteService]
})

export class EventListComponent implements OnInit{
	public titulo: String;
	public evento: Evento[];
	public identity;
	public token;
	public url: String;

	constructor(

		private _route: ActivatedRoute,
		private _router: Router,
		private _clienteService: ClienteService
	){
		this.titulo= 'Lista de eventos';
		this.identity = this._clienteService.getidentity();
		this.token= this._clienteService.getToken();
		this.url= GLOBAL.url;

	}

	ngOnInit(){
		console.log('event.components.ts cargado');

		//Conseguir listado de artistas
	}
}