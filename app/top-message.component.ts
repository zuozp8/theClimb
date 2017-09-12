import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import {Component, ElementRef, HostBinding, OnInit} from "@angular/core";
import {MessagesService} from "./messages.service";

const flyInOutKeyframes = [
    style({
        'width': 0,
        'padding-left': 0,
        'padding-right': 0,
        'margin-right': 0,
        'transform': 'translateY(-100%)',
    }),
    style({
        'width': '*',
        'padding-left': '*',
        'padding-right': '*',
        'margin-right': '*',
        'transform': 'translateY(-100%)',
    }),
    style({'transform': 'translateY(0%)'}),

];

@Component({
    selector: 'top-messagees',
    template: `
        <div *ngFor="let message of messages"
             (@flyInOut.done)="message.animationDone(messages)"
             [@flyInOut]="message.insertAnimationStatus">
            {{message.message}}
        </div>
    `,
    animations: [
        trigger('flyInOut', [
            transition('* => expand', [
                animate(500, keyframes(flyInOutKeyframes.slice(0, 2))),
            ]),
            transition('* => show', [
                animate(500, keyframes(flyInOutKeyframes.slice(1))),
            ]),
            transition('* => void', [
                animate(1000, keyframes(flyInOutKeyframes.slice().reverse())),
            ]),
        ])
    ],
})
export class TopMessagesComponent implements OnInit {
    public messages: TopMessage[] = [];

    @HostBinding('style.margin-left')
    public marginLeft: string = '150px';

    private element: HTMLElement;

    constructor(private messagesService: MessagesService,
                ele: ElementRef) {
        this.element = ele.nativeElement;
    }

    ngOnInit(): void {
        this.messagesService.topMessage.subscribe(([message, hideObservable]) => {
            this.marginLeft = document.getElementById('title').clientWidth + 'px';
            let messageObject = new TopMessage;
            messageObject.message = message;
            this.messages.unshift(messageObject);

            let hideFunction = () => {
                this.messages.splice(this.messages.indexOf(messageObject), 1)
            };
            if (hideObservable) {
                hideObservable.subscribe(hideFunction);
            } else {
                setTimeout(hideFunction, 3000 + 5000 * Math.random());
            }
        });
    }
}

class TopMessage {
    public insertAnimationStatus: string = '';
    public message: string;

    animationDone(allMessages: TopMessage[]) {
        if (this.insertAnimationStatus === '' && allMessages.length > 1) {
            this.insertAnimationStatus = 'expand';
        } else {
            this.insertAnimationStatus = 'show';
        }
    }
}