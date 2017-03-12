import {Component, ElementRef, OnInit} from "@angular/core";
import {Subject} from "rxjs";
import {MessagesService} from "./messages.service";

@Component({
    selector: 'top-message',
    template: `
        <div *ngFor="let message of messages" [ngClass]="{out: message.fadingOut}">
            {{message.message}}
        </div>
    `,
    //[ngClass]="{'in': saveHintVisible}"
})
export class TopMessageComponent implements OnInit {
    public messages: {
        message: string,
        fadingOut: boolean
    }[] = [];

    private element: HTMLElement;

    constructor(private messagesService: MessagesService,
                ele: ElementRef) {
        this.element = ele.nativeElement;
        window['foo'] = (): void => { //TODO remove
            this.messagesService.topMessage.next(['foo', null]);
        };
    }

    ngOnInit(): void {
        this.messagesService.topMessage.subscribe(([message, hideObservable]: [string, Subject<void>]) => {
            let messageObject = {message: message, fadingOut: false};
            this.messages.push(messageObject);

            let hideFunction = () => {
                messageObject.fadingOut = true;

                setTimeout(() => {
                    this.messages.splice(this.messages.indexOf(messageObject), 1)
                }, 2000);
            };
            if (hideObservable) {
                hideObservable.subscribe(hideFunction);
            } else {
                setTimeout(hideFunction, 1000);
            }
        });
    }
}