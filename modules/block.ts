import { isArrayOrObject, isEqual } from '../utilities/utility.js';
import { EventBus } from './event-bus.js'

export interface Event {
    INIT: string;
    FLOW_CDM: string;
    FLOW_CDU: string;
    FLOW_RENDER: string;
}

export interface Meta {
    tagName: string;
    props: unknown;
}

export abstract class Block<T = any> {

    private static EVENTS: Event = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    private _element: HTMLElement;
    private _meta: Meta;
    private eventBus: Function
    public props: T;

    constructor(tagName: string = "div", props: any) {

        const eventBus: EventBus = new EventBus();

        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _createResources(): void {
        const { tagName }: any = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    private init(): void {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM)
    }

    private _componentDidMount(): void {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }

    public componentDidMount(): void {

    }

    private _componentDidUpdate(oldProps: any, newProps: any): void {

        const response = this.componentDidUpdate(oldProps, newProps);

        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_CDM)
        }
    }

    public componentDidUpdate(oldProps: any, newProps: any): boolean {

        if (isArrayOrObject(oldProps) && isArrayOrObject(newProps)) {
            if (isEqual(oldProps, newProps))
                return false;
            else
                return true;
        }
        else {
            if (oldProps !== newProps)
                return true;
            else
                return false;
        }

    }

    public setProps = (nextProps: T): void => {
        if (!nextProps)
            return;
        Object.assign(this.props, nextProps);
    };

    public get element(): HTMLElement {
        return this._element;
    }

    private _render(): void {
        const block = this.render();
        this._element.innerHTML = block;
    }

    public render(): any {

    }

    public getContent(): HTMLElement {
        return this.element;
    }

    private _makePropsProxy(props: T): any {
        let proxyProps = new Proxy(props, {
            set: (target: any, prop: any, value: any) => {
                if (prop.indexOf('_') === 0)
                    throw new Error("Отказано в доступе");
                else {
                    let oldProps = target[prop]
                    target[prop] = value
                    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, value)
                    return true;
                }
            },
            get: (target: any, prop: any) => {
                if (prop.indexOf('_') === 0)
                    throw new Error("Отказано в доступе");
                else {
                    let value = target[prop];
                    return (typeof value === 'function') ? value.bind(target) : value;;
                }
            },
            deleteProperty() {
                throw new Error("Отказано в доступе");
            }
        })
        return proxyProps;
    }

    private _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    public show(): void {
        this.getContent().style.display = "block";
    }

    public hide(): void {
        this.getContent().style.display = "none";
    }
}