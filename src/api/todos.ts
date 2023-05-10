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

export async function getAll(): Promise<Todo[] | void> {
  try {
    const res = await axios.get("/todos");
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

export async function updateAll(todos: Todo[]): Promise<void> {
  try {
    const res = await axios.patch("/todos?action=update", { items: todos });
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

export async function deleteAll(ids: string[]): Promise<void> {
  try {
    const res = await axios.patch("/todos?action=delete", { ids });
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

export async function getOne(todoId: string): Promise<Todo | void> {
  try {
    const res = await axios.get(`/todos/${todoId}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

export async function add(title: FormDataEntryValue): Promise<Todo | void> {
  try {
    const res = await axios.post("/todos", { title });
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

export async function remove(todoId: string): Promise<string | void> {
  try {
    const res = await axios.delete(`/todos/${todoId}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

export async function update({
  id,
  title,
  completed,
}: Todo): Promise<Todo | void> {
  try {
    const res = await axios.put(`/todos/${id}`, { title, completed });
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

const todosApi = { update, updateAll, deleteAll, getAll, getOne, add, remove };

export default todosApi;
