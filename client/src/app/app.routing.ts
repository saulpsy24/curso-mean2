import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Import Cliente   
import { ClienteEditComponent } from './components/cliente_edit.component';
import {ClienteaddComponent} from './components/cliente-add.component';
import {ClienteEditarComponent} from './components/editarclienteadmin.component';

//Import Espacio
import { EspacioComponent } from './components/espacio.components';
import { AddespComponent } from './components/addespacio.component';
import { EditespComponent } from './components/editespacio.component';
import { DetailespacioComponent } from './components/detailespacio.component';
//import EVENTO

import {EventlistComponent} from  './components/eventlist.component';
import {EventeditComponent} from './components/eventedit.component';

import {EventaddComponent} from './components/eventadd.componenet';
import {EventDetailComponente} from './components/eventdetail.component'
//Import Home
import { HomeComponent } from './components/home.component';
//import { EventAddComponent } from './components/event-add.component';

import {TurnoAddComponent} from './components/turnoadd.component';

import {TurnoEditComponent} from './components/turnoedit.component';
import {AssistantaddComponent} from './components/asistencia-add.component';
import {TurnodetailComponent} from './components/turno-detail.component';


import {misEventosComponent} from './components/miseventos.component';
import { adminPanelComponent } from './components/adminpanel.component';
import { ClienteDetailComponent } from './components/detallecliente.component';

const appRoutes: Routes = [

    { path: '', component: ClienteEditComponent },
    {path:'editar-turno/:id',component:TurnoEditComponent},
    {path:'detalle-cliente/:id',component:ClienteDetailComponent},
    
    {path:'panel-admin',component:adminPanelComponent},
   
    {path:'mis-eventos',component:misEventosComponent},
    {path:'turno-detail/:id',component:TurnodetailComponent},
    
    {path:'eventedit/:id',component: EventeditComponent},
    // {path:'espacio/:page',component:EspacioComponent},
    {path:'detalle-evento/:id',component:EventDetailComponente},
    { path: 'evento/:page', component: EventlistComponent },
    { path: 'espacio/:page', component: EspacioComponent },
    { path: 'add-espacio', component: AddespComponent },
    { path: 'edit-espacio/:id', component: EditespComponent },
    { path: 'detail-espacio/:id', component: DetailespacioComponent },
    { path: 'mis-datos', component: ClienteEditComponent },
    // {path:'evento/:page',component: EventListComponent},   
    { path: 'cliente-edit', component: ClienteEditComponent },
    { path: 'editarcliente', component: ClienteEditarComponent },
    { path: 'event-add', component: EventaddComponent },
    {path:'crear-turno/:evento',component:TurnoAddComponent},
    {path:'assistant-add/:turno',component:AssistantaddComponent},
    { path: 'cliente-add', component: ClienteaddComponent },
    { path: '**', component: HomeComponent },

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
console.log(RouterModule);