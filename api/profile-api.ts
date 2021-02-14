import HTTP from "../modules/http/index.js";

export interface IProfile {
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

export class ProfileApi {

    private http: HTTP;

    constructor() {
        this.http = new HTTP("https://ya-praktikum.tech/api/v2/")
    }

    public async Signup(profile: IProfile): Promise<IResponceStatus> {
        return await this.http.post('auth/signup', { headers: [{ key: 'Content-Type', value: 'application/json' }], body: JSON.stringify(profile) })
            .then(res => {
                return { code: res.status }
            })
    }

    public async SignIn(user: IUser): Promise<IResponceStatus> {

        return await this.http.post('auth/signin', { headers: [{ key: 'Content-Type', value: 'application/json' }], body: JSON.stringify(user) })
            .then(res => {
                return { code: res.status }
            })
    }

    public async Logout(): Promise<IResponceStatus> {
        return await this.http.post('auth/logout')
            .then(res => {
                return { code: res.status }
            })
    }


    public async GetUserInfo(): Promise<IProfile> {
        return await this.http.get('auth/user').then(
            res => {
                return JSON.parse(res.response);
            }
        )
    }

    public async ChangeUserProfile(profile: IProfile): Promise<IProfile> {
        return await this.http.put('user/profile', { headers: [{ key: 'Content-Type', value: 'application/json' }], body: JSON.stringify(profile) })
            .then(res => {
                return JSON.parse(res.response)
            })
    }

    public async ChangeUserPassword(password: IPassword): Promise<IResponceStatus> {
        return await this.http.put('user/password', { headers: [{ key: 'Content-Type', value: 'application/json' }], body: JSON.stringify(password) })
            .then(res => {
                return { code: res.status }
            })
    }

    public async ChangeUserAvatar(avatar: any): Promise<{ statusCode: number, url: string }> {

        return await this.http.put('user/profile/avatar', {
            body: avatar
        })
            .then(res => {
                return { statusCode: res.status, url: JSON.parse(res.response).avatar }
            })
    }

}