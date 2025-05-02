// Data Access Layer: fetch dữ liệu từ server

import axios from "axios";

export const getUsers = () => axios.get("/api/users");
export const getUserById = (id) => axios.get(`/api/users/${id}`);
