export function validate(input: HTMLInputElement): string | null {

    if (input.value.length <= 0)
        return 'Обязательное поле'

    var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([a-z][a-z\.]*[a-z])$/;

    if (input.type === 'email' && regEmail.test(input.value) == false)
        return 'Неверный email.'

    return null;
}