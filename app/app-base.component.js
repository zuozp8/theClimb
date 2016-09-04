"use strict";
app.AppBaseComponent = class {
    //noinspection JSUnusedGlobalSymbols
    static get annotations() {
        return [
            new ng.core.Component({
                selector: 'app-base',
                templateUrl: '/app/app-base.component.html'
            }),
        ];
    }
};