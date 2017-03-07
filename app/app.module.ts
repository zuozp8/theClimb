import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppBaseComponent} from "./app-base.component";
import {ResourcesService} from "./resources.service";
import {routing} from "./app.routing";
import {ResearchComponent} from "./research.component";
import {VillageComponent} from "./village.component";
import {ItemComponent} from "./item.component";
import {TimeTickService} from "./time-tick.service";
import {VillageService} from "./village.service";
import {FloorPipe} from "./floor.pipe";
import {ResearchService} from "./research.service";
import {BreedingService} from "./breeding.service";
import {SaveService} from "./save.service";
import {SaveHintComponent} from "./save-hint.component";

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
        SaveHintComponent,
    ],
    providers: [
        VillageService,
        ResourcesService,
        ResearchService,
        BreedingService,
        TimeTickService,
        SaveService,
    ],
    bootstrap: [
        AppBaseComponent,
    ]
})
export class AppModule {
}