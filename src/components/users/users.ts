import {IProfile} from '../../api/profile-api';
import './users.scss';

export class UsersModal {
    root: HTMLElement;
    saveBtnText : string;
    main = document.createElement('div');
    modal = document.createElement('div');
    form = document.createElement('form');
    fn: (cancel: boolean) => void;

    constructor(root: string, users : IProfile[], saveBtnText: string) {
      this.root = document.querySelector(root) as HTMLElement;
      this.main.style.visibility = 'hidden';
      this.main.className = 'transparentBackground';
      this.modal.className = 'userModal';
      this.form.className = 'form';
      this.saveBtnText = saveBtnText;


      users.forEach((user) =>{
        const div = document.createElement('div');
        div.className = 'text-success border-bottom';
        const input = document.createElement('input');
        input.id = user.id.toString();
        input.type='checkbox';
        input.value = user.id.toString();

        const label = document.createElement('label') as HTMLLabelElement;
        label.setAttribute('for', user.id.toString());
        const text = ` ${user.login} - ${user.first_name} ${user.second_name}`;
        label.innerText =text;

        div.appendChild(input);
        div.appendChild(label);

        this.form.appendChild(div);
      });

      this.modal.appendChild(this.form);

      const div = document.createElement('div');
      div.className = 'form-footer';

      const saveBtn = document.createElement('button');
      saveBtn.textContent = this.saveBtnText;
      saveBtn.className = 'btn btn-success mr-1';
      saveBtn.addEventListener('click', () =>{
        this.hidden(false);
      });

      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'btn btn-danger';
      cancelBtn.textContent = 'Отмена';
      cancelBtn.addEventListener('click', () =>{
        this.hidden(true);
      });

      div.appendChild(saveBtn);
      div.appendChild(cancelBtn);

      this.modal.appendChild(div);

      this.main.appendChild(this.modal);
      this.root.appendChild(this.main);
    }

    show() : Promise<number[] | undefined> {
      if (this.main) {
        this.main.style.visibility = 'visible';
      }

      return new Promise((resolve) =>{
        this.fn = (cancel: boolean) =>{
          if (cancel) {
            resolve(undefined);
          } else {
            const arr : number[] = [];
            const elements = this.form.elements;
            for (let i = 0; i < elements.length; i++) {
              const input = elements[i] as HTMLInputElement;
              if (input.nodeName === 'INPUT') {
                if (input.checked) {
                  arr.push(Number.parseInt(input.value));
                }
              };
            }
            resolve(arr);
          }
        };
      });
    }

    hidden(cancel: boolean) {
      if (this.fn) {
        this.fn(cancel);
      };
      if (this.root && this.main) {
        this.main.style.visibility = 'hidden';
        this.root.removeChild(this.main);
      }
    }
}
