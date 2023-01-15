import { client, ResponseAPI } from "../api/client";

export const createPost = (file: File): Promise<any> => {
  return new Promise( (resolve, reject) => {
    try {
      const fd = new FormData();
      fd.append("image", file, file.name);
      const  data  =  client.post("", fd);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
