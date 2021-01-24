export interface IProfile {
    email?: string;
    login?: string;
    first_name?: string;
    second_name?: string;
    display_name?: string;
    phone?: string;
}

export function getProfile(): Promise<IProfile> {
    return new Promise((res) => {
        setTimeout(() => {
            res(
                {
                    email: 'Kerimov95@mail.ru',
                    login: 'Kerimov',
                    first_name: 'Alikhan',
                    second_name: 'Kerimov',
                    display_name: 'Ali',
                    phone: '+7(928) 888 91 07'
                }
            )
        }, 0)
    })
}