import HTTP from 'modules/http/index';
import {Const} from 'utilities/const';
import {IProfile} from 'profile-api';

export type profiles = Promise<IProfile[]>;

export class UsersApi {
    private http: HTTP;

    constructor() {
      this.http = new HTTP(Const.getBaseUrl());
    }

    public searchUser(login: {login: string}): profiles {
      const headers = [{key: 'Content-Type', value: 'application/json'}];
      const options = {headers: headers, body: login};
      return this.http.post('user/search', options)
          .then((res) => {
            return JSON.parse(res.response);
          });
    }

    public getUserById(id: number): Promise<IProfile> {
      const headers = [{key: 'Content-Type', value: 'application/json'}];
      const options = {headers: headers};
      return this.http.get(`user/${id}`, options)
          .then((res) => {
            return JSON.parse(res.response);
          });
    }
}
