import axios, { Axios } from "axios";

import ApiService from "./ApiService";

import { ILoginUser, ISignUser } from "../types/userTypes";

class UserService extends ApiService {
  url: string;
  fetchingService: Axios;
  constructor() {
    super();
    this.url = "user";
    this.fetchingService = axios;
  }


  async login(user: ILoginUser) {
    const { data } = await this.create({
      url: this.url + "/sign-in",
      data: { ...user },
    });

    // i m still dont realize if i need a user from back
    const { data: _user, token } = data;
    await this.saveToken(token)
    return token;
    //return this.setTokenToLocalStor(token);
  }
  async signup(user: ISignUser) {
    const { data } = await this.create({
      url: this.url + "/sign-up",
      data: { ...user },
    });

    const { data: _user, token } = data;
    await this.saveToken(token);
    return token
  }
}

const userService = new UserService();
export default userService;
