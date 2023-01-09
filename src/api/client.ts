import axios from "axios";

export const client = axios.create({  

  baseURL: "https://inpixio-remove-bg-zceht2uy2q-ey.a.run.app"});

export interface ResponseAPI {
  mime: string;
  image: string;
  success: string;
}
