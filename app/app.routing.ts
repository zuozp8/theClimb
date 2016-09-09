import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {VillageComponent} from "./village.component";
import {ResearchComponent} from "./research.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/village',
        pathMatch: 'full',
    },
    {
        path: 'village',
        component: VillageComponent,
    },
    {
        path: 'research',
        component: ResearchComponent,
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
