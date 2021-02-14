import HTTP from "../modules/http/index.js";
import { IResponceStatus } from "./profile-api.js";

export interface IChat {
    id: number;
    title: string;
    avatar: string;
    created_by: number;
}

export class ChatApi {

    private http = new HTTP('https://ya-praktikum.tech/api/v2/');

    public async GetChats(): Promise<IChat[]> {
        return await this.http.get('chats').then(res => {
            return JSON.parse(res.response);
        })
    }

    public async CreateChat(title: string): Promise<IResponceStatus> {
        return await this.http.post('chats', { headers: [{ key: 'Content-Type', value: 'application/json' }], body: JSON.stringify({ title: title }) })
            .then(res => {
                return { code: res.status };
            })
    }
}