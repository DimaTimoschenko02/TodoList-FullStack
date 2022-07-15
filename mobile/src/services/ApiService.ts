import axios, { Axios, AxiosResponse } from "axios";
import { ITodo, TodoQuery } from "../types/todoTypes";


interface IRequest {
  url: string;
  data?: {
    [key: string]: string | boolean | number;
  };
  query?: TodoQuery;
}

export default class ApiService {
  serverUrl: string | undefined;
  api: string;
  fetchingService: Axios;
  constructor(
    serverUrl = "http://localhost:3001/",
    fetchingService = axios,
    api = "api"
  ) {
    this.serverUrl = serverUrl;
    this.api = api;
    this.fetchingService = fetchingService;
  }

  private getFullApiUrl(url: string) {
    return `${this.serverUrl}${this.api}/${url}`;
  }
  private setAuthTokenToReq() {
    return {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }
  private createQuery<T extends {}>(query: T) {
    return new URLSearchParams(query);
  }
  async saveToken(token: string) {
    localStorage.setItem("token", token);
  }
  getAll(req: IRequest) {
    if (req.query) {
      const query = this.createQuery(req.query);
      return this.fetchingService.get(
        `${this.getFullApiUrl(req.url)}?${query}`,
        {
          headers: this.setAuthTokenToReq(),
        }
      );
    }
    return this.fetchingService.get(this.getFullApiUrl(req.url), {
      headers: this.setAuthTokenToReq(),
    });
  }

  getOne(req: IRequest) {
    return this.fetchingService.get(this.getFullApiUrl(req.url), {
      headers: this.setAuthTokenToReq(),
    });
  }

  create(req: IRequest) {
    return this.fetchingService.post(this.getFullApiUrl(req.url), req.data, {
      headers: this.setAuthTokenToReq(),
    });
  }

  update(req: IRequest) {
    return this.fetchingService.put(this.getFullApiUrl(req.url), req.data, {
      headers: this.setAuthTokenToReq(),
    });
  }

  delete(req: IRequest) {
    return this.fetchingService.delete(this.getFullApiUrl(req.url), {
      headers: this.setAuthTokenToReq(),
    });
  }
}
