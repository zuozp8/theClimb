import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AppBaseComponent} from "./app-base.component";
import {routing} from "./app.routing";
import {BreedingService} from "./breeding.service";
import {FloorPipe} from "./floor.pipe";
import {ItemComponent} from "./item.component";
import {MessagesService} from "./messages.service";
import {ResearchComponent} from "./research.component";
import {ResearchService} from "./research.service";
import {ResourcesService} from "./resources.service";
import {SaveService} from "./save.service";
import {Settings} from "./settings";
import {SettingsComponent} from "./settings.component";
import {TimeTickService} from "./time-tick.service";
import {TopMessagesComponent} from "./top-message.component";
import {VillageComponent} from "./village.component";
import {VillageService} from "./village.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
    ],
    declarations: [
        AppBaseComponent,
        VillageComponent,
        ResearchComponent,
        ItemComponent,
        FloorPipe,
        TopMessagesComponent,
        SettingsComponent,
    ],
    providers: [
        BreedingService,
        MessagesService,
        ResearchService,
        ResourcesService,
        SaveService,
        Settings,
        TimeTickService,
        VillageService,
    ],
    bootstrap: [
        AppBaseComponent,
    ]
})
export class AppModule {
}