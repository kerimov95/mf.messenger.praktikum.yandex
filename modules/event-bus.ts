export class EventBus {

    private listeners: any;

    constructor() {
        this.listeners = {};
    }

    public on(event: string, callback: Function) {
        if (!this.listeners[event])
            this.listeners[event] = [];

        this.listeners[event].push(callback);
    }

    public off(event: string, callback: Function) {
        if (!this.listeners[event])
            throw new Error(`Нет события: ${event}`);

        this.listeners[event] = this.listeners[event].filter(
            (listener: any) => listener !== callback
        );
    }

    public emit(event: string, ...args: any) {
        if (!this.listeners[event])
            throw new Error(`Нет события: ${event}`);

        this.listeners[event].forEach(function (listener: any) {
            listener(...args);
        });
    }
}