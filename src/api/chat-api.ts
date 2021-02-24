import HTTP from '../modules/http/index';
import {IResponceStatus} from './profile-api';

export interface IChat {
    id: number;
    title: string;
    avatar: string;
    created: number;
}

export class ChatApi {
    private http = new HTTP('https://ya-praktikum.tech/api/v2/');

    public async getChats(): Promise<IChat[]> {
      return await this.http.get('chats').then((res) => {
        return JSON.parse(res.response);
      });
    }

    public async createChat(title: string): Promise<IResponceStatus> {
      const headers = [{key: 'Content-Type', value: 'application/json'}];
      const options = {headers: headers, body: {title: title}};
      return await this.http.post('chats', options)
          .then((res) => {
            return {code: res.status};
          });
    }
}
