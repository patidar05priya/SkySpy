import {HttpClientModule} from '@angular/common/http';
import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule, } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {HomeComponent} from './pages/home/home.component';
import {WeatherCardComponent} from './ui/weather-card/weather-card.component';
import {ErrorComponent} from './ui/error/error.component';
import {AddCardComponent} from './ui/add-card/add-card.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeatherCardComponent,
    ErrorComponent,
    AddCardComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}