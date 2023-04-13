import axios from "axios";
import FilmeService from "./filmes"

export const httpClient = axios.create({
  baseURL: "http://localhost:5215",
  headers: {
    'Content-Type': 'application/json'
  }
});
export default {
  filmes: FilmeService(httpClient)
}