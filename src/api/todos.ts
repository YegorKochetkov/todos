import axios from "axios";
import { Todo } from "../types/todo.type.ts";

axios.defaults.baseURL = "http://localhost:3000";

function handleError(error: any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.statusText);
    console.log(error.response.status);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
}

export function getAll(): Promise<Todo[]> {
  return axios
    .get("/api_v1/todos")
    .then((res) => res.data)
    .catch(handleError);
}

export function getOne(todoId: string): Promise<Todo> {
  return axios
    .get(`/api_v1/todos/${todoId}`)
    .then((res) => res.data)
    .catch(handleError);
}

export function add(title: FormDataEntryValue): Promise<Todo> {
  return axios
    .post("/api_v1/todos", { title })
    .then((res) => res.data)
    .catch(handleError);
}

export function remove(todoId: string): Promise<string> {
  return axios
    .delete(`/api_v1/todos/${todoId}`)
    .then((res) => res.data)
    .catch(handleError);
}
