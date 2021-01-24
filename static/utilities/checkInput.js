export function validate(input) {
    if (input.value.length <= 0) {
        return 'Обязательное поле';
    }
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (input.type === 'email' && reg.test(input.value) == false) {
        return 'Неверный email.';
    }
    return null;
}
//# sourceMappingURL=checkInput.js.map