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
        //  this.clientHeight = window.innerHeight; 
    }
    ngOnInit() {
        // this.token = this._clienteService.getToken();
        // this.identity = this._clienteService.getidentity();
        // console.log(this.token);
        // console.log(this.identity);
        
        console.log('clienteadd.component.cargado');


    }
    // public filesToUpload:Array<File>;
    // fileChangeEvent(fileInput:any){
    //     this.filesToUpload = <Array<File>>fileInput.target.files;
    // }
    public onSubmit() {
        console.log(this.cliente);
    this._clienteService.register(this.cliente).subscribe(
        response=>{
            
            if(!response.cliente){
               this.errorMessage='Error en el Servidor';

            }else{
                this.cliente =response.cliente;
                this._router.navigate(['/clienteedit',response.cliente._id]); 
                
                this.errorMessage = 'El registro de '+this.cliente.email+ ' se creo correctamente'
                this.cliente = new Cliente('', '', '','', '', '', '', '', '', '', '', '', '', '', '', '', '','ROLE_USER','');
               
                
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


