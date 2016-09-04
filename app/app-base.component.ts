import {Component} from "@angular/core";
import {Hero} from "./hero";

@Component({
    selector: 'app-base',
    templateUrl: '/app/app-base.component.html'
})
export class AppBaseComponent {
    title: string = 'Tour of Heroes';
    heroes: Hero[] = [];

    constructor() {
        let hero = new Hero;
        hero.id = 10;
        hero.name = 'feefee';
        this.heroes.push(hero);
    }
}