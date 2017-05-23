import {Component, ElementRef, OnInit} from "@angular/core";
import {Subject} from "rxjs";
import {MessagesService} from "./messages.service";

@Component({
    selector: 'top-messagees',
    template: `
        <div *ngFor="let message of messages">
            {{message.message}}
        </div>
    `,
})
export class TopMessagesComponent implements OnInit {
    public messages: TopMessage[] = [];

    private element: HTMLElement;

    constructor(private messagesService: MessagesService,
                ele: ElementRef) {
        this.element = ele.nativeElement;
        window['foo'] = (text): void => { //TODO remove
            this.messagesService.topMessage.next([text || 'foo', null]);
        };
    }

    ngOnInit(): void {
        this.messagesService.topMessage.subscribe(([message, hideObservable]: [string, Subject<void>]) => {
            let messageObject = new TopMessage;
            messageObject.message = message;
            messageObject.fadingOut = false;
            this.messages.unshift(messageObject);

            let hideFunction = () => {
                messageObject.fadingOut = true;

                setTimeout(() => {
                    this.messages.splice(this.messages.indexOf(messageObject), 1)
                }, 2000);
            };
            if (hideObservable) {
                hideObservable.subscribe(hideFunction);
            } else {
                //setTimeout(hideFunction, 10000);TODO
            }
        });
    }
}

class TopMessage {
    public message: string;
    public fadingOut: boolean;
}