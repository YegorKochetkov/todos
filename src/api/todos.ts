import axios from "axios";
import { Todo } from "../types/todo.type.ts";

axios.defaults.baseURL = "http://localhost:3000/api/v1";

function handleError(error: any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error(error.response.statusText);
    console.error(error.response.status);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error", error.message);
  }
}

export function getAll(): Promise<Todo[]> {
  return axios
    .get("/todos")
    .then((res) => res.data)
    .catch(handleError);
}

export function updateAll(todos: Todo[]): Promise<void> {
  return axios
    .patch("/todos?action=update", { items: todos })
    .then((res) => res.data)
    .catch(handleError);
}

export function deleteAll(ids: string[]): Promise<void> {
  return axios
    .patch("/todos?action=delete", { ids })
    .then((res) => res.data)
    .catch(handleError);
}

export function getOne(todoId: string): Promise<Todo> {
  return axios
    .get(`/todos/${todoId}`)
    .then((res) => res.data)
    .catch(handleError);
}

export function add(title: FormDataEntryValue): Promise<Todo> {
  return axios
    .post("/todos", { title })
    .then((res) => res.data)
    .catch(handleError);
}

export function remove(todoId: string): Promise<string> {
  return axios
    .delete(`/todos/${todoId}`)
    .then((res) => res.data)
    .catch(handleError);
}

export function update({ id, title, completed }: Todo): Promise<Todo> {
  return axios
    .put(`/todos/${id}`, { title, completed })
    .then((res) => res.data)
    .catch(handleError);
}
