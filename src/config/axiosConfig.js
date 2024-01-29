import axios from "axios";

export const transcriberAxios = axios.create({
    baseURL: "https://transcriber-backend-api-22aee3c5fb11.herokuapp.com",
  })