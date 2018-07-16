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
    public cliente: Cliente;
    public identity;
    public token;
    public errorMessage;
    public url:String;
   public clientHeight: number;
    

    constructor(
        private _route: ActivatedRoute,
		private _router: Router,
        private _clienteService: ClienteService,
        private _uploadService: UploadService
     
    ) {
        this.title= 'Registar'
        this.cliente = new Cliente('','','', '', '', '', '', '', '', '', '', '', '', '', '','', '','ROLE_USER','');
         this.url=GLOBAL.url;
         this.token=_clienteService.getToken();
        //  this.clientHeight = window.innerHeight; 
    }
    ngOnInit() {
        
        console.log('clienteadd.component.cargado');


    }
     
    public onSubmit() {
        console.log(this.cliente);
    this._clienteService.register(this.token,this.cliente).subscribe(
        response=>{
            
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


