import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from './app.component';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {ProjectComponent} from "./project/project.component";
import {ComboBoxComponent} from "./controller/combo-box/combo-box.component";
import {SectorsListComponent} from "./project/sectors-list.component";
import {LocationsListComponent} from "./project/locations-list.component";
import {LocationPopupComponent} from "./project/location-popup.component";
import {DataServiceImpl} from "./shared/services/data.service";
import {DataSerializerImpl} from "./shared/services/data.serializer";
import {DateComponent} from "./controller/date/date.component";
import {SortPipe} from "./pipes/sort.pipe";

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    ProjectComponent,
    ComboBoxComponent,
    SectorsListComponent,
    LocationsListComponent,
    LocationPopupComponent,
    DateComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {provide: "DataService", useClass: DataServiceImpl},
    {provide: "DataSerializer", useClass: DataSerializerImpl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
