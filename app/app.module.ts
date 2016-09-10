import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppBaseComponent} from "./app-base.component";
import {ResourcesService} from "./resources.service";
import {routing} from "./app.routing";
import {ResearchComponent} from "./research.component";
import {VillageComponent} from "./village.component";
import {ItemComponent} from "./item.component";

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
    ],
    providers: [
        ResourcesService
    ],
    bootstrap: [AppBaseComponent]
})

export class AppModule {
}