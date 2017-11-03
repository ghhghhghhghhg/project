import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

import {AppRoutingModule} from "./app-routing.module";

import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProjectService } from "./shared/services/project.service";
import { ProjectComponent } from "./project/project.component";
import { HeaderComponent } from "./controller/header/header.component";
import { ComboBoxComponent } from "./controller/combo-box/combo-box.component";
import { DateComponent } from "./project/date.component";
import { SectorsListComponent } from "./project/sectors-list.component";
import { LocationsListComponent } from "./project/locations-list.component";
import { LocationPopupComponent} from "./project/location-popup.component";
import { SectorNamePipe } from "./pipes/sector-name.pipe";
import { MillisecondsToDatePipe} from "./pipes/milliseconds-to-date.pipe";
import {DataServiceImpl} from "./shared/services/data.service";
import {DataSerializerImpl} from "./shared/services/data.serializer";

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    ProjectComponent,
    HeaderComponent,
    ComboBoxComponent,
    DateComponent,
    SectorsListComponent,
    LocationsListComponent,
    LocationPopupComponent,
    SectorNamePipe,
    MillisecondsToDatePipe

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    ProjectService,
    /*{ provide: 'DataService', useExisting: forwardRef(() => DataServiceImpl) }*/
    {provide: "DataService", useClass: DataServiceImpl},
    {provide: "DataSerializer", useClass: DataSerializerImpl}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
