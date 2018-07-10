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
import {EventListComponent} from './components/event-list.component';
import {EventAddComponent} from './components/event-add.component';
import {EditespComponent} from './components/editespacio.component';
import {DetailespacioComponent} from './components/detailespacio.component';
import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
      ClienteEditComponent,
      EspacioComponent,
      AddespComponent,
      HomeComponent,
      EventListComponent,
      EventAddComponent,
	  EditespComponent,
    DetailespacioComponent,
    
    FilterPipe

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
