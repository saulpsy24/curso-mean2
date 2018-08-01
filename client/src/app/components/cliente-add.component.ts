import{ Router, ActivatedRoute,Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { GLOBAL} from '../services/global';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service'
import { UploadService } from '../services/upload.service'
@Component({
    selector: 'add-cliente',
    templateUrl: '../views/cliente-add.html',
    providers: [ClienteService,UploadService]

})

export class ClienteaddComponent implements OnInit {
    public title = 'Regritro de Usuarios';
    public boton = 'Agregar Cliente';
    public cliente: Cliente;
    public identity;
    public token;
    public errorMessage;
    public url:String;
   public clientHeight: number;
   public admin;
    

    constructor(
        private _route: ActivatedRoute,
		private _router: Router,
        private _clienteService: ClienteService,
        private _uploadService: UploadService
     
    ) {
        this.title= 'AÑADIR CLIENTE';
        this.boton = 'Agregar Cliente';
        this.cliente = new Cliente('','','', '', '', '', '', '', '', '', '', '', '', '', '','','', '','ROLE_USER','');
         this.url=GLOBAL.url;
         this.token=_clienteService.getToken();
         this.identity=_clienteService.getidentity();
         if(this.identity.role=='ROLE_ADMIN'){
            this.admin=true;
            console.log(this.identity);
            }else{
                this.admin=null;
                console.log(this.identity);
            }
        //  this.clientHeight = window.innerHeight; 
    }
    ngOnInit() {
        
        console.log('clienteadd.component.cargado');


    }
    toggleVisibility(evento){
        console.log(evento);

    }
    update() {
        console.log('entra');
        
      }
     
    public onSubmit() {
        
    this._clienteService.register(this.token,this.cliente).subscribe(
        
        response=>{
            console.log('es esto'+this.cliente);
            
            if(!response.cliente){
               this.errorMessage='Error en el Servidor';

            }else{
                this.errorMessage = 'El registro de '+this.cliente.email+ ' se creo correctamente';
                this.cliente =response.cliente;
                console.log(this.cliente);
                console.log('esta es la respuesta'+response.cliente);
                this._router.navigate(['/editarcliente',this.cliente._id]); 
                
               

                
                
               
                
            }

        },
        error=>{
            console.log('es error '+this.cliente);
            var errorMessage= <any> error;
            if(errorMessage!=null){
                var body = JSON.parse(error._body);
                this.errorMessage=body.message
                console.log(error);
            }  
      }
    )
}
        
}


