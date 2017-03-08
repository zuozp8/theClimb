import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {VillageComponent} from "./village.component";
import {ResearchComponent} from "./research.component";
import {SettingsComponent} from "./settings.component";

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
    },
    {
        path: 'settings',
        component: SettingsComponent,
    },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
