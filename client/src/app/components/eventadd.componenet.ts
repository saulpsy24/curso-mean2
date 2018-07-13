import {Component,OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ClienteService} from '../services/cliente.service';
import{GLOBAL} from '../services/global';
import {Evento} from '../models/evento';
import{EventService} from '../services/event.service'

@Component({
    selector: 'eventadd',
    templateUrl: '../views/eventadd.html',
    providers:[ClienteService,EventService]
})
export class EventaddComponent implements OnInit{
public titulo: String;
public evento:Evento;
public identity;
public token;
public url: string;
public alertMessage;

constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService:ClienteService,
    private _eventService:EventService
){
    this.titulo='Nuevo Evento';
    this.url=GLOBAL.url;
    this.evento= new Evento('','','','','','');
    
    this.identity=this._clienteService.getidentity();
    this.token=this._clienteService.getToken();


}


ngOnInit(){
    
    this.identity=this._clienteService.getidentity();
    this.token=this._clienteService.getToken();
    console.log('eventadd.component.cargado');

    //GetEventos
}
onSubmit()
{
    console.log(this.evento);
    this._eventService.addEvento(this.token,this.evento).subscribe(
        response=>{
            
            if(!response.event){
               this.alertMessage='Error en el Servidor';

            }else{
                this.evento =response.event;
                this.alertMessage='Evento Creado Correctamente';
                this._router.navigate(['/eventedit',response.event._id]);
                
            }

        },
        error=>{
            var errorMessage= <any> error;
            if(errorMessage!=null){
                var body = JSON.parse(error._body);
                this.alertMessage=body.message
                console.log(error);
            }  
      }
    )
}
}