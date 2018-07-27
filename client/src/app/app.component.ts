import{ Router, ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { GLOBAL} from './services/global';
import { Cliente } from './models/cliente';
import {Notification} from './models/notyfication';
import { ClienteService } from './services/cliente.service'
import {NotificationsService} from './services/notificaciones.service'
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [ClienteService,NotificationsService]

})

export class AppComponent implements OnInit {
    public title = 'Formaciones';
    public subtitle ='CAE'
    public cliente: Cliente;
    public identity;
    public token;
    public errorMessage;
    public url:String;
   public clientHeight: number;
    public notificacion :Notification[];
    

    constructor(
        private _route: ActivatedRoute,
		private _router: Router,
        private _clienteService: ClienteService,
        private _notificationService: NotificationsService
     
    ) {
        this.cliente = new Cliente('','', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','ROLE_USER','');
         this.url=GLOBAL.url;
         this.clientHeight = window.innerHeight; 
         
    }
    ngOnInit() {
        this.token = this._clienteService.getToken();
        this.identity = this._clienteService.getidentity();
        console.log(this.token);
        console.log(this.identity);
        
        console.log(this.notificacion);
        


    }
    UpdateNotificacion(){
        this.getNotificaciones();

    }

    getNotificaciones() {
        
        
          
            this._notificationService.getNoty(this.token).subscribe(
                response => {

                    if (!response.notificaciones) {
                        alert( 'Error en el Servidor');
                        console.log('entro aqui')

                    } else {
                        this.notificacion = response.notificaciones;
                        console.log(this.notificacion);
                    }

                },
                error => {
                    var errorMessage = <any>error;
                    if (errorMessage != null) {
                        var body = JSON.parse(error._body);
                        
                        console.log(error);
                    }
                }


            );
      

}

    public onSubmit() {

        console.log(this.cliente);
        //conseguir los datos del user identificado
        this._clienteService.signup(this.cliente).subscribe(
            response => {
                console.log(response);
                let identity = response.cliente;
                this.identity = identity;

                if (!this.identity._id) {
                    alert("El usuario no esta identificado")
                }
                else {
                    localStorage.setItem('identity', JSON.stringify(identity));


                    this._clienteService.signup(this.cliente, 'true').subscribe(
                        response => {
                            let token = response.token;
                            this.token = token;
                            console.log(response);


                            if (this.token.length <= 0) {
                                alert("El token no se genero correctamente")
                            } else {

                                localStorage.setItem('token', token);
                                 //Dirigir a home al loguearse
                                this._router.navigate(['/evento',1]);

                            }

                        },
                        error => {
                            var errorMessage = <any>error;
                            if (errorMessage != null) {
                                var body = JSON.parse(error._body);
                                this.errorMessage = body.message;
                                console.log(error);
                            }
                        }
                    );
                    //crear elemento en localstorage para tener al usuario en sesión

                    //conseguir el token para enviarlo a cada petición http
                }






            },
            error => {
                var errorMessage = <any>error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    this.errorMessage = body.message;
                    console.log(error);
                }
            }
        );
    }

    logout() {
        localStorage.clear();
        this.identity = null;
        this.token = null;
        this.cliente = new Cliente('','', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','ROLE_USER','');
        this._router.navigate(['/']);
    }

}


