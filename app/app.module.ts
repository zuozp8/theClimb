import {Injector, NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppBaseComponent} from "./app-base.component";
import {routing} from "./app.routing";
import {BreedingService} from "./breeding.service";
import {FloorPipe} from "./floor.pipe";
import {ItemComponent} from "./item.component";
import {MessagesService} from "./messages.service";
import {ResearchComponent} from "./research.component";
import {ResearchService} from "./research.service";
import {ResourcesService} from "./resources.service";
import {isSavable} from "./savable";
import {SaveService} from "./save.service";
import {Settings} from "./settings";
import {SettingsComponent} from "./settings.component";
import {StoryEventService} from "./story-event.service";
import {isTickable} from "./Tickable";
import {TimeTickService} from "./time-tick.service";
import {TopMessagesComponent} from "./top-message.component";
import {VillageComponent} from "./village.component";
import {VillageService} from "./village.service";

let services = [
    BreedingService,
    MessagesService,
    ResearchService,
    ResourcesService,
    StoryEventService,
    SaveService,
    Settings,
    TimeTickService,
    VillageService,
];

@NgModule({
    imports: [
        BrowserAnimationsModule,
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
    providers: services,
    bootstrap: [
        AppBaseComponent,
    ]
})
export class AppModule {
    constructor(timeTickService: TimeTickService,
                saveService: SaveService,
                i: Injector,) {
        services.forEach((serviceType) => {
            let service = i.get(serviceType);
            if (isSavable(service)) {
                saveService.subscribe(service);
            }
            if (isTickable(service)) {
                timeTickService.subscribe(service);
            }
        })
    }
}