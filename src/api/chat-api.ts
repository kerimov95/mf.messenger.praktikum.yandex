import HTTP from '../modules/http/index';
import {Const} from '../utilities/const';
import {IResponceStatus} from './profile-api';
import {profiles} from './user-api';

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  created: number;
}

export class ChatApi {
  private http = new HTTP(Const.getBaseUrl());

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

  public async deleteChat(id: number): Promise<IResponceStatus> {
    const headers = [{key: 'Content-Type', value: 'application/json'}];
    const options = {headers: headers, body: {chatId: id}};
    return await this.http.delete('chats', options)
        .then((res) => {
          return {code: res.status};
        });
  }

  public async changeAvatar(avatar: any): Promise<IResponceStatus> {
    return await this.http.put('chats/avatar', {
      body: avatar,
    }).then((res) => {
      return {code: res.status};
    });
  }

  public async addUsersToChat( users: number[], chatId: number ) {
    const headers = [{key: 'Content-Type', value: 'application/json'}];
    const options = {headers: headers, body: {users, chatId}};
    return await this.http.put('chats/users', options).then((res) => {
      return {code: res.status};
    });
  }

  public async deleteUsersFromChat( users: number[], chatId: number ) {
    const headers = [{key: 'Content-Type', value: 'application/json'}];
    const options = {headers: headers, body: {users, chatId}};
    return await this.http.delete('chats/users', options).then((res) => {
      return {code: res.status};
    });
  }

  public async getChatUsers(id: number) : profiles {
    const headers = [{key: 'Content-Type', value: 'application/json'}];
    const options = {headers: headers};
    return await this.http.get(`chats/${id}/users`, options)
        .then((res) => {
          return JSON.parse(res.response);
        });
  }

  public async getChatToken(id: number) : Promise<string> {
    const headers = [{key: 'Content-Type', value: 'application/json'}];
    const options = {headers: headers};
    return await this.http.post(`chats/token/${id}`, options)
        .then((res) => {
          const response = JSON.parse(res.response);
          return response.token as string;
        });
  }
}
