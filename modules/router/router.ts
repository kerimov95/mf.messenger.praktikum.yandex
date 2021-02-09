import { Block } from "../block.js";
import { render } from '../render.js'

interface IBlock {
    new(): Block;
}

class Route {

    private _pathname: string;
    private _blockClass: IBlock;
    private _props: any;
    private _block: Block;

    constructor(pathname: string, view: IBlock, props: any) {
        this._pathname = pathname;
        this._blockClass = view;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return pathname === this._pathname;
    }

    render(): void {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

class Router {

    private routes: Route[];
    private history: History;
    private _currentRoute: Route | null;
    private _rootQuery: string;

    constructor(rootQuery: string) {
        if ((Router as any).__instance) {
            return (Router as any).__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        (Router as any).__instance = this;
    }

    use(pathname: string, block: IBlock): any {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (event: any) => {
            this._onRoute(event.currentTarget.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (route) {
            if (this._currentRoute)
                this._currentRoute.leave();

            this._currentRoute = route as Route;
            route.render();
        }
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back()
    }

    forward() {
        this.history.forward()
    }

    getRoute(pathname: string): Route | undefined {
        const route = this.routes.find(route => route.match(pathname))
        if (route)
            return route;
        else
            return undefined;
    }
}

export { Router }