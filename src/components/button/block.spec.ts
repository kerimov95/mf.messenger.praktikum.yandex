
import {expect} from 'chai';
import {ButtonComponent} from './button';

function testButton(): ButtonComponent {
  return new ButtonComponent({
    id: 'testBtn',
    text: 'Ok',
  });
}

describe('Тест компонента ButtonComponent', () => {
  it('Проверка создание Button', () => {
    const button = testButton();
    expect(button.props).to.have.property('id');
  });

  it('Проверка текста  Button', () => {
    const button = testButton();
    const element = button.getContent();
    const textFromButton = element.textContent?.trim();
    expect(textFromButton).eq('Ok');
  });

  it('Проверка метода setProps', () => {
    const button = testButton();
    button.setProps({
      id: button.props.id,
      text: 'NewText',
    });
    const element = button.getContent();
    const textFromButton = element.textContent?.trim();
    expect(textFromButton).eq('NewText');
  });
});
