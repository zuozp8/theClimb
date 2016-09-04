"use strict";
app.AppModule = class {
    //noinspection JSUnusedGlobalSymbols
    static get annotations() {
        return [
            new ng.core.NgModule({
                imports: [ng.platformBrowser.BrowserModule],
                declarations: [app.AppBaseComponent],
                bootstrap: [app.AppBaseComponent]
            }),
        ];
    }
};