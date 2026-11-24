import axios  from 'axios';

const API = axios.create({
  baseURL: "https://to-dos-api.softclub.tj/api",
});

export const getTodos = async () => {
  const { data } = await API.get("/to-dos");
  return data.data
};

export const addTodo = async (formData: FormData) => {
  const { data } = await API.post("/to-dos", formData);
  return data;
};

export const editTodo = async ({ id, name, description}) => {
 const { data } = await API.put("/to-dos", {id, name, description, });
  return data;
};

export const deleteTodo = async (id) => {
  const { data } = await API.delete(`/to-dos/?id=${id}`);
  return data;
};