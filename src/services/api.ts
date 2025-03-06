import axios from "axios";

export type ApiError = {
    response: {
        data: {
            error: string
        }
    }
  }
  

export const api = axios.create({
    baseURL: 'http://localhost:3333'
})