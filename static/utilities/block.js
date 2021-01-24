import { EventBus } from './event-bus.js';
export class Block {
    constructor(tagName = "div", props) {
        this.setProps = (nextProps) => {
            if (!nextProps)
                return;
            Object.assign(this.props, nextProps);
        };
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };
        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }
    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
    _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    componentDidMount() {
    }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response)
            this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
    componentDidUpdate(oldProps, newProps) {
        if (oldProps != newProps)
            return true;
        else
            return false;
    }
    get element() {
        return this._element;
    }
    _render() {
        const block = this.render();
        this._element.innerHTML = block;
    }
    render() {
    }
    getContent() {
        return this.element;
    }
    _makePropsProxy(props) {
        let proxyProps = new Proxy(props, {
            set: (target, prop, value) => {
                if (prop.indexOf('_') === 0)
                    throw new Error("Отказано в доступе");
                else {
                    let oldProps = target[prop];
                    target[prop] = value;
                    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, value);
                    return true;
                }
            },
            get: (target, prop) => {
                if (prop.indexOf('_') === 0)
                    throw new Error("Отказано в доступе");
                else {
                    let value = target[prop];
                    return (typeof value === 'function') ? value.bind(target) : value;
                    ;
                }
            },
            deleteProperty() {
                throw new Error("Отказано в доступе");
            }
        });
        return proxyProps;
    }
    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }
    show() {
        this.getContent().style.display = "block";
    }
    hide() {
        this.getContent().style.display = "none";
    }
}
Block.EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
};
//# sourceMappingURL=block.js.map