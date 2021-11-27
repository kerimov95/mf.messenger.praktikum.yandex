import HTTP from 'modules/http/index';
import {Const} from 'utilities/const';
import {IResponceStatus} from 'profile-api';
import {profiles} from 'user-api';

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  created: number;
}

export class ChatApi {
  private http = new HTTP(Const.getBaseUrl());

  public getChats(): Promise<IChat[]> {
    return this.http.get('chats')
        .then((res) => {
          return JSON.parse(res.response);
        });
  }

  public createChat(title: string): Promise<IResponceStatus> {
    const headers = [{key: 'Content-Type', value: 'application/json'}];
    const options = {headers: headers, body: {title: title}};
    return this.http.post('chats', options)
        .then((res) => {
          return {code: res.status};
        });
  }

  public deleteChat(id: number): Promise<IResponceStatus> {
    const headers = [{key: 'Content-Type', value: 'application/json'}];
    const options = {headers: headers, body: {chatId: id}};
    return this.http.delete('chats', options)
        .then((res) => {
          return {code: res.status};
        });
  }

  public changeAvatar(avatar: any): Promise<IResponceStatus> {
    return this.http.put('chats/avatar', {
      body: avatar,
    }).then((res) => {
      return {code: res.status};
    });
  }

  public addUsersToChat( users: number[], chatId: number ) {
    const headers = [{key: 'Content-Type', value: 'application/json'}];
    const options = {headers: headers, body: {users, chatId}};
    return this.http.put('chats/users', options).then((res) => {
      return {code: res.status};
    });
  }

  public deleteUsersFromChat( users: number[], chatId: number ) {
    const headers = [{key: 'Content-Type', value: 'application/json'}];
    const options = {headers: headers, body: {users, chatId}};
    return this.http.delete('chats/users', options).then((res) => {
      return {code: res.status};
    });
  }

  public getChatUsers(id: number) : profiles {
    const headers = [{key: 'Content-Type', value: 'application/json'}];
    const options = {headers: headers};
    return this.http.get(`chats/${id}/users`, options)
        .then((res) => {
          return JSON.parse(res.response);
        });
  }

  public getChatToken(id: number) : Promise<string> {
    const headers = [{key: 'Content-Type', value: 'application/json'}];
    const options = {headers: headers};
    return this.http.post(`chats/token/${id}`, options)
        .then((res) => {
          const response = JSON.parse(res.response);
          return response.token as string;
        });
  }
}
