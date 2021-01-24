export function getProfile() {
    return new Promise((res) => {
        setTimeout(() => {
            res({
                email: 'Kerimov95@mail.ru',
                login: 'Kerimov',
                first_name: 'Alikhan',
                second_name: 'Kerimov',
                display_name: 'Ali',
                phone: '+7(928) 888 91 07'
            });
        }, 0);
    });
}
//# sourceMappingURL=profile.setvice.js.map