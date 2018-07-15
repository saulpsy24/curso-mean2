import{Injectable}from '@angular/core';
import{Http,Response,Headers,RequestOptions}from'@angular/http';
import 'rxjs/add/operator/map';
import{Observable}from 'rxjs/Observable';
import{GLOBAL}from './global';

@Injectable()
export class ClienteService{
    public identity;
    public token;
    public url: string;
    constructor(private _http: Http){
        this.url=GLOBAL.url;
    }
    
    signup (cliente_to_login,gethash = null){
        if(gethash!=null){
            cliente_to_login.gethash=gethash;
        }
        let json = JSON.stringify(cliente_to_login);
        let params =json;
        let headers= new Headers ({'Content-Type':'application/json'});
        return this._http.post(this.url+'login',params,{headers:headers}).map(res =>res.json());
    }
    
    getidentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != "undefinied"){
            this.identity =identity
        }else{
            this.identity = null;
        }
        return this.identity
    }
    getToken(){
        let token = localStorage.getItem('token');
        if(token !="undefined"){
            this.token =token
        }else{
            this.token = null;
        }
        return this.token
    }
    
    update_cliente(cliente_to_update){
        let params = JSON.stringify(cliente_to_update);
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': this.getToken()
        });
        return this._http.put(this.url+'update-user/'+cliente_to_update._id,params,{headers:headers}).map(res => res.json());
        
    }
    getClientes(token){
        let headers= new Headers({
            'Content-Type':'application/json',
            'Authorization':token

        });
        let options = new RequestOptions({headers:headers});
        return this._http.get(this.url+'get-clientes/',options).map(
            res=>res.json()
        );

    }
    register(cliente){
        let json = JSON.stringify(cliente);
        let params =json;
        let headers= new Headers ({'Content-Type':'application/json'});
        return this._http.post(this.url+'register',params,{headers:headers}).map(res =>res.json());
    }
    onDeleteEvento(token,id:string){
        let headers = new Headers({
            'Content-type' : 'application/json',
            'Authorization' : token
        });
        let options = new RequestOptions({headers:headers});
        return this._http.delete(this.url+'cliente/'+id,options)
                        .map(res=>res.json());
    }

    filterName(token,name:string){
        let headers= new Headers({
            'Content-Type':'application/json',
            'Authorization':token

        });
        let options = new RequestOptions({headers:headers});
        return this._http.get(this.url+'clientenombre/'+name,options).map(
            res=>res.json()
        );

    }

    getCliente(token,id){
        let headers= new Headers({
            'Content-Type':'application/json',
            'Authorization':token

        });
        let options = new RequestOptions({headers:headers});
        return this._http.get(this.url+'cliente/'+id,options).map(
            res=>res.json()
        );

    }
    
    
    
}//llave final de todo