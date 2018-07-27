import { Component, OnInit } from '@angular/core';
import{ Router, ActivatedRoute} from '@angular/router';
import {Consulta} from '../models/consulta';

import{ GLOBAL } from '../services/global';
import{ ClienteService } from '../services/cliente.service';
import{ Evento } from '../models/evento';
import{ EventoService } from '../services/espacio.service';
import {ConsultaService} from '../services/consulta.service';

@Component({
	selector: 'add-espacio',
	 templateUrl: '../views/addconsulta.html',
	providers: [ClienteService, EventoService,ConsultaService],
})

export class addConsultaComponent implements OnInit{
	public titulo: String;
	public evento: Evento;
	public identity;
	public token;
	public url: String;
    public alertMessage: String;
    public consultas:Consulta[];

	constructor(

		private _clienteService: ClienteService,
        private _espacioService: EventoService,
        private _consultaService: ConsultaService,

	){
		
		this.identity = this._clienteService.getidentity();
		this.token= this._clienteService.getToken();
        this.url= GLOBAL.url;
	}

	ngOnInit(){
        this.getConsultas();
		
    }
    
   

    getConsultas() {
        
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



	onSubmit(){
		console.log(this.evento );
		this._espacioService.addEspacio(this.token,this.evento).subscribe(
			response=>{
				this.evento =response.event;

				if(!response.event){
					// this.alertMessage= 'Error en el servidor';
		console.log('prueba' );
		
		console.log(response.event );
				}else{
					console.log('else');
					this.alertMessage= 'El evento se ha creado correctamente';
					this.evento = response.event;
					// this._router.navigate(['evento/1']);

				}

			},
				error=>{
					var errorMessage = <any>error;
                            if (errorMessage != null) {
                                //this.alertRegister = body.message;
                                console.log(error );
                            }
				}
		)
	}


}