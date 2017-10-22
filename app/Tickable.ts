export interface Tickable {
    onTick(interval: number, time: number): void;
}

export function isTickable(service: Object): service is Tickable {
    return (<Tickable>service).onTick !== undefined
}