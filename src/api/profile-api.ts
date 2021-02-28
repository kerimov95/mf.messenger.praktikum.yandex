import HTTP from '../modules/http/index';
import {Const} from '../utilities/const';

export interface IProfile {
    /* eslint-disable camelcase */
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface IPassword {
    oldPassword: string;
    newPassword: string;
}

export interface IAvatar {
    avatar: any
}

export interface IUser {
    login: string;
    password: string;
}

export interface IResponceStatus {
    code: number;
}

type profile = Promise<IProfile>;
type status = Promise<IResponceStatus>
type url = Promise<{ statusCode: number, url: string }>

export class ProfileApi {
    private http: HTTP;

    constructor() {
      this.http = new HTTP(Const.getBaseUrl());
    }

    public async signup(profile: IProfile): Promise<IResponceStatus> {
      const headers = [{key: 'Content-Type', value: 'application/json'}];
      const options = {headers: headers, body: profile};
      return await this.http.post('auth/signup', options)
          .then((res) => {
            return {code: res.status};
          });
    }

    public async signIn(user: IUser): Promise<IResponceStatus> {
      const headers = [{key: 'Content-Type', value: 'application/json'}];
      const options = {headers: headers, body: user};
      return await this.http.post('auth/signin', options)
          .then((res) => {
            return {code: res.status};
          });
    }

    public async logout(): Promise<IResponceStatus> {
      return await this.http.post('auth/logout')
          .then((res) => {
            return {code: res.status};
          });
    }


    public async getUserInfo(): Promise<IProfile> {
      return await this.http.get('auth/user').then(
          (res) => {
            return JSON.parse(res.response);
          },
      );
    }

    public async changeProfile(profile: IProfile): profile {
      const headers = [{key: 'Content-Type', value: 'application/json'}];
      const options = {headers: headers, body: profile};
      return await this.http.put('user/profile', options)
          .then((res) => {
            return JSON.parse(res.response);
          });
    }

    public async changePassword(password: IPassword): status {
      const headers = [{key: 'Content-Type', value: 'application/json'}];
      const options = {headers: headers, body: password};
      return await this.http.put('user/password', options)
          .then((res) => {
            return {code: res.status};
          });
    }

    public async changeAvatar(avatar: any): url {
      return await this.http.put('user/profile/avatar', {
        body: avatar,
      })
          .then((res) => {
            const url = JSON.parse(res.response).avatar;
            return {statusCode: res.status, url};
          });
    }
}
