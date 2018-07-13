import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ClienteService } from '../services/cliente.service';
import { GLOBAL } from '../services/global';
import { Turno } from '../models/turno';
import { Assistant } from '../models/assistant';
import { TurnoService } from '../services/turno.service';
import { AssistantService } from '../services/assistant.service';

@Component({
    selector: 'turno-detail',
    templateUrl: '../views/turno-detail.html',
    providers: [ClienteService, TurnoService, AssistantService]
})
export class TurnodetailComponent implements OnInit {
    public titulo: String;
    public turno: Turno;
    public assistant: Assistant;
    public identity;
    public token;
    public url: string;
    public alertMessage;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _clienteService: ClienteService,
        private _turnoservice: TurnoService,
        private _assistanService: AssistantService
    ) {
        this.titulo = 'Detalle del Turno';
        this.url = GLOBAL.url;
        this.turno = new Turno('', '', '', '', '', 50, '');
        //this.assistant = Assistant;

        this.identity = this._clienteService.getidentity();
        this.token = this._clienteService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit() {
        console.log('turnodetail.component.cargado');
        this.getTurno();
        //GetEventos
        console.log(this.turno);
        console.log(this.assistant);
    }

    getTurno() {
        console.log('funciona el metodo');

        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._turnoservice.getTurno(this.token, id).subscribe(
                response => {
                    if (!response.turno) {
                        this._router.navigate(['/mis-eventos']);
                    } else {
                        this.turno = response.turno;

                        //Sacar asistencias
                        this._assistanService.getAsistencias(this.token, response.turno._id).subscribe(
                            response => {
                                if (!response.asistencias) {
                                    this.alertMessage = 'Este turno no tiene asistencias';
                                    console.log('if');
                                } else {
                                    this.assistant = response.asistencias;
                                    console.log(this.assistant);
                                }
                            },
                            error => {
                                var errorMessage = <any>error;
                                if (errorMessage != null) {
                                    var body = JSON.parse(error._body);
                                    this.alertMessage = body.message;
                                    console.log(error);
                                }
                            });
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
        })
    }
    print(): void {
        let printContents, popupWin;
        printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
          <html>
            <head>
              <title>Detalle de Asistencias Evento</title>
                            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
                    <link rel="stylesheet" href="assets/css/styles.css"><link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
                    
                    <link rel="icon" href="https://www.loreal-paris.com.mx/img/favicon.png" type="image/png">
                    <link rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css">
                <!-- or -->
                <link rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css"
                integrity="sha384-OHBBOqpYHNsIqQy8hL1U+8OXf9hH6QRxi0+EODezv82DfnZoV7qoHAZDwMwEJvSw"
                crossorigin="anonymous">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">

                                
            </head>
            <body onload="window.print();window.close()"><br><br>${printContents}</body>
          </html>`
        );
        popupWin.document.close();
    }
}