export default class EventEmitter {
    private _events: any
    private eventName: string
    constructor() {
        this._events = {}
        this.eventName = ''
    }
    on(eventName: string, callback: Function) {
        if (!this._events) {
            this._events = {}
        }
        if (this._events[eventName]) {
            if (this.eventName !== 'newListener') {
                this.emit('newListener', eventName)
            }
        }
        const callbacks = this._events[eventName] || []
        callbacks.push(callback)
        this._events[eventName] = callbacks
    }
    only(eventName: string, callback: Function) {
        this._events[eventName] = [callback]
    }
    //@ts-ignore
    emit(eventName: string, ...args) {
        const callbacks = this._events[eventName] || []
        callbacks.forEach((cb: any) => cb.call(this, ...args))
    }
    off(eventName: string, callback: Function) {
        const callbacks = this._events[eventName] || []
        //@ts-ignore
        const newCallbacks = callbacks.filter(
            //@ts-ignore
            (fn) =>
                fn !== callback && fn.initialCallback !== callback
        )
        this._events[eventName] = newCallbacks
    }
    offOnly(eventName: string) {
        delete this._events[eventName]
    }
    offAll() {
        this._events = {}
    }
}
