import{ Component, OnInit} from '@angular/core';
import{ Router, ActivatedRoute} from '@angular/router';


@Component({
	selector: 'home',
	templateUrl: '../views/home.html'
})

export class HomeComponent implements OnInit{
    public titulo: String;
    
	constructor(

		private _route: ActivatedRoute,
		private _router: Router
	){
		this.titulo= 'home';
	}

	ngOnInit(){
		console.log('home.components.ts cargado');

		//Conseguir listado de artistas
	}
}