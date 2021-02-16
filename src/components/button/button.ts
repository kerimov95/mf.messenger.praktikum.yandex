import { Block } from '../../modules/block'
import { compile } from '../../utilities/templator'
import { template } from './button.temp'


export interface IButton {
    id: string;
    className?: string;
    text?: string;
    display?: string;
    onClick?: (event: any) => any;
}

export class ButtonComponent extends Block<IButton> {
    constructor(props: IButton) {
        super('button', props);
    }

    componentDidMount() {
        setTimeout(() => {
            const button = document.getElementById(this.props.id)

            if (typeof this.props.onClick === 'function') {
                button?.addEventListener('click', this.props.onClick)
            }
        });
    }

    render(): string {
        return compile(template, this.props);
    }
}