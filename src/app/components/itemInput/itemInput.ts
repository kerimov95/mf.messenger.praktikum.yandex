import {compile} from 'utilities/templator';
import {InputComponent, Iinput} from 'components/input/input';
import {template} from './itemInput.template';
import './itemInput.scss';


export class ItemInputComponent extends InputComponent {
  constructor(props: Iinput) {
    super(props);
  }

  render(): string {
    return compile(template, this.props);
  }
}
