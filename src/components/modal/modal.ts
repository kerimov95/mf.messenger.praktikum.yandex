import {ButtonComponent} from '../button/button';
import {InputComponent} from '../input/input';
import './modal.scss';

export class Modal<T = any> {
    private root: HTMLElement;
    private main = document.createElement('div');
    private modal = document.createElement('div');
    private form = document.createElement('form')
    private fn: (cancel: boolean) => void;


    constructor(root: string, inputs? :InputComponent[],
        buttons? :ButtonComponent[]) {
      this.root = document.querySelector(root) as HTMLElement;
      this.main.style.visibility = 'hidden';
      this.main.className = 'transparentBackground';
      this.modal.className = 'modal';

      if (inputs && inputs.length > 0) {
        inputs.forEach((i) => {
          this.form.insertAdjacentHTML('afterbegin', i.render());
        });
      }

      this.modal.appendChild(this.form);

      if (buttons && buttons.length > 0) {
        buttons.forEach((b) => {
          this.modal.appendChild(b.getContent());
        });
      }

      this.main.appendChild(this.modal);
      this.root.appendChild(this.main);
    }

    show() : Promise<T> {
      if (this.main) {
        this.main.style.visibility = 'visible';
      }

      return new Promise<T>((resolve) =>{
        this.fn = (cancel: boolean) =>{
          if (cancel) {
            resolve({} as T);
          };
          const data : any = {};
          if (this.modal && this.form.elements.length > 0) {
            for (let i = 0; i < this.form.elements.length; i++ ) {
              const input = this.form.elements[i] as HTMLInputElement;
              if (input.nodeName === 'INPUT') {
                switch (input.type) {
                  case 'text':
                    data[this.form.elements[i].id] = input.value;
                    break;
                  case 'file':
                    if ( input.files && input.files.length >0) {
                      data[this.form.elements[i].id] = input.files[0];
                    }
                    break;
                }
              }
            }
          }
          resolve(data as T);
        };
      });
    }

    hidden(cancel: boolean) {
      if (this.fn) {
        this.fn(cancel);
      };
      if (this.main) {
        this.main.style.visibility = 'hidden';
      }
    }
}
