import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class MessagesService {
    public topMessage = new Subject<[string, Observable<void>]>();
}