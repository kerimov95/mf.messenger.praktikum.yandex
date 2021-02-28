import {isArrayOrObject, isEqual, merge} from '../utilities/utility';
import {EventBus} from './event-bus';

interface ProxyConstructor {
  new<T extends Record<string,
  unknown>, H extends Record<string, unknown>>(target: T,
    handler: ProxyHandler<H>): T;
}

interface Event {
  INIT: string;
  FLOW_CDM: string;
  FLOW_CDU: string;
  FLOW_RENDER: string;
}

interface Meta {
  tagName: string;
  props: unknown;
}

export interface IBlockProps extends Record<string, unknown>{
  id?: string;
  className?: string;
  text? : string;
}

export abstract class Block<T extends IBlockProps> {
  private static EVENTS: Event = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement;
  private _meta: Meta;
  private eventBus: Function
  public props: T;

  constructor(tagName: string = 'div', props: T) {
    const eventBus: EventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources(): void {
    const {tagName}: any = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  public init(): void {

  }

  private async _init(): Promise<void> {
    this._createResources();
    await this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  public componentDidMount(): void {

  }

  private _componentDidUpdate(oldProps: any, newProps: any): void {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
  }

  public componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (isArrayOrObject(oldProps) && isArrayOrObject(newProps)) {
      if (isEqual(oldProps, newProps)) {
        return false;
      } else {
        return true;
      }
    } else {
      if (oldProps !== newProps) {
        return true;
      } else {
        return false;
      }
    }
  }

  public setProps(nextProps: T): void {
    if (!nextProps) {
      return;
    }
    try {
      this.props = merge(this.props, nextProps);
      this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, nextProps);
    } catch (e) {
      throw new Error(e);
    }
  };

  public get element(): HTMLElement {
    return this._element;
  }

  private _render(): void {
    const block = this.render();
    if (block) {
      if (this._element) {
        this._element.innerHTML = '';
      };
      this._element.insertAdjacentHTML('afterbegin', block);
    }
  }

  public render(): any {

  }

  public getContent(): HTMLElement {
    return this.element;
  }

  public outerHTML(): string {
    return this.element.outerHTML;
  }

  private _makePropsProxy<T extends Record<string, unknown>,
   P extends keyof S, S extends Record<string, unknown>>(props: T): T {
    const CustomProxy = Proxy as ProxyConstructor;

    return new CustomProxy(props, {
      get(target: S, prop: P) {
        const value = target[prop];
        return (typeof value === 'function') ? value.bind(target) : value;
      },
      set(target: S, prop: P, value): boolean {
        if (target[prop] !== value) {
          target[prop] = value;
          return true;
        }
        return true;
      },
      deleteProperty() {
        throw new Error('Нет прав');
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const newElement = document.createElement(tagName);
    if (this.props.className) {
      newElement.className = this.props.className;
    }
    if (this.props.id) {
      newElement.id = this.props.id;
    }
    if (this.props.text) {
      newElement.innerText = this.props.text;
    }
    return newElement;
  }

  public show(): void {
    this.getContent().style.display = 'block';
  }

  public hide(): void {
    this.getContent().style.display = 'none';
  }
}
