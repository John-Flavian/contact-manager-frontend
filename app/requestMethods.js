import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  credentials: "include",
});

const userRequest = (TOKEN) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${TOKEN}`,
    },
    withCredentials: true,
    credentials: "include",
  });

export { publicRequest, userRequest };
