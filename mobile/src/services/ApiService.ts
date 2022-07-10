import axios, { Axios, AxiosResponse } from "axios";
import { ITodo } from "../types/todoTypes";
import $api from "../http/axios";

export default class ApiService {
  serverUrl: string | undefined;
  api: string;
  fetchingService: Axios;
  constructor(
    serverUrl = "http://localhost:3001/",
    fetchingService = $api,
    api = "api"
  ) {
    this.serverUrl = serverUrl;
    this.api = api;
    this.fetchingService = fetchingService;
  }

  private getFullApiUrl(url: string) {
    return `${this.serverUrl}${this.api}/${url}`;
  }

  getAllTodoHandler(url: string): Promise<AxiosResponse<ITodo[]>> {
    return this.fetchingService.get<ITodo[]>(this.getFullApiUrl(url));
  }

  getOneTodoHandler(url: string, id: string): Promise<AxiosResponse<ITodo>> {
    return this.fetchingService.get<ITodo>(this.getFullApiUrl(url) + `/${id}`);
  }

  addTodoHandler(url: string, data: ITodo): Promise<AxiosResponse<ITodo>> {
    return this.fetchingService.post<ITodo>(this.getFullApiUrl(url), data);
  }

  updateTodoHandler(url: string, data: ITodo): Promise<AxiosResponse<ITodo>> {
    console.log(data);
    return this.fetchingService.put(
      this.getFullApiUrl(url) + `/${data._id}`,
      data
    );
  }

  delTodoHandler(url: string, id: string): Promise<any> {
    return this.fetchingService.delete<string>(
      this.getFullApiUrl(url) + `/${id}`
    );
  }
}
