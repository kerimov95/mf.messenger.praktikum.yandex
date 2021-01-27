export interface IChat {
    userName: string;
    lastMessage: string;
    time: string;
    amount: number;
}

export function getChats(): Promise<IChat[]> {
    return new Promise((res) => {
        setTimeout(() => {
            res(
                [
                    { userName: 'Сергей', lastMessage: 'Добрый день!', time: '11:01', amount: 2 },
                    { userName: 'Алина ЧГУ', lastMessage: 'Я в пути', time: '12:02', amount: 1 },
                    { userName: 'Маша', lastMessage: 'Как дела?', time: '12:12', amount: 2 },
                    { userName: 'Тамик', lastMessage: 'Добрый день!', time: '12:22', amount: 1 },
                    { userName: 'Радик', lastMessage: 'Привет!', time: '14:02', amount: 4 },
                    { userName: 'Керимов К', lastMessage: 'Добрый день!', time: '15:32', amount: 1 },
                    { userName: 'Сергей', lastMessage: 'Ты на работе?', time: '16:12', amount: 3 }
                ]
            )
        }, 0)
    })
}