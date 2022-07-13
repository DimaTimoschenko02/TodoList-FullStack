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
  private setTokenToLocalStor(token: string) {
    localStorage.setItem("token", token);
    console.log('setTok')
    console.log(localStorage.getItem('token'))
    return token;
  }
  async login(user: ILoginUser) {
    const { data } = await this.create({
      url: this.url + "/sign-in",
      data: { ...user },
    });
    console.log(data)
    // i m still dont realize if i need a user from back
    const { data: _user, token } = data;
    return this.setTokenToLocalStor(token);
  }
  async signup(user: ISignUser) {
    const { data } = await this.create({
      url: this.url + "/sign-up",
      data: { ...user },
    });
    console.log(data)
    const { data: _user, token } = data;
    return this.setTokenToLocalStor(token);
  }
}

const todoService = new UserService();
export default todoService;
