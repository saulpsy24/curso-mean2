import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Import Cliente   
import { ClienteEditComponent } from './components/cliente_edit.component';

//Import Espacio
import {EspacioComponent} from './components/espacio.components';
import {AddespComponent} from './components/addespacio.component';
import {EditespComponent} from './components/editespacio.component';
import {DetailespacioComponent} from './components/detailespacio.component';
//import EVENTO
import {EventListComponent} from './components/event-list.component';

//Import Home
import {HomeComponent} from './components/home.component';
import { EventAddComponent } from './components/event-add.component';

const appRoutes: Routes = [
    
<<<<<<< HEAD
    {path:'',component: ClienteEditComponent},
    // {path:'espacio/:page',component:EspacioComponent},
    {path:'evento/:page',component:EspacioComponent},
=======
>>>>>>> 2738e4ea0d7d081ee9f6fbd279de385f6efc1e70
    {path:'',component: HomeComponent},
    {path:'espacio/:page',component:EspacioComponent},
    {path:'add-espacio',component:AddespComponent},
    {path:'edit-espacio/:id',component:EditespComponent},
    {path:'detail-espacio/:id',component:DetailespacioComponent},
    {path:'mis-datos', component:ClienteEditComponent},
    // {path:'evento/:page',component: EventListComponent},   
    {path:'cliente-edit', component:ClienteEditComponent},
    {path:'event-add',component:EventAddComponent},
    {path:'**',component:HomeComponent},

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
console.log(RouterModule);