import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// ADD
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// pages
import { CreateComponent } from './pages/create/create.component';
import { ReadComponent } from './pages/read/read.component';

// services
import { ApiService } from './services/api/api.service';


@NgModule({
  declarations: [
    AppComponent,

    // pages
    CreateComponent,
    ReadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // ADD
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    // services
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
