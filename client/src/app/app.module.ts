import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing,appRoutingProviders} from './app.routing';

import { AppComponent } from './app.component';

import {ClienteEditComponent} from './components/cliente_edit.component';
import {EspacioComponent} from './components/espacio.components';
import {AddespComponent} from './components/addespacio.component';
import {HomeComponent} from './components/home.component';
//import {EventListComponent} from './components/event-list.component';
//import {EventAddComponent} from './components/event-add.component';
import {EditespComponent} from './components/editespacio.component';
import {DetailespacioComponent} from './components/detailespacio.component';
import { FilterPipe } from './filter.pipe';
import {EventlistComponent} from  './components/eventlist.component';
import {EventaddComponent} from './components/eventadd.componenet';
import {EventeditComponent} from './components/eventedit.component';
import {EventDetailComponente} from './components/eventdetail.component';

import {TurnoAddComponent} from './components/turnoadd.component';

import {TurnoEditComponent} from './components/turnoedit.component';
import {AssistantaddComponent} from './components/asistencia-add.component';
import {misEventosComponent} from './components/miseventos.component';
import {TurnodetailComponent} from './components/turno-detail.component';
import {adminPanelComponent} from './components/adminpanel.component';
import {ClienteaddComponent} from './components/cliente-add.component';
import {ClienteDetailComponent} from './components/detallecliente.component';
import {ClienteEditarComponent} from './components/editarclienteadmin.component';



@NgModule({
  declarations: [
    AppComponent,
      ClienteEditComponent,
      EspacioComponent,
      AddespComponent,
      HomeComponent,
  //    EventListComponent,
      EventaddComponent,
	  EditespComponent,
    DetailespacioComponent,
    EventDetailComponente,
    TurnoEditComponent,
    misEventosComponent,
    ClienteDetailComponent,
    
    FilterPipe,
    EventlistComponent,
    EventeditComponent,
    TurnoAddComponent,
    AssistantaddComponent,
    TurnodetailComponent,
    adminPanelComponent,
    ClienteaddComponent,
    ClienteEditarComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
      routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
