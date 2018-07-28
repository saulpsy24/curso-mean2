import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Consulta } from '../models/consulta';
import { Respuesta } from '../models/respuesta';

import { GLOBAL } from '../services/global';
import { ClienteService } from '../services/cliente.service';
import { Evento } from '../models/evento';
import { EventoService } from '../services/espacio.service';
import { ConsultaService } from '../services/consulta.service';

@Component({
	selector: 'add-espacio',
	templateUrl: '../views/addconsulta.html',
	providers: [ClienteService, EventoService, ConsultaService],
})

export class addConsultaComponent implements OnInit {
	public titulo: String;
	public evento: Evento;
	public consult: Consulta;
	public identity;
	public token;
	public url: String;
	public alertMessage: String;
	public consultasc: Consulta[];
	public cliente: String;
	public consultas: Consulta[];
	public respuestas: Respuesta[];
	public respuesta: Respuesta;



	constructor(
		private _route: ActivatedRoute,
		private _router: Router,

		private _clienteService: ClienteService,
		private _espacioService: EventoService,
		private _consultaService: ConsultaService,

	) {

		this.identity = this._clienteService.getidentity();
		this.token = this._clienteService.getToken();
		this.url = GLOBAL.url;
		this.consult = new Consulta('', this.identity._id, '');
		this.respuesta = new Respuesta('', '', '', '');

	}

	ngOnInit() {
		this.getConsultasc();
		this.getConsultas();
		console.log(this.cliente);


	}



	getConsultasc() {
		this.cliente = this.identity._id;

		this._consultaService.getConsultaC(this.token, this.cliente).subscribe(
			response => {

				if (!response.consultas) {
					this.alertMessage = 'Error en el Servidor';
					console.log('entro aqui')

				} else {
					this.consultasc = response.consultas;
					console.log(this.consultasc);
				}

			},
			error => {
				var errorMessage = <any>error;
				if (errorMessage != null) {
					var body = JSON.parse(error._body);
					this.alertMessage = body.message;
					console.log(error);
				}
			}


		);


	}
	onSubmitResponse() {
		this.respuesta.cliente = this.identity._id;
		



		console.log(this.respuesta);



		this._consultaService.addRespuesta(this.token, this.respuesta).subscribe(
			response => {

				if (!response.respuesta) {
					var body = response._body;
					this.alertMessage = body;
					console.log(response);


				} else {
					console.log(response.respuesta)

				}

			},
			error => {
				var errorMessage = <any>error;
				if (errorMessage != null) {
					var body = JSON.parse(error._body);
					this.alertMessage = body.message
					console.log(error);
				}
			}
		)

		this.getRespuestas(this.respuesta.consulta);

	}

	getRespuestas(id) {
		console.log(id);
		this.respuesta.consulta = id;
		this._consultaService.getRespuestasH(this.token, id).subscribe(
			response => {

				if (!response.respuestas) {
					var body = response._body;
					this.alertMessage = body;
					console.log(response);


				} else {
					this.respuestas = response.respuestas
					console.log(response.respuestas);

				}

			}, error => {
				var errorMessage = <any>error;
				if (errorMessage != null) {
					var body = JSON.parse(error._body);
					this.alertMessage = body.message
					console.log(error);
				}
			}
		)
	}


	onSubmit() {



		this.consult.cliente = this.identity._id;




		console.log(this.consult);



		this._consultaService.addconsulta(this.token, this.consult).subscribe(
			response => {

				if (!response.consulta) {
					var body = response._body;
					this.alertMessage = body;
					console.log(response);


				} else {
					this.consult = response.consulta;
					this.alertMessage = 'Consulta creada Correctamente';
					this.getConsultas();

				}

			},
			error => {
				var errorMessage = <any>error;
				if (errorMessage != null) {
					var body = JSON.parse(error._body);
					this.alertMessage = body.message
					console.log(error);
				}
			}
		)
	}


	getConsultas() {
		this.cliente = this.identity._id;

		this._consultaService.getConsulta(this.token).subscribe(
			response => {

				if (!response.consultas) {
					this.alertMessage = 'Error en el Servidor';
					console.log('entro aqui')

				} else {
					this.consultas = response.consultas;
					console.log(this.consultas);
				}

			},
			error => {
				var errorMessage = <any>error;
				if (errorMessage != null) {
					var body = JSON.parse(error._body);
					this.alertMessage = body.message;
					console.log(error);
				}
			}


		);


	}





}