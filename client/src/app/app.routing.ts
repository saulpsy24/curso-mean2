import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Import Cliente   
import { ClienteEditComponent } from './components/cliente_edit.component';

//Import Espacio
import { EspacioComponent } from './components/espacio.components';
import { AddespComponent } from './components/addespacio.component';
import { EditespComponent } from './components/editespacio.component';
import { DetailespacioComponent } from './components/detailespacio.component';
//import EVENTO

import {EventlistComponent} from  './components/eventlist.component'

import {EventaddComponent} from './components/eventadd.componenet';
//Import Home
import { HomeComponent } from './components/home.component';
//import { EventAddComponent } from './components/event-add.component';

const appRoutes: Routes = [

    { path: '', component: ClienteEditComponent },
    // {path:'espacio/:page',component:EspacioComponent},
    { path: 'evento/:page', component: EventlistComponent },
    { path: 'espacio/:page', component: EspacioComponent },
    { path: 'add-espacio', component: AddespComponent },
    { path: 'edit-espacio/:id', component: EditespComponent },
    { path: 'detail-espacio/:id', component: DetailespacioComponent },
    { path: 'mis-datos', component: ClienteEditComponent },
    // {path:'evento/:page',component: EventListComponent},   
    { path: 'cliente-edit', component: ClienteEditComponent },
    { path: 'event-add', component: EventaddComponent },
    { path: '**', component: HomeComponent },

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
console.log(RouterModule);