export default class EventEmitter {
    private _events;
    private eventName;
    constructor();
    on(eventName: string, callback: Function): void;
    only(eventName: string, callback: Function): void;
    emit(eventName: string, ...args: any[]): void;
    off(eventName: string, callback: Function): void;
    offOnly(eventName: string): void;
    offAll(): void;
}
